using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMediaModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_News_NewsModelId",
                table: "Media");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media",
                table: "Media");

            migrationBuilder.RenameTable(
                name: "Media",
                newName: "Medias");

            migrationBuilder.RenameIndex(
                name: "IX_Media_NewsModelId",
                table: "Medias",
                newName: "IX_Medias_NewsModelId");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Medias",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Medias",
                table: "Medias",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_News_NewsModelId",
                table: "Medias",
                column: "NewsModelId",
                principalTable: "News",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_News_NewsModelId",
                table: "Medias");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Medias",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Medias");

            migrationBuilder.RenameTable(
                name: "Medias",
                newName: "Media");

            migrationBuilder.RenameIndex(
                name: "IX_Medias_NewsModelId",
                table: "Media",
                newName: "IX_Media_NewsModelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media",
                table: "Media",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Media_News_NewsModelId",
                table: "Media",
                column: "NewsModelId",
                principalTable: "News",
                principalColumn: "Id");
        }
    }
}
