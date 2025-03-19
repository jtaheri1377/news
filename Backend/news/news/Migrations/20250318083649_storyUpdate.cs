using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class storyUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_Stories_StoryId",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "MediaId",
                table: "Stories");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_Stories_StoryId",
                table: "Medias",
                column: "StoryId",
                principalTable: "Stories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_Stories_StoryId",
                table: "Medias");

            migrationBuilder.AddColumn<int>(
                name: "MediaId",
                table: "Stories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_Stories_StoryId",
                table: "Medias",
                column: "StoryId",
                principalTable: "Stories",
                principalColumn: "Id");
        }
    }
}
