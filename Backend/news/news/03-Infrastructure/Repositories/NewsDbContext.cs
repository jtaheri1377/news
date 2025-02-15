using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.Province;
using news._01_Domain.Models_Entities_.User;

namespace news._03_Infrastructure.Repositories
{
    public class NewsDbContext : DbContext
    {
        public NewsDbContext(DbContextOptions<NewsDbContext> options) : base(options) { }

        public DbSet<NewsModel> News { get; set; }
        public DbSet<User> Users { get; set; } 
        public DbSet<Province> Provinces { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
