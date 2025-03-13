using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace news.Migrations
{
    /// <inheritdoc />
    public partial class updateNewsCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // حذف کلید خارجی در جدول mapping که به NewsCategory اشاره دارد
            migrationBuilder.DropForeignKey(
                  name: "FK_NewsCategoryMapping_NewsCategoryId",
                  table: "NewsCategoryMapping");

            // حذف کلید خارجی خودارجاعی در جدول NewsCategory
            migrationBuilder.DropForeignKey(
                  name: "FK_NewsCategory_NewsCategory_ParentId",
                  table: "NewsCategory");

            // حذف کلید اصلی از جدول NewsCategory
            migrationBuilder.DropPrimaryKey(
                  name: "PK_NewsCategory",
                  table: "NewsCategory");

            // تغییر نام جدول NewsCategory به NewsCategories
            migrationBuilder.RenameTable(
                  name: "NewsCategory",
                  newName: "NewsCategories");

            // تغییر نام ایندکس‌های جدول
            migrationBuilder.RenameIndex(
                  name: "IX_NewsCategory_ParentId",
                  table: "NewsCategories",
                  newName: "IX_NewsCategories_ParentId");

            // افزودن ستون حذف منطقی
            migrationBuilder.AddColumn<bool>(
                  name: "IsDeleted",
                  table: "NewsCategories",
                  type: "bit",
                  nullable: false,
                  defaultValue: false);

            // اضافه کردن کلید اصلی جدید برای جدول NewsCategories
            migrationBuilder.AddPrimaryKey(
                  name: "PK_NewsCategories",
                  table: "NewsCategories",
                  column: "Id");

            // اضافه کردن کلید خارجی خودارجاعی جدید
            migrationBuilder.AddForeignKey(
                  name: "FK_NewsCategories_NewsCategories_ParentId",
                  table: "NewsCategories",
                  column: "ParentId",
                  principalTable: "NewsCategories",
                  principalColumn: "Id",
                  onDelete: ReferentialAction.Restrict);

            // اضافه کردن مجدد کلید خارجی جدول mapping با ارجاع به جدول جدید
            migrationBuilder.AddForeignKey(
                  name: "FK_NewsCategoryMapping_NewsCategories_NewsCategoryId",
                  table: "NewsCategoryMapping",
                  column: "NewsCategoryId",
                  principalTable: "NewsCategories",
                  principalColumn: "Id",
                  onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // حذف کلید خارجی جدید از جدول mapping
            migrationBuilder.DropForeignKey(
                  name: "FK_NewsCategoryMapping_NewsCategories_NewsCategoryId",
                  table: "NewsCategoryMapping");

            migrationBuilder.DropForeignKey(
                  name: "FK_NewsCategories_NewsCategories_ParentId",
                  table: "NewsCategories");

            migrationBuilder.DropPrimaryKey(
                  name: "PK_NewsCategories",
                  table: "NewsCategories");

            migrationBuilder.DropColumn(
                  name: "IsDeleted",
                  table: "NewsCategories");

            // تغییر نام جدول به حالت اولیه
            migrationBuilder.RenameTable(
                  name: "NewsCategories",
                  newName: "NewsCategory");

            migrationBuilder.RenameIndex(
                  name: "IX_NewsCategories_ParentId",
                  table: "NewsCategory",
                  newName: "IX_NewsCategory_ParentId");

        }
    }
}
