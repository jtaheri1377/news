export const NewsCategories = [
   { id: 2, name: "جلسات هیئت رئیسه", title:'جلسات هیئت رئیسه', slug: "heyat-raeesah",seoDescription:"مهمترین اخبار را در سایت خبری ما دنبال کنید" },
   { id: 3, name: "فرهنگی", slug: "farhangi" ,seoDescription:"مهمترین اخبار را در سایت خبری ما دنبال کنید"},
   { id: 4, name: "سیاسی", slug: "siyasi",seoDescription:"مهمترین اخبار را در سایت خبری ما دنبال کنید",  },
  // سایر دسته‌ها...
 ] as const;

export type NewsCategoryKey = keyof typeof NewsCategories;
