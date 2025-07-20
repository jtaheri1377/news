using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class editUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Provinces",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Provinces_UserId",
                table: "Provinces",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Provinces_Users_UserId",
                table: "Provinces",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Provinces_Users_UserId",
                table: "Provinces");

            migrationBuilder.DropIndex(
                name: "IX_Provinces_UserId",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Provinces");
        }
    }
}
