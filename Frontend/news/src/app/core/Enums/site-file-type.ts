export enum SiteFileType {
  Rules = 0,
  HomeTopImage = 1,
  HomeTopImageMobile = 2,
  // FirstAdImage = 3,
  // SecondAdImage = 4,
  FirstLinkImage = 5,
  SecondLinkImage = 6,
  ThirdLinkImage = 7,
  ForthLinkImage = 8,

}

export const SiteFileDisplayNames: {
  [key in keyof typeof SiteFileType]?: string;
} = {
  Rules: 'قوانین',
  HomeTopImage: 'تصویر بالای صفحه (دسکتاپ)',
  HomeTopImageMobile: 'تصویر بالای صفحه (موبایل)',
  // FirstAdImage: 'بنر اول',
  // SecondAdImage: 'بنر دوم',
  FirstLinkImage: 'عکس لینک اول',
  SecondLinkImage: 'عکس لینک دوم',
  ThirdLinkImage: 'عکس لینک سوم',
  ForthLinkImage: 'عکس لینک چهارم',
};
