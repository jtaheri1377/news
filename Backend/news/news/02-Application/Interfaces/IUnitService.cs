using news._01_Domain.Unit;

namespace news._02_Application.Interfaces
{
    public interface IUnitService
    {
        Task<List<Unit>> GetAll();
        Task<Unit?> GetById(int id);
        Task<Unit?> Update(Unit unit);
        Task<bool> Delete(int id);
    }

}
