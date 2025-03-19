using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class updateMediaEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Medias",
                newName: "FileUrl");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Medias",
                newName: "FileType");

            migrationBuilder.AddColumn<string>(
                name: "Extension",
                table: "Medias",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Medias",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UploadDate",
                table: "Medias",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Extension",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "UploadDate",
                table: "Medias");

            migrationBuilder.RenameColumn(
                name: "FileUrl",
                table: "Medias",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "FileType",
                table: "Medias",
                newName: "Title");
        }
    }
}
