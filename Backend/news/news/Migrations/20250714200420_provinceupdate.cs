using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class provinceupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "Provinces",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Provinces_RoleId",
                table: "Provinces",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Provinces_Roles_RoleId",
                table: "Provinces",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Provinces_Roles_RoleId",
                table: "Provinces");

            migrationBuilder.DropIndex(
                name: "IX_Provinces_RoleId",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "Provinces");
        }
    }
}
