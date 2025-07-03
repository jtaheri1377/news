import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class PersianPaginatorIntl extends MatPaginatorIntl {
  // برچسب "موارد در هر صفحه"
  override itemsPerPageLabel = 'تعداد آیتم در هر صفحه:';
  // برچسب "صفحه قبل"
  override nextPageLabel = 'صفحه بعد';
  // برچسب "صفحه بعد"
  override previousPageLabel = 'صفحه قبل';
  // برچسب "اولین صفحه"
  override firstPageLabel = 'اولین صفحه';
  // برچسب "آخرین صفحه"
  override lastPageLabel = 'آخرین صفحه';

  // این متد برای ساخت برچسب محدوده (مثلاً 1 - 10 از 100) استفاده می‌شود.
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 از ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // محاسبه endIndex با اطمینان از اینکه از طول کل بیشتر نشود.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} از ${length}`;
  };
}
