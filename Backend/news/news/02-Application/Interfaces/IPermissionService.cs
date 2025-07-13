using lms_dashboard._01_Domain.Model;

namespace lms_dashboard._02_Application.Interfaces
{
    public interface IPermissionService
    {
        public Task<List<PermissionDto>> GetAll();
        public Task<PermissionDto> Get(int id);
        public Task<List<PermissionDto>> GetTree();
        public Task Save(PermissionSaveDto dto);
        public Task Delete(int id);

    }
}
