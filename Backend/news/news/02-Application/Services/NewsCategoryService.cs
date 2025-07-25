﻿using Microsoft.EntityFrameworkCore;
    using news._02_Application.Dto;
    using news._02_Application.Interfaces;
    using news._02_Application.Mapper.NewsCategoryMapper;
    using news._03_Infrastructure.Repositories;

namespace news._02_Application.Services
{
    public class NewsCategoryService : INewsCategoryService
    {
        private readonly NewsDbContext _db;

        public NewsCategoryService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<List<NewsCategoryDto>> GetAll()
        {
            var results= await _db.NewsCategories
                .Where(c => !c.IsDeleted)
                .Include(x=>x.Parent)
                .ThenInclude(xx => xx.Parent)

                .ToListAsync();
            return results.ToListDto();
        }

        public async Task<List<NewsCategoryDto>> GetParents()
        {
            var results = await _db.NewsCategories
                .Where(c => c.ParentCode==null  && !c.IsDeleted)
                .ToListAsync();
            return results.ToListDto();
        }

        public async Task<List<NewsCategoryDto>> GetChilds(int code)
        {
            var results = await _db.NewsCategories
                .Where(c => c.ParentCode == code && !c.IsDeleted)
                .ToListAsync();
            return results.ToListDto();
        }

        public async Task<NewsCategoryDto?> Get(int id)
        {
            var entity = await _db.NewsCategories
                .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
            return entity == null ? null : NewsCategoryMapper.ToDto(entity);
        }

        public async Task<NewsCategoryDto?> Save(NewsCategoryDto dto)
        {
            if (dto == null)
                return null;

            if (dto.Id == 0)
            {
                // ایجاد رکورد جدید
                var newEntity = NewsCategoryMapper.ToEntity(dto);
                _db.NewsCategories.Add(newEntity);
                await _db.SaveChangesAsync();
                return NewsCategoryMapper.ToDto(newEntity);
            }
            else
            {
                // ویرایش رکورد موجود
                var existing = await _db.NewsCategories.FirstOrDefaultAsync(c => c.Id == dto.Id && !c.IsDeleted);
                if (existing == null)
                    return null;
                NewsCategoryMapper.MapToExistingEntity(dto, existing);
                await _db.SaveChangesAsync();
                return NewsCategoryMapper.ToDto(existing);
            }
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _db.NewsCategories.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
            if (entity == null)
                return false;
            entity.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }

}
