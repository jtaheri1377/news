﻿using news._01_Domain.Models_Entities_.User;
using news._02_Application.Dto;

namespace news._02_Application.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAll();
        Task<List<UserDto>> GetRepresentative(int provinceId);
        Task<UserDto> GetById(int id);
        public Task<UserSummaryDto> GetCurrent();
        Task<User> Save(UserSaveDto user);
        Task<bool> Delete(int id);
    }
}
