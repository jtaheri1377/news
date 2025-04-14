using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class editNewsContenttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewsContent_News_NewsModelId",
                table: "NewsContent");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NewsContent",
                table: "NewsContent");

            migrationBuilder.RenameTable(
                name: "NewsContent",
                newName: "NewsContents");

            migrationBuilder.RenameIndex(
                name: "IX_NewsContent_NewsModelId",
                table: "NewsContents",
                newName: "IX_NewsContents_NewsModelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NewsContents",
                table: "NewsContents",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NewsContents_News_NewsModelId",
                table: "NewsContents",
                column: "NewsModelId",
                principalTable: "News",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewsContents_News_NewsModelId",
                table: "NewsContents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NewsContents",
                table: "NewsContents");

            migrationBuilder.RenameTable(
                name: "NewsContents",
                newName: "NewsContent");

            migrationBuilder.RenameIndex(
                name: "IX_NewsContents_NewsModelId",
                table: "NewsContent",
                newName: "IX_NewsContent_NewsModelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NewsContent",
                table: "NewsContent",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NewsContent_News_NewsModelId",
                table: "NewsContent",
                column: "NewsModelId",
                principalTable: "News",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
