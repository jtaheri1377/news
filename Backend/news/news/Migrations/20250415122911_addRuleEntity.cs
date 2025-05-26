using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class addSiteFileEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SiteFileId",
                table: "Medias",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SiteFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UploadId = table.Column<int>(type: "int", nullable: false),
                    FileUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Extension = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    Alt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UploadDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteFiles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Medias_SiteFileId",
                table: "Medias",
                column: "SiteFileId",
                unique: true,
                filter: "[SiteFileId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_SiteFiles_SiteFileId",
                table: "Medias",
                column: "SiteFileId",
                principalTable: "SiteFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_SiteFiles_SiteFileId",
                table: "Medias");

            migrationBuilder.DropTable(
                name: "SiteFiles");

            migrationBuilder.DropIndex(
                name: "IX_Medias_SiteFileId",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "SiteFileId",
                table: "Medias");
        }
    }
}
