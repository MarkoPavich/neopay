﻿using NeoPay.Data.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NeoPay.Service.UserServices
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetUserById(Guid Id);
    }
}