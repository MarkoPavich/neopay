﻿using System;

namespace NeoPay.Data.Models
{
    public record User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}