import type { Locale } from "@/types/i18n";

type LocalizedHomeContent = {
  shell: {
    platform: string;
    ecosystem: string;
    solutions: string;
    institution: string;
    contact: string;
    requestAccess: string;
    logout: string;
    footerCompany: string;
    footerDescription: string;
    locations: string[];
  };
  hero: {
    status: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    panelEyebrow: string;
    panelStats: {
      label: string;
      value: string;
    }[];
  };
  manifesto: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    layerTitle: string;
    layerDescription: string;
    deployTitle: string;
    deployDescription: string;
  };
  ecosystem: {
    kicker: string;
    title: string;
    viewAll: string;
    summary: {
      total: string;
      live: string;
      beta: string;
      comingSoon: string;
    };
  };
  solutions: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    items: {
      title: string;
      description: string;
    }[];
    dashboardLabel: string;
    dashboardValue: string;
    dashboardDelta: string;
  };
  cta: {
    kicker: string;
    title: string;
    description: string;
    primaryCta: string;
    institutionalMarks: string[];
  };
};

export const homepageContent: Record<Locale, LocalizedHomeContent> = {
  tr: {
    shell: {
      platform: "Platform",
      ecosystem: "Radarlar",
      solutions: "Cozumler",
      institution: "Kurumsal",
      contact: "Iletisim",
      requestAccess: "Erisim Talep Et",
      logout: "Cikis Yap",
      footerCompany: "Sirket",
      footerDescription:
        "Kapsamli veri izleme standardi. Birden fazla Radar urunuyle degisen pazar dinamiklerini tek merkezden takip edin.",
      locations: ["Istanbul", "Ankara", "London"],
    },
    hero: {
      status: "Sistem aktif // Tum Radarlar devrede",
      titleLine1: "Gelismis izleme",
      titleLine2: "ekosistemi.",
      description:
        "YAKALA tek bir arac degil, kurumlar icin tasarlanmis kapsamli bir urun ailesidir. Ihale, hibe, rakip ve pazar hareketlerini tek merkezden izleyerek firsatlari zamaninda yakalayin.",
      primaryCta: "Platformu kesfedin",
      secondaryCta: "Sistem mimarisi",
      panelEyebrow: "Canli telemetri",
      panelStats: [
        {
          label: "Radar modulu",
          value: "8",
        },
        {
          label: "Aktif izleme sinifi",
          value: "24",
        },
      ],
    },
    manifesto: {
      kicker: "Merkezi Mimari",
      titleLine1: "Karmasik verileri",
      titleLine2: "anlamli bilgilere donusturun.",
      description:
        "YAKALA, daginik pazar ve operasyon verilerini tek bir gorunumde birlestirerek kurumsal ekiplerin karar alma netligini artirir. Farkli ihtiyaclar icin uzmanlasmis Radar modulleri ayni cati altinda calisir.",
      layerTitle: "Birlesik Veri Katmani",
      layerDescription:
        "Tum Radar modullerindeki veri akislarini ve duzenleme mantigini tek bir guvenli altyapi uzerinden yonetir.",
      deployTitle: "Moduler Dagitim",
      deployDescription:
        "Yalnizca kurumunuzun ihtiyac duydugu takip modullerini etkinlestirerek kendi izleme ekosisteminizi kurun.",
    },
    ecosystem: {
      kicker: "Radar Ekosistemi",
      title: "8 ozellestirilmis takip modulu",
      viewAll: "Tum yetenekleri gor",
      summary: {
        total: "Toplam Radar modulu",
        live: "Canli urun",
        beta: "Beta urun",
        comingSoon: "Yaklasan urun",
      },
    },
    solutions: {
      kicker: "Platform Avantaji",
      titleLine1: "Modern ekipler icin",
      titleLine2: "guvenilir altyapi.",
      items: [
        {
          title: "Gelismis guvenlik",
          description:
            "Rol bazli yetkilendirme, erisim katmanlari ve izlenebilir veri akisiyla kurum ici kullanim daha kontrollu hale gelir.",
        },
        {
          title: "Genis gorunurluk",
          description:
            "Makro seviyede pazar sinyallerini gorun ya da belirli veri katmanlarina inerek operasyonel detaylara odaklanin.",
        },
        {
          title: "Sorunsuz entegrasyon",
          description:
            "YAKALA, mevcut kurumsal ekranlariniz ve operasyon akislarinizla uyumlu calisabilecek sekilde kurgulanir.",
        },
      ],
      dashboardLabel: "Izleme durumu",
      dashboardValue: "Aktif",
      dashboardDelta: "+14.2%",
    },
    cta: {
      kicker: "Kurumsal ekipler icin tasarlandi",
      title: "Izleme altyapinizi kurun.",
      description:
        "YAKALA mimarisinin kurumunuza ozel veri ihtiyaclari icin nasil devreye alinabilecegini birlikte degerlendirelim.",
      primaryCta: "Danismanlik planla",
      institutionalMarks: ["Kamu", "Finans", "Enerji", "Gayrimenkul"],
    },
  },
  en: {
    shell: {
      platform: "Platform",
      ecosystem: "Radars",
      solutions: "Solutions",
      institution: "Institution",
      contact: "Contact",
      requestAccess: "Request Access",
      logout: "Sign Out",
      footerCompany: "Company",
      footerDescription:
        "A comprehensive monitoring standard. Track changing market dynamics from one center across multiple Radar products.",
      locations: ["Istanbul", "Ankara", "London"],
    },
    hero: {
      status: "System online // All radars active",
      titleLine1: "Advanced monitoring",
      titleLine2: "ecosystem.",
      description:
        "YAKALA is not a single tool, but a comprehensive product family built for institutions. Track tenders, grants, competitors, and market movement from one center to act on opportunities at the right time.",
      primaryCta: "Explore platform",
      secondaryCta: "System architecture",
      panelEyebrow: "Live telemetry",
      panelStats: [
        {
          label: "Radar modules",
          value: "8",
        },
        {
          label: "Active monitoring classes",
          value: "24",
        },
      ],
    },
    manifesto: {
      kicker: "Centralized Architecture",
      titleLine1: "Transform complex data",
      titleLine2: "into meaningful insight.",
      description:
        "YAKALA combines fragmented market and operational data into one unified view so institutional teams can move with clearer visibility. Specialized Radar modules work together under the same umbrella.",
      layerTitle: "Unified Data Layer",
      layerDescription:
        "Manages data flow and orchestration across all Radar modules through one secure infrastructure layer.",
      deployTitle: "Modular Deployment",
      deployDescription:
        "Activate only the monitoring modules your institution needs and shape your own operating ecosystem.",
    },
    ecosystem: {
      kicker: "Radar Ecosystem",
      title: "8 specialized tracking modules",
      viewAll: "View full capabilities",
      summary: {
        total: "Total Radar modules",
        live: "Live products",
        beta: "Beta products",
        comingSoon: "Upcoming products",
      },
    },
    solutions: {
      kicker: "Platform Advantage",
      titleLine1: "Reliable infrastructure",
      titleLine2: "for modern teams.",
      items: [
        {
          title: "Advanced security",
          description:
            "Role-based access, controlled visibility layers, and traceable data flows create a stronger institutional operating model.",
        },
        {
          title: "Broad visibility",
          description:
            "See market signals at macro level or drill into specific operational layers when deeper detail is needed.",
        },
        {
          title: "Seamless integration",
          description:
            "YAKALA is structured to sit cleanly alongside existing enterprise workflows and decision environments.",
        },
      ],
      dashboardLabel: "Monitoring status",
      dashboardValue: "Active",
      dashboardDelta: "+14.2%",
    },
    cta: {
      kicker: "Built for institutional teams",
      title: "Set up your monitoring infrastructure.",
      description:
        "Schedule a conversation to evaluate how the YAKALA architecture can be deployed for your institution's specific data needs.",
      primaryCta: "Schedule consultation",
      institutionalMarks: ["Public", "Finance", "Energy", "Real Estate"],
    },
  },
};

export function getHomepageContent(locale: Locale) {
  return homepageContent[locale];
}
