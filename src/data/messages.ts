import type { Locale } from "@/types/i18n";

type LocaleMessages = {
  brand: {
    tagline: string;
    description: string;
  };
  nav: {
    products: string;
    solutions: string;
    about: string;
    contact: string;
    demo: string;
    languageLabel: string;
    turkish: string;
    english: string;
  };
  common: {
    viewProducts: string;
    requestDemo: string;
    contactSales: string;
    navigation: string;
    learnMore: string;
    explorePlatform: string;
    exploreOtherProducts: string;
    backToHome: string;
    notFoundTitle: string;
    notFoundDescription: string;
    statusLabel: string;
    status: {
      live: string;
      beta: string;
      comingSoon: string;
    };
    intent: {
      demo: string;
      beta_interest: string;
      early_access: string;
      general_contact: string;
    };
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
    platformOverview: {
      eyebrow: string;
      title: string;
      description: string;
      points: string[];
    };
    products: {
      eyebrow: string;
      title: string;
      description: string;
      ecosystemTitle: string;
      ecosystemDescription: string;
      statusSummary: {
        live: string;
        beta: string;
        comingSoon: string;
      };
    };
    solutions: {
      eyebrow: string;
      title: string;
      description: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    trust: {
      eyebrow: string;
      title: string;
      stats: {
        value: string;
        label: string;
      }[];
    };
    cta: {
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
  productsPage: {
    eyebrow: string;
    title: string;
    description: string;
  };
  productPage: {
    featuresTitle: string;
    audienceTitle: string;
    relatedTitle: string;
    statusMessages: {
      live: {
        title: string;
        description: string;
        primaryCta: string;
      };
      beta: {
        title: string;
        description: string;
        primaryCta: string;
      };
      comingSoon: {
        title: string;
        description: string;
        primaryCta: string;
      };
    };
  };
  solutionsPage: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  aboutPage: {
    eyebrow: string;
    title: string;
    description: string;
    pillars: {
      title: string;
      description: string;
    }[];
  };
  contactPage: {
    eyebrow: string;
    title: string;
    description: string;
    cards: {
      title: string;
      description: string;
    }[];
  };
  demoPage: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    intentLabel: string;
    intents: {
      demo: {
        title: string;
        description: string;
      };
      beta_interest: {
        title: string;
        description: string;
      };
      early_access: {
        title: string;
        description: string;
      };
      general_contact: {
        title: string;
        description: string;
      };
    };
  };
  legalPage: {
    privacyTitle: string;
    termsTitle: string;
    description: string;
  };
  comingSoonPage: {
    status: string;
    logo: string;
    slogan: string;
    placeholder: string;
    button: string;
    success: string;
    version: string;
  };
  footer: {
    description: string;
    legal: string;
    rights: string;
  };
};

export const messages: Record<Locale, LocaleMessages> = {
  tr: {
    brand: {
      tagline: "Radar urunleri icin ortak platform",
      description:
        "YAKALA, farkli is ihtiyaclari icin gelisen Radar urunlerini tek bir kurumsal cati altinda sunar.",
    },
    nav: {
      products: "Urunler",
      solutions: "Cozumler",
      about: "Hakkimizda",
      contact: "Iletisim",
      demo: "Demo Talebi",
      languageLabel: "Dil",
      turkish: "TR",
      english: "EN",
    },
    common: {
      viewProducts: "Urunleri gorun",
      requestDemo: "Demo isteyin",
      contactSales: "Ekiple iletisime gecin",
      navigation: "Gezinme",
      learnMore: "Detaylari gorun",
      explorePlatform: "Platformu inceleyin",
      exploreOtherProducts: "Diger Radar urunlerini kesfedin",
      backToHome: "Ana sayfaya donun",
      notFoundTitle: "Sayfa bulunamadi",
      notFoundDescription: "Aradiginiz sayfa tasinmis, kaldirilmis veya hic olusturulmamis olabilir.",
      statusLabel: "Durum",
      status: {
        live: "Canli",
        beta: "Beta",
        comingSoon: "Cok yakinda",
      },
      intent: {
        demo: "Demo talebi",
        beta_interest: "Beta ilgisi",
        early_access: "Erken erisim",
        general_contact: "Genel iletisim",
      },
    },
    home: {
      hero: {
        eyebrow: "YAKALA.IO",
        title: "Birden fazla Radar urununu tasiyan kurumsal izleme platformu.",
        description:
          "YAKALA, ihale, hibe, rekabet, pazar ve sektor sinyallerini takip etmek icin gelisen bir urun eko-sistemi sunar. Tek bir ana marka altinda, farkli ekiplerin ihtiyacina uygun uzman Radar urunleri yer alir.",
        primaryCta: "Demo isteyin",
        secondaryCta: "Urun ekosistemini gorun",
      },
      platformOverview: {
        eyebrow: "Platform Yaklasimi",
        title: "Tek bir urun degil, buyuyen bir urun evi.",
        description:
          "Site mimarisi, YAKALA'nin yalnizca bugunku Radar urunlerini degil, gelecekte eklenecek yeni urunlerini de ayni sistem icinde sunmak icin kurgulanir.",
        points: [
          "Tek ana marka altinda moduler urun yapisi",
          "B2B ekipler icin uzmanlasmis Radar cozumleri",
          "Yeni urunler eklendiginde yeniden tasarim gerektirmeyen sistem",
        ],
      },
      products: {
        eyebrow: "Radar Urunleri",
        title: "Urun ailesi tek merkezde yonetilir.",
        description:
          "Tum Radar urunleri ortak veri yapisindan uretilir. Bu sayede urun listesi, detay sayfalari ve anasayfa icerigi buyumeye hazir kalir.",
        ecosystemTitle: "YAKALA ekosistemi tek urunden ibaret degildir.",
        ecosystemDescription:
          "Canli urunler, beta surecindeki urunler ve yaklasan lansmanlar birlikte gorunur. Böylece YAKALA, buyuyen bir urun evi olarak okunur.",
        statusSummary: {
          live: "Canli urun",
          beta: "Beta urun",
          comingSoon: "Yaklasan urun",
        },
      },
      solutions: {
        eyebrow: "Cozum Alanlari",
        title: "YAKALA, ekiplerin farkli izleme ihtiyaclarina gore konumlanir.",
        description:
          "Urunleri yalnizca isim bazinda degil, cozdikleri is problemi bazinda da konumlandiriyoruz.",
        items: [
          {
            title: "Firsat takibi",
            description: "Ihale, hibe ve yeni pazar sinyallerini daha erken yakalayin.",
          },
          {
            title: "Pazar ve rakip izleme",
            description: "Degisen rekabet ortaminda kritik hareketleri duzenli takip edin.",
          },
          {
            title: "Dikey uzmanlik",
            description: "Belirli sektorler icin uzmanlasan Radar urunleriyle daha net akis kurun.",
          },
        ],
      },
      trust: {
        eyebrow: "Neden YAKALA",
        title: "Kisitli ama guclu bir B2B urun dili.",
        stats: [
          { value: "8", label: "Mevcut Radar urunu" },
          { value: "3", label: "Urun durumu seviyesi" },
          { value: "1", label: "Tek cati marka mimarisi" },
        ],
      },
      cta: {
        title: "YAKALA urun ailesini kendi operasyonunuza uygun sekilde gorun.",
        description:
          "Canli urunleri, beta urunleri ve yaklasan Radar lansmanlarini birlikte degerlendirmek icin ekiple gorusun.",
        primaryCta: "Demo talep edin",
        secondaryCta: "Iletisim kurun",
      },
    },
    productsPage: {
      eyebrow: "Tum Urunler",
      title: "YAKALA Radar urun ailesi",
      description:
        "Her Radar urunu farkli bir izleme ihtiyacina odaklanir; tumu tek bir kurumsal sistem icinde konumlanir.",
    },
    productPage: {
      featuresTitle: "One cikan ozellikler",
      audienceTitle: "Kimler icin",
      relatedTitle: "Diger Radar urunleri",
      statusMessages: {
        live: {
          title: "Urun aktif olarak incelenmeye hazir",
          description:
            "Bu Radar urunu canli durumdadir. Kapsamini inceleyebilir ve ekibiniz icin uygun bir demo akisi planlayabilirsiniz.",
          primaryCta: "Demo planlayin",
        },
        beta: {
          title: "Beta surecinde erken ilgi topluyor",
          description:
            "Bu Radar urunu beta asamasindadir. Ekibiniz icin uygunlugunu degerlendirmek ve erken erisim ilgisi iletmek icin bizimle gorusebilirsiniz.",
          primaryCta: "Beta ilgisi iletin",
        },
        comingSoon: {
          title: "Lansman oncesi teaser asamasinda",
          description:
            "Bu Radar urunu yakinda kullanima acilacak. Erken erisim talebi birakarak lansman planina uygun sekilde haberdar olabilirsiniz.",
          primaryCta: "Erken erisim isteyin",
        },
      },
    },
    solutionsPage: {
      eyebrow: "Cozumler",
      title: "Urunlerden daha buyuk bir is problemi haritasi",
      description:
        "YAKALA, ekiplerin firsat yakalama, pazar izleme ve sektorel takip gibi farkli ihtiyaclarini bir urun ailesi mantigiyla karsilar.",
      items: [
        {
          title: "Kurumsal firsat takibi",
          description: "Ihale, hibe ve yeni is firsatlarini tek bir izleme disipliniyle yonetin.",
        },
        {
          title: "Surekli sinyal toplama",
          description: "Daginiik veri kaynaklarini ekibiniz icin takip edilebilir akislar haline getirin.",
        },
        {
          title: "Sektorel ve dikey izleme",
          description: "Belirli alanlarda daha derin goru kazandiran uzman Radar urunleri kullanin.",
        },
      ],
    },
    aboutPage: {
      eyebrow: "Hakkimizda",
      title: "YAKALA, buyuyen bir urun catisi olarak tasarlandi.",
      description:
        "Marka kurgusu, tek bir kampanya sitesinden ziyade bir urun evi mantigina dayanir. Her yeni Radar urunu, ayni tasarim sistemi ve icerik modeli icinde konumlanir.",
      pillars: [
        {
          title: "Modulerlik",
          description: "Yeni urun eklemek mevcut sistemi bozmaz.",
        },
        {
          title: "Kurumsal sadelik",
          description: "Tasarim dili dikkat cekmek yerine guven vermeyi hedefler.",
        },
        {
          title: "Operasyonel netlik",
          description: "Pazarlama dili, urunlerin is degerini acik bicimde sunar.",
        },
      ],
    },
    contactPage: {
      eyebrow: "Iletisim",
      title: "Ekiple dogrudan iletisime gecin",
      description:
        "Platform, urun ailesi veya is ihtiyaciniza uygun Radar cozumleri hakkinda bizimle gorusebilirsiniz.",
      cards: [
        {
          title: "Genel iletisim",
          description: "Marka ve urun ailesi hakkinda sorular icin.",
        },
        {
          title: "Demo gorusmesi",
          description: "Urunlerin is akislariniza nasil uydugunu degerlendirmek icin.",
        },
      ],
    },
    demoPage: {
      eyebrow: "Demo Talebi",
      title: "Ihtiyaciniza uygun Radar urunlerini birlikte degerlendirelim",
      description:
        "Bu sayfa, form entegrasyonu gelene kadar sade bir demo cagrisi olarak konumlanir. Sonraki asamada kolayca forma veya CRM akisina baglanabilir.",
      bullets: [
        "Canli urunlerin kapsamlarini gorun",
        "Beta urunler icin erken erisim talebi iletin",
        "Yaklasan urunler icin uygun yol haritasini gorusun",
      ],
      intentLabel: "Talep tipi",
      intents: {
        demo: {
          title: "Demo talebi",
          description: "Canli urunler icin bir demo gorusmesi planlamaya hazirsiniz.",
        },
        beta_interest: {
          title: "Beta ilgisi",
          description: "Beta asamasindaki urunler icin erken kullanim ve geri bildirim istegi iletiyorsunuz.",
        },
        early_access: {
          title: "Erken erisim talebi",
          description: "Yaklasan urunler icin lansman oncesi haberdar olmak istiyorsunuz.",
        },
        general_contact: {
          title: "Genel iletisim",
          description: "Platform veya urun ailesi hakkinda genel bir gorusme talep ediyorsunuz.",
        },
      },
    },
    legalPage: {
      privacyTitle: "Gizlilik Politikasi",
      termsTitle: "Kullanim Kosullari",
      description:
        "Bu sayfa, yasal metinler gelene kadar yer tutucu olarak kullanilir ve sonradan kolayca gercek icerikle degistirilebilir.",
    },
    comingSoonPage: {
      status: "Sistem Hazirlaniyor // V3.0",
      logo: "YAKALA",
      slogan: "Isinizi buyuten radar uygulamalari",
      placeholder: "E-posta adresinizi birakin...",
      button: "Haberdar Et",
      success: "Kaydiniz alindi. Tesekkurler!",
      version: "V3.0 Intelligence Platform",
    },
    footer: {
      description:
        "YAKALA, coklu Radar urunlerini tek bir kurumsal platform catisi altinda sunar.",
      legal: "Yasal",
      rights: "Tum haklari saklidir.",
    },
  },
  en: {
    brand: {
      tagline: "Shared platform for Radar products",
      description:
        "YAKALA brings multiple Radar products together under one corporate umbrella for different business workflows.",
    },
    nav: {
      products: "Products",
      solutions: "Solutions",
      about: "About",
      contact: "Contact",
      demo: "Request Demo",
      languageLabel: "Language",
      turkish: "TR",
      english: "EN",
    },
    common: {
      viewProducts: "View products",
      requestDemo: "Request a demo",
      contactSales: "Contact the team",
      navigation: "Navigation",
      learnMore: "Learn more",
      explorePlatform: "Explore platform",
      exploreOtherProducts: "Explore other Radar products",
      backToHome: "Back to home",
      notFoundTitle: "Page not found",
      notFoundDescription:
        "The page you requested may have moved, been removed, or never existed.",
      statusLabel: "Status",
      status: {
        live: "Live",
        beta: "Beta",
        comingSoon: "Coming soon",
      },
      intent: {
        demo: "Demo request",
        beta_interest: "Beta interest",
        early_access: "Early access",
        general_contact: "General contact",
      },
    },
    home: {
      hero: {
        eyebrow: "YAKALA.IO",
        title: "A corporate monitoring platform built to carry multiple Radar products.",
        description:
          "YAKALA offers a growing ecosystem of products for tenders, grants, competition, markets, and sector signals. Under one parent brand, specialized Radar products serve distinct team needs.",
        primaryCta: "Request a demo",
        secondaryCta: "See the product ecosystem",
      },
      platformOverview: {
        eyebrow: "Platform Model",
        title: "Not a single product, but a growing product house.",
        description:
          "The site architecture is designed to present not only today's Radar products, but also future additions within the same scalable system.",
        points: [
          "Modular product family under one main brand",
          "Specialized Radar solutions for B2B teams",
          "A system that scales without redesign when new products are added",
        ],
      },
      products: {
        eyebrow: "Radar Products",
        title: "The product family is managed from one center.",
        description:
          "All Radar products are generated from a shared data structure so the homepage, product index, and product pages stay ready for growth.",
        ecosystemTitle: "The YAKALA ecosystem extends beyond featured products.",
        ecosystemDescription:
          "Live products, beta-stage products, and upcoming launches are visible together so the platform reads as a growing product house.",
        statusSummary: {
          live: "Live products",
          beta: "Beta products",
          comingSoon: "Upcoming products",
        },
      },
      solutions: {
        eyebrow: "Solution Areas",
        title: "YAKALA is positioned around business needs, not only product names.",
        description:
          "Products are framed not just by title, but by the business problems they solve.",
        items: [
          {
            title: "Opportunity monitoring",
            description: "Surface tenders, grants, and emerging market signals earlier.",
          },
          {
            title: "Market and competitor intelligence",
            description: "Track important shifts across a changing competitive landscape.",
          },
          {
            title: "Vertical specialization",
            description: "Use focused Radar products built for specific sectors and workflows.",
          },
        ],
      },
      trust: {
        eyebrow: "Why YAKALA",
        title: "A restrained but credible B2B product language.",
        stats: [
          { value: "8", label: "Current Radar products" },
          { value: "3", label: "Product status levels" },
          { value: "1", label: "Unified umbrella brand" },
        ],
      },
      cta: {
        title: "Review the YAKALA product family in the context of your own workflow.",
        description:
          "Speak with the team to evaluate live products, beta products, and upcoming Radar launches together.",
        primaryCta: "Request demo",
        secondaryCta: "Contact us",
      },
    },
    productsPage: {
      eyebrow: "All Products",
      title: "The YAKALA Radar product family",
      description:
        "Each Radar product focuses on a distinct monitoring need, while all of them live within one shared corporate system.",
    },
    productPage: {
      featuresTitle: "Key features",
      audienceTitle: "Built for",
      relatedTitle: "Other Radar products",
      statusMessages: {
        live: {
          title: "This product is ready for active evaluation",
          description:
            "This Radar product is live. You can review its scope and schedule a demo flow for your team.",
          primaryCta: "Schedule demo",
        },
        beta: {
          title: "This product is currently in beta",
          description:
            "This Radar product is in beta. Speak with the team to evaluate fit and register beta interest for early access.",
          primaryCta: "Register beta interest",
        },
        comingSoon: {
          title: "This product is in pre-launch teaser mode",
          description:
            "This Radar product is not live yet. Leave an early-access request to stay aligned with launch timing.",
          primaryCta: "Request early access",
        },
      },
    },
    solutionsPage: {
      eyebrow: "Solutions",
      title: "A map of business problems that extends beyond product names",
      description:
        "YAKALA addresses opportunity capture, market monitoring, and vertical intelligence through a shared product-family model.",
      items: [
        {
          title: "Corporate opportunity tracking",
          description: "Manage tenders, grants, and new business opportunities within one monitoring discipline.",
        },
        {
          title: "Continuous signal collection",
          description: "Turn scattered sources into streams your team can actually follow.",
        },
        {
          title: "Sector and vertical monitoring",
          description: "Use specialized Radar products for deeper visibility in specific domains.",
        },
      ],
    },
    aboutPage: {
      eyebrow: "About",
      title: "YAKALA is designed as a growing product umbrella.",
      description:
        "The brand system is built as a product house rather than a one-off campaign site. Each new Radar product can live inside the same design system and content model.",
      pillars: [
        {
          title: "Modularity",
          description: "New products can be added without breaking the existing system.",
        },
        {
          title: "Corporate restraint",
          description: "The visual language is designed to build trust rather than chase attention.",
        },
        {
          title: "Operational clarity",
          description: "The marketing layer explains product value in practical business terms.",
        },
      ],
    },
    contactPage: {
      eyebrow: "Contact",
      title: "Speak directly with the team",
      description:
        "Reach out to discuss the platform, the product family, or the right Radar fit for your business need.",
      cards: [
        {
          title: "General inquiries",
          description: "For questions about the brand and the wider product family.",
        },
        {
          title: "Demo conversations",
          description: "To evaluate how products fit your workflows and teams.",
        },
      ],
    },
    demoPage: {
      eyebrow: "Request Demo",
      title: "Let’s review the right Radar products for your use case",
      description:
        "Until a full form integration is added, this page acts as a clean call-to-action. It can later connect to a form or CRM workflow without structural changes.",
      bullets: [
        "Review the scope of live products",
        "Request early access for beta products",
        "Discuss roadmap fit for upcoming products",
      ],
      intentLabel: "Request type",
      intents: {
        demo: {
          title: "Demo request",
          description: "You are ready to schedule a demo conversation for live products.",
        },
        beta_interest: {
          title: "Beta interest",
          description:
            "You want early access and feedback participation for products currently in beta.",
        },
        early_access: {
          title: "Early access request",
          description: "You want to be contacted ahead of launch for upcoming products.",
        },
        general_contact: {
          title: "General contact",
          description:
            "You are requesting a broader conversation about the platform or product family.",
        },
      },
    },
    legalPage: {
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms of Use",
      description:
        "This page acts as a placeholder until legal copy is available and can be replaced cleanly later.",
    },
    comingSoonPage: {
      status: "System Preparing // V3.0",
      logo: "YAKALA",
      slogan: "Radar applications that grow your business",
      placeholder: "Leave your email address...",
      button: "Notify Me",
      success: "Registration received. Thank you!",
      version: "V3.0 Intelligence Platform",
    },
    footer: {
      description:
        "YAKALA presents multiple Radar products under one corporate platform umbrella.",
      legal: "Legal",
      rights: "All rights reserved.",
    },
  },
};

export function getMessages(locale: Locale) {
  return messages[locale];
}
