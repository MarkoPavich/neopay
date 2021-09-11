﻿using System;
using System.ComponentModel.DataAnnotations;

namespace NeoPay.Dtos
{
    public record AuthenticateRequest
    {
        [Required]
        public string Username { get; init; }
        [Required]
        public string Password { get; init; }
    }

    public record AuthenticateResponse
    {
        public Guid Id { get; init; }
        public string Username { get; init; }
        public string Token { get; init; }
    }

    public record RegisterRequest
    {
        [Required]
        public string Username { get; init; }
        [Required]
        public string Email { get; init; }
        [Required]
        public string Password { get; init; }
    }
}