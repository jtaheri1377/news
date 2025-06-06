using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NewsCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DisplayOrder = table.Column<int>(type: "int", nullable: true),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewsCategories_NewsCategories_ParentId",
                        column: x => x.ParentId,
                        principalTable: "NewsCategories",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Permission",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permission", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Provinces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provinces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Provinces_Provinces_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Provinces",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiteFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UploadId = table.Column<int>(type: "int", nullable: false),
                    Link = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SiteFileType = table.Column<byte>(type: "tinyint", nullable: true),
                    FileUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Extension = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    Alt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UploadDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteFiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Units",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Goal = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Units", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Family = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserType = table.Column<byte>(type: "tinyint", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Wises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VolumeCount = table.Column<int>(type: "int", nullable: false),
                    Translator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Img = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Reviews = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Likes = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Dislikes = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Hearts = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PublishedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProvinceId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stories_Provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Provinces",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RolePermissions",
                columns: table => new
                {
                    PermissionsId = table.Column<int>(type: "int", nullable: false),
                    RolesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermissions", x => new { x.PermissionsId, x.RolesId });
                    table.ForeignKey(
                        name: "FK_RolePermissions_Permission_PermissionsId",
                        column: x => x.PermissionsId,
                        principalTable: "Permission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermissions_Role_RolesId",
                        column: x => x.RolesId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    img = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Reviews = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    StudyTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PublishedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProvinceId = table.Column<int>(type: "int", nullable: true),
                    SubjectId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.Id);
                    table.ForeignKey(
                        name: "FK_News_Provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Provinces",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_News_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    RolesId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.RolesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Role_RolesId",
                        column: x => x.RolesId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Banners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    img = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StudyTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PublishedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NewsModelId = table.Column<int>(type: "int", nullable: true),
                    NewsCategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Banners_NewsCategories_NewsCategoryId",
                        column: x => x.NewsCategoryId,
                        principalTable: "NewsCategories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Banners_News_NewsModelId",
                        column: x => x.NewsModelId,
                        principalTable: "News",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Medias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ThumbnailUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Extension = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    Duration = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Alt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UploadDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NewsModelId = table.Column<int>(type: "int", nullable: true),
                    StoryId = table.Column<int>(type: "int", nullable: true),
                    SiteFileId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Medias_News_NewsModelId",
                        column: x => x.NewsModelId,
                        principalTable: "News",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Medias_SiteFiles_SiteFileId",
                        column: x => x.SiteFileId,
                        principalTable: "SiteFiles",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Medias_Stories_StoryId",
                        column: x => x.StoryId,
                        principalTable: "Stories",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "NewsCategoryMapping",
                columns: table => new
                {
                    NewsCategoryId = table.Column<int>(type: "int", nullable: false),
                    NewsModelId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsCategoryMapping", x => new { x.NewsCategoryId, x.NewsModelId });
                    table.ForeignKey(
                        name: "FK_NewsCategoryMapping_NewsCategoryId",
                        column: x => x.NewsCategoryId,
                        principalTable: "NewsCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NewsCategoryMapping_NewsModelId",
                        column: x => x.NewsModelId,
                        principalTable: "News",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NewsContents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NewsModelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsContents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewsContents_News_NewsModelId",
                        column: x => x.NewsModelId,
                        principalTable: "News",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Banners_NewsCategoryId",
                table: "Banners",
                column: "NewsCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Banners_NewsModelId",
                table: "Banners",
                column: "NewsModelId",
                unique: true,
                filter: "[NewsModelId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Medias_NewsModelId",
                table: "Medias",
                column: "NewsModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Medias_SiteFileId",
                table: "Medias",
                column: "SiteFileId",
                unique: true,
                filter: "[SiteFileId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Medias_StoryId",
                table: "Medias",
                column: "StoryId");

            migrationBuilder.CreateIndex(
                name: "IX_News_ProvinceId",
                table: "News",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_News_SubjectId",
                table: "News",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_NewsCategories_ParentId",
                table: "NewsCategories",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_NewsCategoryMapping_NewsModelId",
                table: "NewsCategoryMapping",
                column: "NewsModelId");

            migrationBuilder.CreateIndex(
                name: "IX_NewsContents_NewsModelId",
                table: "NewsContents",
                column: "NewsModelId",
                unique: true,
                filter: "[NewsModelId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Provinces_ParentId",
                table: "Provinces",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_RolesId",
                table: "RolePermissions",
                column: "RolesId");

            migrationBuilder.CreateIndex(
                name: "IX_Stories_ProvinceId",
                table: "Stories",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_UsersId",
                table: "UserRoles",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Banners");

            migrationBuilder.DropTable(
                name: "Medias");

            migrationBuilder.DropTable(
                name: "NewsCategoryMapping");

            migrationBuilder.DropTable(
                name: "NewsContents");

            migrationBuilder.DropTable(
                name: "RolePermissions");

            migrationBuilder.DropTable(
                name: "Units");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Wises");

            migrationBuilder.DropTable(
                name: "SiteFiles");

            migrationBuilder.DropTable(
                name: "Stories");

            migrationBuilder.DropTable(
                name: "NewsCategories");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "Permission");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Provinces");

            migrationBuilder.DropTable(
                name: "Subjects");
        }
    }
}
