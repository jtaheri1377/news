export const NewsCategories = [
   { id: 2, name: "هیئت رئیسه", slug: "heyat-raeesah" },
   { id: 3, name: "فرهنگی", slug: "farhangi" },
   { id: 4, name: "سیاسی", slug: "siyasi" },
  // سایر دسته‌ها...
 ] as const;

export type NewsCategoryKey = keyof typeof NewsCategories;
