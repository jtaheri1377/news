using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class addStoryModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StoryId",
                table: "Medias",
                type: "int",
                nullable: true);

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
                    MediaId = table.Column<int>(type: "int", nullable: false),
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

            migrationBuilder.CreateIndex(
                name: "IX_Medias_StoryId",
                table: "Medias",
                column: "StoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Stories_ProvinceId",
                table: "Stories",
                column: "ProvinceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_Stories_StoryId",
                table: "Medias",
                column: "StoryId",
                principalTable: "Stories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_Stories_StoryId",
                table: "Medias");

            migrationBuilder.DropTable(
                name: "Stories");

            migrationBuilder.DropIndex(
                name: "IX_Medias_StoryId",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "StoryId",
                table: "Medias");
        }
    }
}
