using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class editUser1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "ProvinceUser",
                columns: table => new
                {
                    RepresentativeProvincesId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProvinceUser", x => new { x.RepresentativeProvincesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_ProvinceUser_Provinces_RepresentativeProvincesId",
                        column: x => x.RepresentativeProvincesId,
                        principalTable: "Provinces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProvinceUser_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProvinceUser_UsersId",
                table: "ProvinceUser",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProvinceUser");

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
    }
}
