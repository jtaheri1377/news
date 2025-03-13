using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class addNewsCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NewsCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DisplayOrder = table.Column<int>(type: "int", nullable: true),
                    ParentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsCategory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewsCategory_NewsCategory_ParentId",
                        column: x => x.ParentId,
                        principalTable: "NewsCategory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                        principalTable: "NewsCategory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NewsCategoryMapping_NewsModelId",
                        column: x => x.NewsModelId,
                        principalTable: "News",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NewsCategory_ParentId",
                table: "NewsCategory",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_NewsCategoryMapping_NewsModelId",
                table: "NewsCategoryMapping",
                column: "NewsModelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NewsCategoryMapping");

            migrationBuilder.DropTable(
                name: "NewsCategory");
        }
    }
}
