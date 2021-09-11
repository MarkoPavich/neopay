using System;
using System.ComponentModel.DataAnnotations;

namespace NeoPay.Data.Models
{
    public record User
    {
        public Guid Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
    }
}
