using lms_dashboard._01_Domain.Model;

namespace lms_dashboard._02_Application.Interfaces
{
    public interface IRoleService
    {
        public Task<List<RoleDto>> GetAll();
        public Task<RoleDto> Get(int id);
        public Task Save(RoleSaveDto dto);
        public Task Delete(int id);

    }
}
