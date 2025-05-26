using news._01_Domain.Models_Entities_.Media;
using news._01_Domain.Models_Entities_.Province;

namespace news._02_Application.Dto
{
    public class ParentChildDto
    {
        public string? Child { get; set; } = string.Empty;
        public int? ChildId { get; set; }
        public string? Parent { get; set; } = string.Empty;
        public int? ParentId { get; set; }
        
    }
}
