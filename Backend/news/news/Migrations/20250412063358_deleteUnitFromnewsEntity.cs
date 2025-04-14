using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class deleteUnitFromnewsEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Units_UnitId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_News_UnitId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "UnitId",
                table: "News");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UnitId",
                table: "News",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_News_UnitId",
                table: "News",
                column: "UnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Units_UnitId",
                table: "News",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id");
        }
    }
}
