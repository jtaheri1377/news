using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateOrUpdateSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProvinceUser_Provinces_RepresentativeProvincesId",
                table: "ProvinceUser");

            migrationBuilder.DropForeignKey(
                name: "FK_ProvinceUser_Users_UsersId",
                table: "ProvinceUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProvinceUser",
                table: "ProvinceUser");

            migrationBuilder.RenameTable(
                name: "ProvinceUser",
                newName: "UserRepresentativeProvinces");

            migrationBuilder.RenameIndex(
                name: "IX_ProvinceUser_UsersId",
                table: "UserRepresentativeProvinces",
                newName: "IX_UserRepresentativeProvinces_UsersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRepresentativeProvinces",
                table: "UserRepresentativeProvinces",
                columns: new[] { "RepresentativeProvincesId", "UsersId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserRepresentativeProvinces_Provinces_RepresentativeProvincesId",
                table: "UserRepresentativeProvinces",
                column: "RepresentativeProvincesId",
                principalTable: "Provinces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRepresentativeProvinces_Users_UsersId",
                table: "UserRepresentativeProvinces",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRepresentativeProvinces_Provinces_RepresentativeProvincesId",
                table: "UserRepresentativeProvinces");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRepresentativeProvinces_Users_UsersId",
                table: "UserRepresentativeProvinces");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRepresentativeProvinces",
                table: "UserRepresentativeProvinces");

            migrationBuilder.RenameTable(
                name: "UserRepresentativeProvinces",
                newName: "ProvinceUser");

            migrationBuilder.RenameIndex(
                name: "IX_UserRepresentativeProvinces_UsersId",
                table: "ProvinceUser",
                newName: "IX_ProvinceUser_UsersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProvinceUser",
                table: "ProvinceUser",
                columns: new[] { "RepresentativeProvincesId", "UsersId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProvinceUser_Provinces_RepresentativeProvincesId",
                table: "ProvinceUser",
                column: "RepresentativeProvincesId",
                principalTable: "Provinces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProvinceUser_Users_UsersId",
                table: "ProvinceUser",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
