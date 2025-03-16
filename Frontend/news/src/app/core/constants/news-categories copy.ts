export const NewsCategories = {
  majmaOmoomi: {
    id: 3,
    name: 'جلسات مجمع عمومی',
    title: 'جلسات مجمع عمومی',
    slug: 'majma-omoomi',
    seoDescription: 'مهمترین اخبار را در سایت خبری ما دنبال کنید',
  },
  heyatRaeesah: {
    id: 2,
    name: 'جلسات هیئت رئیسه',
    title: 'جلسات هیئت رئیسه',
    slug: 'heyat-raeesah',
    seoDescription: 'مهمترین اخبار را در سایت خبری ما دنبال کنید',
  },
  majmaOstani: {
    id: 4,
    name: 'جلسات مجمع استانی',
    title: 'جلسات مجمع استانی',
    slug: 'majma-ostani',
    seoDescription: 'مهمترین اخبار را در سایت خبری ما دنبال کنید',
  },
} as const;

export type NewsCategoryKey = keyof typeof NewsCategories;

export function getCategoryInfo(category: NewsCategoryKey) {
  return NewsCategories[category];
}
