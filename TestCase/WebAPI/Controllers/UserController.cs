using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    /* 
     * dbcontext is better to be readonly, otherwise we could have unexpected errors caused by modified dbsets whithin this class
     */
    private readonly ApiDbContext _dbContext;

    public UserController(ApiDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /*
    - Descriptive method names: GetUsers changed for GetAllUsers 
    - Improved error handling
      When adding/updating users we validate that the user is not null but it's better to validate other things too, like name and email. 
     */

    [HttpGet("all")]
    public IActionResult GetAllUsers()
    {
        var users = _dbContext.Users.ToList();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        var user = _dbContext.Users.Find(id);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpPost("add")]
    public IActionResult AddUser([FromBody] User user)
    {
        if (user == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();

        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }

    /*
     Utilization of HttpPut instead of HttpPost for updates
     */
    [HttpPut("update/{id}")]
    public IActionResult UpdateUser(int id, [FromBody] User user)
    {
        if (user == null || id != user.Id || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var existingUser = _dbContext.Users.Find(id);
        if (existingUser == null)
        {
            return NotFound();
        }

        _dbContext.Entry(existingUser).CurrentValues.SetValues(user);
        _dbContext.SaveChanges();

        /*
         it's a common practice to return NoContent in successful update operations.
         */
        return NoContent();
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteUser(int id)
    {
        var user = _dbContext.Users.Find(id);
        if (user == null)
        {
            return NotFound();
        }

        _dbContext.Users.Remove(user);
        _dbContext.SaveChanges();
        /*
         it's a common practice to return NoContent in successful delete operations.
         */
        return NoContent();
    }
}
