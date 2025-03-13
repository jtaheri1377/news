using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class updateProvinceModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "Region",
                table: "Provinces");

            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "Provinces",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Provinces_ParentId",
                table: "Provinces",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Provinces_Provinces_ParentId",
                table: "Provinces",
                column: "ParentId",
                principalTable: "Provinces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Provinces_Provinces_ParentId",
                table: "Provinces");

            migrationBuilder.DropIndex(
                name: "IX_Provinces_ParentId",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "Provinces");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Provinces",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Region",
                table: "Provinces",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
