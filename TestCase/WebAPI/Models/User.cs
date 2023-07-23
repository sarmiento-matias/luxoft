using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "The field FirstName is mandatory.")]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "The field LastName is mandatory.")]
    public string LastName { get; set; } = null!;

    [Required(ErrorMessage = "The field Email is mandatory.")]
    [EmailAddress(ErrorMessage = "The field Email should have a valid email address.")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "The field IsAdmin is mandatory.")]
    public bool IsAdmin { get; set; }
}