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
      majmaOmoomi: {
        id: 7,
        name: 'جلسات مجمع عمومی',
        slug: 'jalasat-majma-omoomi',
      },
      majmaOstani: {
        id: 8,
        name: 'جلسات مجامع استانی',
        slug: 'jalasat-majma-ostani',
      },
      heyatRaeesah: {
        id: 9,
        name: 'جلسات هیئت رئیسه',
        slug: 'jalasat-heyat-raeesah',
      },
    },
  },
  interviews: {
    id: 2,
    name: 'مصاحبه ها',
    slug: 'interviews',
    children: {
      mosahebeHeyatRaeeseh: {
        id: 10,
        name: 'مصاحبه هیئت رئیسه',
        slug: 'mosahebe-heyat-raeesah',
      },
      mosahebeRoasaOstan: {
        id: 11,
        name: 'مصاحبه رؤسای مجامع استانی',
        slug: 'mosahebe-roasa-majame-ostani',
      },
      mosahebeRoasaCommission: {
        id: 12,
        name: 'مصاحبه رؤسای کمیسیون ها',
        slug: 'mosahebe-roasa-commission',
      },
      mosahehebeNamayandeShahrha: {
        id: 13,
        name: 'مصاحبه نمایندگان شهرها',
        slug: 'mosahebe-namayandegan',
      },
    },
  },
  notgh: {
    id: 3,
    name: 'نطق ها',
    slug: 'notgh',
    children: {
      notghPishAsDastoorMajmaOmoomi: {
        id: 14,
        name: 'نطق پیش از دستور در مجمع عمومی',
        slug: 'notgh-pish-as-dastoor-majma-omoomi',
      },
      notghHeyatRaeeseh: {
        id: 15,
        name: 'نطق اعضای هیئت رئیسه',
        slug: 'notgh-Heyat-Raeeseh',
      },
    },
  },
  bayaniyeh: {
    id: 4,
    name: 'بیانیه ها',
    slug: 'bayaniyeh',
    children: {
      bayaniyehha: {
        id: 35,
        name: 'بیانیه هیئت رئیسه',
        slug: 'bayaniyeh-Heyat-Raeeseh',
      },
    },
  },
  hokm: {
    id: 5,
    name: 'حکم ها',
    slug: 'hokm',
    children: {
      hokmha: {
        id: 36,
        name: 'حکم ها ',
        slug: 'hokmha',
      },
    },
  },
  maghalat: {
    id: 6,
    name: 'مقالات',
    slug: 'maghalat',
    children: {
      // heyatRaeesah: {
      //   id: 2,
      //   name: 'جلسات هیئت رئیسه',
      //   slug: 'jalasat-heyat-raeesah',
      // },
    },
  },
  goftogoo: {
    id: 16,
    name: 'گفتگوها',
    slug: 'goftogoo',
    children: {
      goftogooMajmaOmoomi: {
        id: 17,
        name: 'گفتگوی مجمع عمومی با نمایندگان',
        slug: 'goftogoo-majma-omoomi',
      },
    },
  },
  commissions: {
    id: 18,
    name: 'کمیسیون',
    slug: 'commissions',
    children: {
      commissionSeeyasi: {
        id: 19,
        name: 'کمیسیون سیاسی',
        slug: 'commission-seeyasi',
      },
      commissionFaraminEmam: {
        id: 20,
        name: 'کمیسیون پیگیری فرامین امام و رهبری',
        slug: 'commission-faramin-emam-rahbari',
      },
      commissionHozeDaneshgah: {
        id: 21,
        name: 'کمیسیون حوزه و دانشگاه',
        slug: 'commission-hoze-daneshgah',
      },
      commissionTarhBarname: {
        id: 22,
        name: 'کمیسیون طرح و برنامه',
        slug: 'commission-tarh-barname',
      },
      commissionTahqiqatElmi: {
        id: 23,
        name: 'کمیسیون تحقیقات علمی',
        slug: 'commission-Tahqiqat-elmi',
      },
      commissionTashkilatElmi: {
        id: 24,
        name: 'کمیسیون تشکیلات علمی',
        slug: 'commission-Tashkilat-elmi',
      },
      commissionTahqiqBarresi: {
        id: 25,
        name: 'کمیسیون تحقیق و بررسی',
        slug: 'commission-tahqiq-barresi',
      },
      commissionjazbGozinesh: {
        id: 26,
        name: 'کمیسیون جذب و گزینش',
        slug: 'commission-jazb-gozinesh',
      },
      commissionMaliEqtesadi: {
        id: 27,
        name: 'کمیسیون مالی و اقتصادی',
        slug: 'commission-mali-eqtesadi',
      },
      commissionTabilqat: {
        id: 28,
        name: 'کمیسیون تبلیغات',
        slug: 'commission-tabliqat',
      },
      commissionBasijAmadegi: {
        id: 29,
        name: 'کمیسیون بسیج و آمادگی',
        slug: 'commission-basij-amadegi',
      },
      commissionAmoozesh: {
        id: 30,
        name: 'کمیسیون آموزش',
        slug: 'commission-amoozesh',
      },
      commissionAkhlaq: {
        id: 31,
        name: 'کمیسیون اخلاق',
        slug: 'commission-akhlaq',
      },
      commissionFazaMajazi: {
        id: 32,
        name: 'کمیسیون فضای مجازی',
        slug: 'commission-faza-majazi',
      },
    },
  },
  akhbarDigar: {
    id: 33,
    name: 'اخبار دیگر',
    slug: 'akhbar',
    children: {
      hozeh: {
        id: 34,
        name: 'اخبار حوزه',
        slug: 'hozeh',
      },
    },
  },
  note: {
    id: 37,
    name: 'اطلاعیه',
    slug: 'note',
    children: {
      notes: {
        id: 38,
        name: 'اطلاعیه ها',
        slug: 'notes',
      },
    },
  },
  // ... دسته‌بندی‌های دیگر
} as const;
