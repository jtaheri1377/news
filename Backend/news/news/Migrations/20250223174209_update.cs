using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Unit_UnitId",
                table: "News");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Unit",
                table: "Unit");

            migrationBuilder.RenameTable(
                name: "Unit",
                newName: "Units");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Units",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Units",
                table: "Units",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Units_UnitId",
                table: "News",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Units_UnitId",
                table: "News");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Units",
                table: "Units");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Units");

            migrationBuilder.RenameTable(
                name: "Units",
                newName: "Unit");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Unit",
                table: "Unit",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Unit_UnitId",
                table: "News",
                column: "UnitId",
                principalTable: "Unit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
