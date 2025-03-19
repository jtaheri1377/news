using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNewsMode2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_News_NewsModelId",
                table: "Medias");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_News_NewsModelId",
                table: "Medias",
                column: "NewsModelId",
                principalTable: "News",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_News_NewsModelId",
                table: "Medias");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_News_NewsModelId",
                table: "Medias",
                column: "NewsModelId",
                principalTable: "News",
                principalColumn: "Id");
        }
    }
}
