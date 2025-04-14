
using news._01_Domain.Models_Entities_.Subject;
using news._02_Application.Dto;

namespace news._02_Application.Interfaces
{
    public interface ISubjectService
    {
        Task<List<SubjectDto>> GetAll();
        Task<Subject?> GetById(int id);
        Task<Subject?> Save(Subject Subject);
        Task<bool> Delete(int id);
    }

}
