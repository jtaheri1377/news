export interface NewsCategory {
  code: number;
  name: string;
  slug: string;
  children?: Record<string, NewsCategory>;
}

export const NewsCategories: Record<string, NewsCategory> = {
  jalasat: {
    code: 1,
    name: 'جلسات',
    slug: 'jalasat',
    children: {
      majmaOmoomi: {
        code: 7,
        name: 'جلسات مجمع عمومی',
        slug: 'jalasat-majma-omoomi',
      },
      majmaOstani: {
        code: 8,
        name: 'جلسات مجامع استانی',
        slug: 'jalasat-majma-ostani',
      },
      heyatRaeesah: {
        code: 9,
        name: 'جلسات هیئت رئیسه',
        slug: 'jalasat-heyat-raeesah',
      },
      omoomi: {
        code: 44,
        name: 'جلسات عمومی',
        slug: 'jalasat-omoomi',
      },
    },
  },
  interviews: {
    code: 2,
    name: 'مصاحبه ها',
    slug: 'interviews',
    children: {
      mosahebeHeyatRaeeseh: {
        code: 10,
        name: 'مصاحبه هیئت رئیسه',
        slug: 'mosahebe-heyat-raeesah',
      },
      mosahebeRoasaOstan: {
        code: 11,
        name: 'مصاحبه رؤسای مجامع استانی',
        slug: 'mosahebe-roasa-majame-ostani',
      },
      mosahebeRoasaCommission: {
        code: 12,
        name: 'مصاحبه رؤسای کمیسیون ها',
        slug: 'mosahebe-roasa-commission',
      },
      mosahehebeNamayandeShahrha: {
        code: 13,
        name: 'مصاحبه نمایندگان شهرها',
        slug: 'mosahebe-namayandegan',
      },
    },
  },
  notgh: {
    code: 3,
    name: 'نطق ها',
    slug: 'notgh',
    children: {
      notghPishAsDastoorMajmaOmoomi: {
        code: 14,
        name: 'نطق پیش از دستور در مجمع عمومی',
        slug: 'notgh-pish-as-dastoor-majma-omoomi',
      },
      notghHeyatRaeeseh: {
        code: 15,
        name: 'نطق اعضای هیئت رئیسه',
        slug: 'notgh-Heyat-Raeeseh',
      },
    },
  },
  bayaniyeh: {
    code: 4,
    name: 'بیانیه ها',
    slug: 'bayaniyeh',
    children: {
      bayaniyehha: {
        code: 35,
        name: 'بیانیه هیئت رئیسه',
        slug: 'bayaniyeh-Heyat-Raeeseh',
      },
    },
  },
  // hokm: {
  //   code: 5,
  //   name: 'حکم ها',
  //   slug: 'hokm',
  //   children: {
  //     hokmha: {
  //       code: 36,
  //       name: 'حکم ها ',
  //       slug: 'hokmha',
  //     },
  //   },
  // },
  // maghalat: {
  //   code: 6,
  //   name: 'مقالات',
  //   slug: 'maghalat',
  //   children: {
  //     // heyatRaeesah: {
  //     //   code: 2,
  //     //   name: 'جلسات هیئت رئیسه',
  //     //   slug: 'jalasat-heyat-raeesah',
  //     // },
  //   },
  // },
  goftogoo: {
    code: 16,
    name: 'گفتگوها',
    slug: 'goftogoo',
    children: {
      goftogooMajmaOmoomi: {
        code: 17,
        name: 'گفتگوی مجمع عمومی با نمایندگان',
        slug: 'goftogoo-majma-omoomi',
      },
    },
  },
  commissions: {
    code: 18,
    name: 'کمیسیون',
    slug: 'commissions',
    children: {
      commissionSeeyasi: {
        code: 19,
        name: 'کمیسیون سیاسی',
        slug: 'commission-seeyasi',
      },
      commissionFaraminEmam: {
        code: 20,
        name: 'کمیسیون پیگیری فرامین امام و رهبری',
        slug: 'commission-faramin-emam-rahbari',
      },
      commissionHozeDaneshgah: {
        code: 21,
        name: 'کمیسیون حوزه و دانشگاه',
        slug: 'commission-hoze-daneshgah',
      },
      commissionTarhBarname: {
        code: 22,
        name: 'کمیسیون طرح و برنامه',
        slug: 'commission-tarh-barname',
      },
      commissionTahqiqatElmi: {
        code: 23,
        name: 'کمیسیون تحقیقات علمی',
        slug: 'commission-Tahqiqat-elmi',
      },
      commissionTashkilatElmi: {
        code: 24,
        name: 'کمیسیون تشکیلات علمی',
        slug: 'commission-Tashkilat-elmi',
      },
      commissionTahqiqBarresi: {
        code: 25,
        name: 'کمیسیون تحقیق و بررسی',
        slug: 'commission-tahqiq-barresi',
      },
      commissionjazbGozinesh: {
        code: 26,
        name: 'کمیسیون جذب و گزینش',
        slug: 'commission-jazb-gozinesh',
      },
      commissionMaliEqtesadi: {
        code: 27,
        name: 'کمیسیون مالی و اقتصادی',
        slug: 'commission-mali-eqtesadi',
      },
      commissionTabilqat: {
        code: 28,
        name: 'کمیسیون تبلیغات',
        slug: 'commission-tabliqat',
      },
      commissionBasijAmadegi: {
        code: 29,
        name: 'کمیسیون بسیج و آمادگی',
        slug: 'commission-basij-amadegi',
      },
      commissionAmoozesh: {
        code: 30,
        name: 'کمیسیون آموزش',
        slug: 'commission-amoozesh',
      },
      commissionAkhlaq: {
        code: 31,
        name: 'کمیسیون اخلاق',
        slug: 'commission-akhlaq',
      },
      commissionFazaMajazi: {
        code: 32,
        name: 'کمیسیون فضای مجازی',
        slug: 'commission-faza-majazi',
      },
      tavabeCommission: {
        code: 45,
        name: 'توابع کمیسیون ها',
        slug: 'tavabe-commission',
      },
    },
  },
  akhbarDigar: {
    code: 33,
    name: 'اخبار دیگر',
    slug: 'akhbar',
    children: {
      hozeh: {
        code: 34,
        name: 'اخبار حوزه',
        slug: 'hozeh',
      },
    },
  },
  note: {
    code: 37,
    name: 'اطلاعیه',
    slug: 'note',
    children: {
      notes: {
        code: 38,
        name: 'اطلاعیه ها',
        slug: 'notes',
      },
    },
  },
  // ... دسته‌بندی‌های دیگر
} as const;
