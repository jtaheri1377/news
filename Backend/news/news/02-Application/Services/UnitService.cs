using Microsoft.EntityFrameworkCore;
using news._01_Domain.Unit;
using news._02_Application.Interfaces;
using news._03_Infrastructure.Repositories;

namespace news._02_Application.Services
{
    public class UnitService : IUnitService
    {
        private readonly NewsDbContext _db;

        public UnitService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<List<Unit>> GetAll()
        {
            return await _db.Units
                .Where(u => !u.IsDeleted)
                .ToListAsync();
        }

        public async Task<Unit?> GetById(int id)
        {
            return await _db.Units
                .Where(u => u.Id == id && !u.IsDeleted)
                .FirstOrDefaultAsync();
        }

        public async Task<Unit?> Update(Unit unit)
        {
            if (unit.Id == 0)
            {
                _db.Units.Add(unit);
            }
            else
            {
                var existingUnit = await _db.Units.FindAsync(unit.Id);
                if (existingUnit == null || existingUnit.IsDeleted)
                    return null;

                existingUnit.Name = unit.Name;
                existingUnit.Description = unit.Description;
                existingUnit.Type = unit.Type;
                existingUnit.Goal = unit.Goal;
            }

            await _db.SaveChangesAsync();
            return unit;
        }

        public async Task<bool> Delete(int id)
        {
            var unit = await _db.Units.FindAsync(id);
            if (unit == null || unit.IsDeleted)
                return false;

            unit.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
