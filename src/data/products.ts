import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    slug: "ihale-radar",
    status: "live",
    featured: true,
    sortOrder: 1,
    category: {
      tr: "Kamu Ihale Takibi",
      en: "Public Procurement",
    },
    name: {
      tr: "Ihale Radar",
      en: "Tender Radar",
    },
    shortDescription: {
      tr: "Kamu ve ozel sektor ihale akislarini takip eden radar urunu.",
      en: "Radar product for tracking public and private tender flows.",
    },
    longDescription: {
      tr: "Ihale Radar, ekiplerin dogru ihale firsatlarini erken tespit etmesine, siniflandirmasina ve operasyonel takibe donusturmesine yardimci olur. Tek bir akis icinde sinyal toplama, filtreleme ve aksiyon alma surecini sadeleştirir.",
      en: "Tender Radar helps teams detect the right tender opportunities early, classify them, and turn monitoring into operational follow-through. It streamlines signal collection, filtering, and action in one flow.",
    },
    ctaLabel: {
      tr: "Ihale Radar'i inceleyin",
      en: "Explore Tender Radar",
    },
    featureBullets: {
      tr: [
        "Ihale akislarini tek merkezde izleme",
        "Takim bazli filtreleme ve onceliklendirme",
        "Firsatlari operasyonel takibe donusturen net akis",
      ],
      en: [
        "Monitor tender streams in one place",
        "Team-based filtering and prioritization",
        "Clear workflow from opportunity to follow-up",
      ],
    },
    targetAudience: {
      tr: ["Satis ekipleri", "Teklif ekipleri", "Is gelistirme ekipleri"],
      en: ["Sales teams", "Bid teams", "Business development teams"],
    },
  },
  {
    slug: "hibe-radar",
    status: "live",
    featured: true,
    sortOrder: 2,
    category: {
      tr: "Hibe ve Tesvik Takibi",
      en: "Funding Intelligence",
    },
    name: {
      tr: "Hibe Radar",
      en: "Grant Radar",
    },
    shortDescription: {
      tr: "Hibe ve tesvik duyurularini duzenli izleyen izleme urunu.",
      en: "Monitoring product for grants and incentive announcements.",
    },
    longDescription: {
      tr: "Hibe Radar, kurumlarin hibe, tesvik ve destek programlarini daha erken gormesine yardimci olur. Daginik duyurulari anlamli sinyallere donusturerek uygun firsatlari kacirma riskini azaltir.",
      en: "Grant Radar helps organizations discover grants, incentives, and support programs earlier. It converts fragmented announcements into usable signals and reduces the risk of missing relevant opportunities.",
    },
    ctaLabel: {
      tr: "Hibe Radar'i inceleyin",
      en: "Explore Grant Radar",
    },
    featureBullets: {
      tr: [
        "Hibe ve tesvik duyurularini takip etme",
        "Kurum icin uygun programlari ayiklama",
        "Firsatlari erken aksiyona donusturme",
      ],
      en: [
        "Track grant and incentive announcements",
        "Surface programs relevant to your organization",
        "Turn funding signals into early action",
      ],
    },
    targetAudience: {
      tr: ["Strateji ekipleri", "Proje ekipleri", "Yonetim kadrolari"],
      en: ["Strategy teams", "Project teams", "Leadership teams"],
    },
  },
  {
    slug: "rakip-radar",
    status: "beta",
    featured: true,
    sortOrder: 3,
    category: {
      tr: "Rekabet Istihbarati",
      en: "Competitive Intelligence",
    },
    name: {
      tr: "Rakip Radar",
      en: "Competitor Radar",
    },
    shortDescription: {
      tr: "Rakip hareketlerini ve pazar sinyallerini izleyen rekabet istihbarati urunu.",
      en: "Competitive intelligence product for monitoring competitor moves and market signals.",
    },
    longDescription: {
      tr: "Rakip Radar, pazardaki oyuncularin duyurularini, degisimlerini ve hareketlerini daha sistematik gormeyi saglar. Ekiplerin sezgisel takip yerine surekli ve olculebilir rekabet takibi yapmasini destekler.",
      en: "Competitor Radar gives teams a more systematic view of competitor announcements, changes, and market moves. It replaces ad hoc tracking with continuous and measurable competitive monitoring.",
    },
    ctaLabel: {
      tr: "Beta detaylarini gorun",
      en: "View beta details",
    },
    featureBullets: {
      tr: [
        "Rakip aktivitelerini duzenli izleme",
        "Pazar degisimlerini erken fark etme",
        "Rekabet takibini ekip ici paylasilabilir hale getirme",
      ],
      en: [
        "Track competitor activity continuously",
        "Spot market shifts earlier",
        "Make competitive monitoring shareable across teams",
      ],
    },
    targetAudience: {
      tr: ["Pazarlama ekipleri", "Strateji ekipleri", "Yonetim ekipleri"],
      en: ["Marketing teams", "Strategy teams", "Leadership teams"],
    },
  },
  {
    slug: "mapeg-radar",
    status: "comingSoon",
    featured: false,
    sortOrder: 4,
    category: {
      tr: "Sektorel Izleme",
      en: "Sector Monitoring",
    },
    name: {
      tr: "Mapeg Radar",
      en: "Mapeg Radar",
    },
    shortDescription: {
      tr: "MAPEG odakli sektor sinyallerini izlemek icin gelistirilen urun.",
      en: "Product designed to monitor MAPEG-focused sector signals.",
    },
    longDescription: {
      tr: "Mapeg Radar, enerji ve maden odakli ekiplerin ilgili duzenleyici ve sektorel akislari daha kolay takip etmesi icin tasarlanmistir. Uzmanlasmis bir radar olarak belirli bir sektorun karmasik veri akislarini sadeleştirir.",
      en: "Mapeg Radar is designed for teams that need to track regulatory and sector flows related to energy and mining. As a specialized radar, it simplifies complex domain-specific streams.",
    },
    ctaLabel: {
      tr: "Erken erisim isteyin",
      en: "Request early access",
    },
    featureBullets: {
      tr: [
        "Sektor odakli sinyal toplama",
        "Uzman ekipler icin daha net akis",
        "Yaklasan urun lansmani icin erken ilgi toplama",
      ],
      en: [
        "Sector-specific signal collection",
        "Clearer workflows for specialist teams",
        "Early-access path ahead of launch",
      ],
    },
    targetAudience: {
      tr: ["Enerji ekipleri", "Maden ekipleri", "Regulasyon takip ekipleri"],
      en: ["Energy teams", "Mining teams", "Regulatory monitoring teams"],
    },
  },
  {
    slug: "muhasebe-radar",
    status: "comingSoon",
    featured: false,
    sortOrder: 5,
    category: {
      tr: "Finansal Operasyonlar",
      en: "Financial Operations",
    },
    name: {
      tr: "Muhasebe Radar",
      en: "Accounting Radar",
    },
    shortDescription: {
      tr: "Muhasebe ve finans akislarina yonelik izleme urunu.",
      en: "Monitoring product for accounting and finance workflows.",
    },
    longDescription: {
      tr: "Muhasebe Radar, finans ve operasyon ekiplerinin takip etmesi gereken kritik degisimleri daha derli toplu gormesini hedefler. Farkli kaynaklardan gelen sinyalleri tek bir izleme mantigi altinda birlestirir.",
      en: "Accounting Radar helps finance and operations teams track important changes in a more structured way. It brings fragmented signals together under one monitoring model.",
    },
    ctaLabel: {
      tr: "Haberdar olun",
      en: "Stay informed",
    },
    featureBullets: {
      tr: [
        "Finans odakli sinyal izleme",
        "Operasyon ekipleri icin duzenli takip",
        "Lansman oncesi ilgi toplama",
      ],
      en: [
        "Finance-focused signal monitoring",
        "Structured follow-up for operations teams",
        "Interest capture ahead of launch",
      ],
    },
    targetAudience: {
      tr: ["Finans ekipleri", "Muhasebe ekipleri", "Operasyon ekipleri"],
      en: ["Finance teams", "Accounting teams", "Operations teams"],
    },
  },
  {
    slug: "sahibinden-radar",
    status: "live",
    featured: false,
    sortOrder: 6,
    category: {
      tr: "Pazar Kesfi",
      en: "Market Discovery",
    },
    name: {
      tr: "Sahibinden Radar",
      en: "Marketplace Radar",
    },
    shortDescription: {
      tr: "Pazar ve ilan sinyallerini izlemeye yonelik radar urunu.",
      en: "Radar product for monitoring listing and marketplace signals.",
    },
    longDescription: {
      tr: "Sahibinden Radar, ilan bazli pazarlari daha yakindan takip etmek isteyen ekipler icin tasarlanmistir. Hareketli ilan ekosistemini daha yapisal ve karar destekleyici hale getirir.",
      en: "Marketplace Radar is designed for teams that need a closer view of listing-based markets. It turns a fast-moving listing ecosystem into a more structured decision-support layer.",
    },
    ctaLabel: {
      tr: "Urunu kesfedin",
      en: "Explore product",
    },
    featureBullets: {
      tr: [
        "Ilan akislarini izleme",
        "Pazar hareketlerini anlamlandirma",
        "Takip surecini ekipler icin sadeleştirme",
      ],
      en: [
        "Monitor listing streams",
        "Interpret market movement faster",
        "Simplify market tracking for teams",
      ],
    },
    targetAudience: {
      tr: ["Pazar analizi ekipleri", "Is gelistirme ekipleri", "Operasyon ekipleri"],
      en: ["Market analysis teams", "Business development teams", "Operations teams"],
    },
  },
  {
    slug: "ajans-radar",
    status: "beta",
    featured: false,
    sortOrder: 7,
    category: {
      tr: "Ajans Takibi",
      en: "Agency Monitoring",
    },
    name: {
      tr: "Ajans Radar",
      en: "Agency Radar",
    },
    shortDescription: {
      tr: "Ajans ve ilan akislari icin uzmanlasan radar urunu.",
      en: "Specialized radar product for agency and announcement flows.",
    },
    longDescription: {
      tr: "Ajans Radar, ajans bazli bilgi akislarini duzenli olarak izlemek isteyen ekipler icin gelistirilmiştir. Daginik bilgi kaynaklarini karar verilebilir bir akis haline getirir.",
      en: "Agency Radar is built for teams that need to monitor agency-led information flows continuously. It turns scattered information sources into a decision-ready stream.",
    },
    ctaLabel: {
      tr: "Beta urunu gorun",
      en: "See the beta product",
    },
    featureBullets: {
      tr: [
        "Ajans kaynakli akislarin takibi",
        "Duzensiz bilgi kaynaklarini duzenleme",
        "Erken urun geri bildirimi icin uygun akis",
      ],
      en: [
        "Track agency-originated flows",
        "Structure fragmented information sources",
        "Designed for early product feedback cycles",
      ],
    },
    targetAudience: {
      tr: ["Ajans ekipleri", "Yonetim ekipleri", "Operasyon ekipleri"],
      en: ["Agency teams", "Leadership teams", "Operations teams"],
    },
  },
  {
    slug: "emlak-radar",
    status: "comingSoon",
    featured: false,
    sortOrder: 8,
    category: {
      tr: "Gayrimenkul Istihbarati",
      en: "Real Estate Intelligence",
    },
    name: {
      tr: "Emlak Radar",
      en: "Real Estate Radar",
    },
    shortDescription: {
      tr: "Gayrimenkul tarafinda sinyal takibi icin hazirlanan radar urunu.",
      en: "Radar product prepared for signal monitoring in real estate workflows.",
    },
    longDescription: {
      tr: "Emlak Radar, gayrimenkul pazarinda firsat, ilan ve hareket sinyallerini daha derli toplu takip etmek isteyen ekipleri hedefler. Dikey odakli bir radar olarak emlak sureclerine uygun bir izleme katmani sunar.",
      en: "Real Estate Radar is aimed at teams that want a more structured view of property opportunities, listings, and market movement. As a vertical product, it provides a monitoring layer tailored to real estate workflows.",
    },
    ctaLabel: {
      tr: "Erken erisim isteyin",
      en: "Request early access",
    },
    featureBullets: {
      tr: [
        "Gayrimenkul sinyallerini odakli izleme",
        "Dikey urun yapisina uygun akis",
        "Lansman oncesi talep toplama",
      ],
      en: [
        "Focused real estate signal monitoring",
        "Workflow aligned with a vertical product model",
        "Capture demand ahead of launch",
      ],
    },
    targetAudience: {
      tr: ["Gayrimenkul ekipleri", "Yatirim ekipleri", "Saha operasyon ekipleri"],
      en: ["Real estate teams", "Investment teams", "Field operations teams"],
    },
  },
];
