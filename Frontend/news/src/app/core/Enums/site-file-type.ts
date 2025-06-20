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
  FirstSocialLinkImage = 9,
  SecondSocialLinkImage = 10,
  ThirdSocialLinkImage = 11,
  ForthSocialLinkImage = 12,
}

export const SiteFileDisplayNames: {
  [key in keyof typeof SiteFileType]?: string;
} = {
  Rules: 'قوانین و مقررات',
  HomeTopImage: 'تصویر بالای صفحه (دسکتاپ)',
  HomeTopImageMobile: 'تصویر بالای صفحه (موبایل)',
  // FirstAdImage: 'بنر اول',
  // SecondAdImage: 'بنر دوم',
  FirstLinkImage: 'عکس لینک اول',
  SecondLinkImage: 'عکس لینک دوم',
  ThirdLinkImage: 'عکس لینک سوم',
  ForthLinkImage: 'عکس لینک چهارم',
  FirstSocialLinkImage: 'عکس فضای مجازی اول',
  SecondSocialLinkImage: 'عکس فضای مجازی دوم',
  ThirdSocialLinkImage: 'عکس فضای مجازی سوم',
  ForthSocialLinkImage: 'عکس فضای مجازی چهارم',
};
