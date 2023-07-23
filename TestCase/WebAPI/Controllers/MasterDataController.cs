using Microsoft.AspNetCore.Mvc;
namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MasterDataController : ControllerBase
{
    /* 
    * dbcontext is better to be readonly, otherwise we could have unexpected errors caused by modified dbsets whithin this class
    */
    private readonly ApiDbContext _dbContext;

    public MasterDataController(ApiDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("isAdminSelection")]
    public IActionResult GetUsers()
    {
        /*
         Added a NotFound error message when IsAdminMasterData is empty
         */
        var totalCount = _dbContext.IsAdminMasterData.Count();
        if (totalCount == 0)
            return NotFound();


        /*
         Optimized way of getting a random element from the database
         */
        Random rand = new Random();
        int skipper = rand.Next(0, totalCount);
        var masterData = _dbContext.IsAdminMasterData.Skip(skipper).Take(1).FirstOrDefault();

        return Ok(masterData);
    }
}
