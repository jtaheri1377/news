using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.Media;
using news._01_Domain.Models_Entities_.NewsCategory;
using news._01_Domain.Models_Entities_.Province;
using news._01_Domain.Models_Entities_.Story;
using news._01_Domain.Models_Entities_.Subject;
using news._01_Domain.Models_Entities_.User;
using news._01_Domain.Unit;
using news._01_Domain.Wise;

namespace news._03_Infrastructure.Repositories
{
    public class NewsDbContext : DbContext
    {
        public NewsDbContext(DbContextOptions<NewsDbContext> options) : base(options) { }

        public DbSet<NewsModel> News { get; set; }
        public DbSet<User> Users { get; set; } 
        public DbSet<Province> Provinces { get; set; }
        public DbSet<Media> Medias { get; set; }
        public DbSet<Unit> Units { get;  set; }
        public DbSet<Wise> Wises { get;  set; }
        public DbSet<Story> Stories { get;  set; }
        public DbSet<NewsCategory> NewsCategories  { get;  set; }
        public DbSet<Subject> Subjects  { get;  set; }
        public DbSet<NewsContent> NewsContents { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<SiteFile> SiteFiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
        .HasMany(u => u.Roles)
        .WithMany(r => r.Users)
        .UsingEntity(j => j.ToTable("UserRoles"));

            modelBuilder.Entity<Role>()
                .HasMany(r => r.Permissions)
                .WithMany(p => p.Roles)
                .UsingEntity(j => j.ToTable("RolePermissions"));

            modelBuilder.Entity<SiteFile>()
            .HasOne(p => p.Media)
            .WithOne(p => p.SiteFile);

            modelBuilder.Entity<Banner>()
               .HasOne(p => p.NewsModel)
               .WithOne(p => p.Banner);

            modelBuilder.Entity<Banner>()
              .HasOne(b => b.NewsCategory)
              .WithMany(p => p.Banners);


            modelBuilder.Entity<Province>()
                .HasOne(p => p.Parent)
                .WithMany(p => p.Children)
                .HasForeignKey(p => p.ParentId);
            modelBuilder.Entity<Wise>().HasKey(w => w.Id);


            modelBuilder.Entity<Story>()
                .HasMany(m => m.Medias)
                .WithOne(s => s.Story)
                .HasForeignKey(s => s.StoryId);

            modelBuilder.Entity<Province>()
                .HasMany(m => m.Stories)
                .WithOne(s => s.Province)
                .HasForeignKey(s => s.ProvinceId) ;

            modelBuilder.Entity<NewsModel>()
              .HasMany(m => m.Medias)
              .WithOne(s => s.NewsModel)
              .HasForeignKey(s => s.NewsModelId);

            modelBuilder.Entity<NewsModel>()
                .HasOne(s => s.NewsContent)
                .WithOne(c => c.NewsModel)
                .HasForeignKey<NewsContent>(k => k.NewsModelId);


            // تنظیم رابطه Many-to-Many بین NewsModel و NewsCategory
            modelBuilder.Entity<NewsModel>()
                .HasMany(n => n.Categories)
                .WithMany(c => c.News)
                .UsingEntity<Dictionary<string, object>>(
                    "NewsCategoryMapping",
                    j => j.HasOne<NewsCategory>()
                          .WithMany()
                          .HasForeignKey("NewsCategoryId")
                          .HasConstraintName("FK_NewsCategoryMapping_NewsCategoryId"),
                    j => j.HasOne<NewsModel>()
                          .WithMany()
                          .HasForeignKey("NewsModelId")
                          .HasConstraintName("FK_NewsCategoryMapping_NewsModelId")
                );

            // تنظیم رابطه سلسله‌مراتبی در NewsCategory
            modelBuilder.Entity<NewsCategory>()
                .HasOne(c => c.Parent)
                .WithMany(c => c.Children)
                .HasForeignKey(c => c.ParentId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
