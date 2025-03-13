using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.Subject;
using news._02_Application.Interfaces;
using news._03_Infrastructure.Repositories;

namespace news._02_Application.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly NewsDbContext _db;

        public SubjectService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<List<Subject>> GetAll()
        {
            return await _db.Subjects
                .Where(u => !u.IsDeleted)
                .ToListAsync();
        }

        public async Task<Subject?> GetById(int id)
        {
            return await _db.Subjects
                .Where(u => u.Id == id && !u.IsDeleted)
                .FirstOrDefaultAsync();
        }

        public async Task<Subject?> Save(Subject Subject)
        {
            if (Subject.Id == 0)
            {
                _db.Subjects.Add(Subject);
            }
            else
            {
                var existingSubject = await _db.Subjects.FindAsync(Subject.Id);
                if (existingSubject == null || existingSubject.IsDeleted)
                    return null;

                existingSubject.Name = Subject.Name;
            }
            await _db.SaveChangesAsync();
            return Subject;
        }

        public async Task<bool> Delete(int id)
        {
            var Subject = await _db.Subjects.FindAsync(id);
            if (Subject == null || Subject.IsDeleted)
                return false;

            Subject.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
