using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class AddSubjectEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Units_UnitId",
                table: "News");

            migrationBuilder.AlterColumn<int>(
                name: "UnitId",
                table: "News",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "SubjectId",
                table: "News",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_News_SubjectId",
                table: "News",
                column: "SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Subjects_SubjectId",
                table: "News",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Units_UnitId",
                table: "News",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Subjects_SubjectId",
                table: "News");

            migrationBuilder.DropForeignKey(
                name: "FK_News_Units_UnitId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_News_SubjectId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "SubjectId",
                table: "News");

            migrationBuilder.AlterColumn<int>(
                name: "UnitId",
                table: "News",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "NewsModelSubject",
                columns: table => new
                {
                    SubjectsId = table.Column<int>(type: "int", nullable: false),
                    newsModelsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsModelSubject", x => new { x.SubjectsId, x.newsModelsId });
                    table.ForeignKey(
                        name: "FK_NewsModelSubject_News_newsModelsId",
                        column: x => x.newsModelsId,
                        principalTable: "News",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NewsModelSubject_Subjects_SubjectsId",
                        column: x => x.SubjectsId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NewsModelSubject_newsModelsId",
                table: "NewsModelSubject",
                column: "newsModelsId");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Units_UnitId",
                table: "News",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
