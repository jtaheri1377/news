export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  children?: Record<string, NewsCategory>;
}

export const NewsCategories: Record<string, NewsCategory> = {
  jalasat: {
    id: 1,
    name: 'جلسات',
    slug: 'jalasat',
    children: {
      heyatRaeesah: {
        id: 2,
        name: 'جلسات هیئت رئیسه',
        slug: 'jalasat-heyat-raeesah',
      },
      majmaOmoomi: {
        id: 3,
        name: 'جلسات مجمع عمومی',
        slug: 'jalasat-majma-omoomi',
      },
      majmaOstani: {
        id: 4,
        name: 'جلسات مجمع استانی',
        slug: 'jalasat-majma-ostani',
      },
    },
  },
  interviews: {
    id: 0,
    name: 'مصاحبه',
    slug: 'interviews',
    children: {
      mosahebeHeyatRaeeseh: {
        id: 6,
        name: 'مصاحبه هیئت رئیسه',
        slug: 'mosahebe-heyat-raeesah',
      },
      mosahebeRoasaOstan: {
        id: 7,
        name: 'مصاحبه رؤسای مجامع استانی',
        slug: 'mosahebe-roasa-majame-ostani',
      },
      mosahebeRoasaCommission: {
        id: 8,
        name: 'مصاحبه رؤسای کمیسیون ها',
        slug: 'mosahebe-roasa-commission',
      },
      mosahehebeNamayandeShahrha: {
        id: 9,
        name: 'مصاحبه نمایندگان شهرها',
        slug: 'mosahebe-namayandegan',
      },
    },
  },
  commissions: {
    id: 10,
    name: 'کمیسیون سیاسی',
    slug: 'commissions',
    children: {
      commissionSeeyasi: {
        id: 10,
        name: 'کمیسیون سیاسی',
        slug: 'commission-seeyasi',
      },
      commissionFaraminEmam: {
        id: 11,
        name: 'کمیسیون پیگیری فرامین امام و رهبری',
        slug: 'commission-faramin-emam-rahbari',
      },
      commissionHozeDaneshgah: {
        id: 12,
        name: 'کمیسیون حوزه و دانشگاه',
        slug: 'commission-hoze-daneshgah',
      },
      commissionTarhBarname: {
        id: 13,
        name: 'کمیسیون طرح و برنامه',
        slug: 'commission-tarh-barname',
      },
      commissionTahqiqatElmi: {
        id: 14,
        name: 'کمیسیون تحقیقات علمی',
        slug: 'commission-Tahqiqat-elmi',
      },
      commissionTashkilatElmi: {
        id: 14,
        name: 'کمیسیون تشکیلات علمی',
        slug: 'commission-Tashkilat-elmi',
      },
      commissionTahqiqBarresi: {
        id: 16,
        name: 'کمیسیون تحقیق و بررسی',
        slug: 'commission-tahqiq-barresi',
      },
      commissionjazbGozinesh: {
        id: 17,
        name: 'کمیسیون جذب و گزینش',
        slug: 'commission-jazb-gozinesh',
      },
      commissionMaliEqtesadi: {
        id: 18,
        name: 'کمیسیون مالی و اقتصادی',
        slug: 'commission-mali-eqtesadi',
      },
      commissionTabilqat: {
        id: 19,
        name: 'کمیسیون تبلیغات',
        slug: 'commission-tabliqat',
      },
      commissionBasijAmadegi: {
        id: 20,
        name: 'کمیسیون بسیج و آمادگی',
        slug: 'commission-basij-amadegi',
      },
      commissionAmoozesh: {
        id: 21,
        name: 'کمیسیون آموزش',
        slug: 'commission-amoozesh',
      },
      commissionAkhlaq: {
        id: 22,
        name: 'کمیسیون اخلاق',
        slug: 'commission-akhlaq',
      },
      commissionFazaMajazi: {
        id: 23,
        name: 'کمیسیون فضای مجازی',
        slug: 'commission-faza-majazi',
      },
    },
  },
  // ... دسته‌بندی‌های دیگر
} as const;
