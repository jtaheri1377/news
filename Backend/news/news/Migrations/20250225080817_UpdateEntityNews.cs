using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class UpdateEntityNews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Reviews",
                table: "News",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "StudyTime",
                table: "News",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "img",
                table: "News",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reviews",
                table: "News");

            migrationBuilder.DropColumn(
                name: "StudyTime",
                table: "News");

            migrationBuilder.DropColumn(
                name: "img",
                table: "News");
        }
    }
}
