using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class RelationProvincesToStory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stories_Provinces_ProvinceId",
                table: "Stories");

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_Provinces_ProvinceId",
                table: "Stories",
                column: "ProvinceId",
                principalTable: "Provinces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stories_Provinces_ProvinceId",
                table: "Stories");

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_Provinces_ProvinceId",
                table: "Stories",
                column: "ProvinceId",
                principalTable: "Provinces",
                principalColumn: "Id");
        }
    }
}
