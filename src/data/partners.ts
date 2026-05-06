/** Partner school detail model — only name, meta (country), logo, and slug are required for routing & cards. */

export type PartnerSocials = Partial<{
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  youtube: string;
}>;

export type PartnerAddress = {
  street?: string;
  city?: string;
  region?: string;
  postalCode?: string;
};

export type ProgramCategoryKey = 'pathway' | 'undergraduate' | 'postgraduate';

export type PartnerPrograms = Partial<Record<ProgramCategoryKey, string[]>>;

export type SchoolPartner = {
  slug: string;
  name: string;
  /** Country / region label (cards + header subtitle) */
  meta: string;
  logo: string;
  phone?: string;
  website?: string;
  address?: PartnerAddress;
  tagline?: string;
  /** Long-form summary below the tagline */
  summary?: string;
  socials?: PartnerSocials;
  programs?: PartnerPrograms;
};

export const PROGRAM_TAB_ORDER: ProgramCategoryKey[] = ['pathway', 'undergraduate', 'postgraduate'];

export const PROGRAM_TAB_LABELS: Record<ProgramCategoryKey, string> = {
  pathway: 'Pathway Programs',
  undergraduate: 'Undergraduate Courses',
  postgraduate: 'Postgraduate Courses',
};

const partners: SchoolPartner[] = [
  /* —— Demo: fuller record for layout testing —— */
  {
    slug: 'alexander-academy',
    name: 'Alexander Academy',
    meta: 'Canada',
    logo: '/partners/alexander-academy.png',
    phone: '+1 (604) 555-0100',
    website: 'https://alexanderacademy.ca',
    address: {
      street: '601 West Chestnut Street',
      city: 'Vancouver',
      region: 'BC',
      postalCode: 'V6B 4X4',
    },
    tagline:
      'BC-certified curriculum with personalized support—from first inquiry through to university offers and graduation.',
    summary:
      'Alexander Academy is a private day and boarding high school in downtown Vancouver offering small classes and strong English-language support. Students benefit from clear pathways to BC graduation and North American universities, with personalized guidance for course selection and applications.',
    socials: {
      instagram: 'https://www.instagram.com/alexanderacademybc/',
      youtube: 'https://www.youtube.com/@alexanderacademy2086',
    },
    programs: {
      pathway: [
        'BC Dogwood Diploma stream with ELL scaffolding',
        'University foundation and transfer-readiness advising',
      ],
      undergraduate: [
        'Senior-level Math, Sciences, and Social Studies electives',
        'AP-aligned challenge options (where offered)',
      ],
      postgraduate: [
        'Graduation and beyond: gap-year planning with partner institutions',
      ],
    },
  },
  {
    slug: 'alexander-college',
    name: 'Alexander College',
    meta: 'Canada',
    logo: '/partners/alexander-college.png',
    phone: '+1 604-435-5815',
    website: 'www.alexandercollege.ca',
    address: {
      street: '4805 Kingsway',
      city: 'Burnaby',
      region: 'BC',
      postalCode: 'V5H 4T6',
    },
    tagline: 'Flexible university transfer programs in BC',
    summary:
      'Alexander College provides small class sizes, personalized support, and university transfer pathways to top Canadian institutions.',
    socials: {
      instagram: 'https://www.instagram.com/alexandercollege/',
      youtube: 'https://www.youtube.com/@AlexanderCollegeCanada',
    },
  },
  {
    slug: 'bodwell-high-school',
    name: 'Bodwell High School',
    meta: 'Canada',
    logo: '/partners/bodwell.png',
    phone: '+1 604-998-1000',
    website: 'www.bodwell.edu',
    address: {
      street: '955 Harbourside Dr',
      city: 'North Vancouver',
      region: 'BC',
      postalCode: 'V7P 3S4',
    },
    tagline: 'Private boarding school with strong university pathways',
    summary:
      'Bodwell High School in North Vancouver offers a structured academic environment, English support, and university preparation programs for international students aiming for top universities.',
    socials: {
      instagram: 'https://www.instagram.com/mybodwell/',
      youtube: 'https://www.youtube.com/@BodwellEducation',
    },
  },
  {
    slug: 'douglas-college',
    name: 'Douglas College',
    meta: 'Canada',
    logo: '/partners/douglas.png',
    phone: '+1 604-527-5400',
    website: 'www.douglascollege.ca',
    address: {
      street: '700 Royal Ave',
      city: 'New Westminster',
      region: 'BC',
      postalCode: 'V3M 5Z5',
    },
    tagline: 'Career-focused programs with university transfer options',
    summary:
      'Douglas College offers diplomas, degrees, and transfer programs with practical learning, preparing students for careers or further study at top universities.',
    socials: {
      instagram: 'https://www.instagram.com/douglascollege/',
      youtube: 'https://www.youtube.com/user/DouglasCollegeVideo',
    },
  },
  {
    slug: 'fraser-international-college',
    name: 'Fraser International College',
    meta: 'Canada',
    logo: '/partners/fic.png',
    phone: '+1 778-782-8877',
    website: 'www.fraseric.ca',
    address: {
      street: '515 W Hastings St',
      city: 'Vancouver',
      region: 'BC',
      postalCode: 'V6B 5K3',
    },
    tagline: 'Direct pathway to Simon Fraser University',
    summary:
      'FIC offers foundation and first-year programs that lead directly into Simon Fraser University, with strong academic and student support services.',
    socials: {
      instagram: 'https://www.instagram.com/myfic/',
      youtube: 'https://www.youtube.com/user/FraserIntCollege',
    },
  },
  {
    slug: 'international-college-of-manitoba',
    name: 'International College of Manitoba',
    meta: 'Canada',
    logo: '/partners/manitoba.png',
    phone: '+1 204-474-8479',
    website: 'www.icmanitoba.ca',
    address: {
      street: '181 Freedman Crescent',
      city: 'Winnipeg',
      region: 'MB',
      postalCode: 'R3T 2N2',
    },
    tagline: 'Pathway programs leading to University of Manitoba degrees',
    summary:
      'ICM provides foundation and first-year university transfer programs that prepare international students for direct entry into the University of Manitoba with academic and student support services.',
    socials: {
      instagram: 'https://www.instagram.com/icmanitoba/',
      youtube: 'https://www.youtube.com/@ICManitoba',
    },
  },
  {
    slug: 'kingsway-academy',
    name: 'Kingsway Academy',
    meta: 'Canada',
    logo: '/partners/kingsway.png',
    phone: '+1 604-503-3900',
    website: 'www.kingswayacademy.ca',
    address: {
      street: '6875 King George Blvd',
      city: 'Surrey',
      region: 'BC',
      postalCode: 'V3W 5A1',
    },
    tagline: 'Personalized high school education with university pathways',
    summary:
      'Kingsway Academy offers flexible academic programs, small class sizes, and dedicated support to help international students succeed and transition to Canadian universities.',
    socials: {
      instagram: 'https://www.instagram.com/iceapkingsway/',
    },
  },
  {
    slug: 'langara-college',
    name: 'Langara College',
    meta: 'Canada',
    logo: '/partners/langara.png',
    phone: '+1 604-323-5511',
    website: 'www.langara.ca',
    address: {
      street: '100 W 49th Ave',
      city: 'Vancouver',
      region: 'BC',
      postalCode: 'V5Y 2Z6',
    },
    tagline: 'Leading transfer college in Vancouver',
    summary:
      'Langara College is known for its strong university transfer programs, academic excellence, and diverse student community in the heart of Vancouver.',
    socials: {
      instagram: 'https://www.instagram.com/langaracollege/',
      youtube: 'https://www.youtube.com/langaracollege',
    },
  },
  {
    slug: 'siam-global-academy',
    name: 'Siam Global Academy',
    meta: 'Thailand',
    logo: '/partners/siam-global.png',
    phone: '+66 2-171-0888',
    website: 'www.sga.ac.th',
    address: {
      street: '39/9 Moo 7, Bangna-Trad Rd, Bang Bo',
      city: 'Samut Prakan',
      region: '',
      postalCode: '10560',
    },
    tagline: 'International American curriculum in a global environment',
    summary:
      'Siam Global Academy provides an American-style education with a focus on academic excellence, English proficiency, and preparation for universities worldwide.',
    socials: {
      instagram: 'https://www.instagram.com/globalacademy.siam/',
      youtube: 'https://www.youtube.com/@GlobalAcademySiam',
    },
  },
  {
    slug: 'sunway-university',
    name: 'Sunway University',
    meta: 'Malaysia',
    logo: '/partners/sunway.png',
    phone: '+60 3-7491 8622',
    website: 'www.sunwayuniversity.edu.my',
    address: {
      street: 'No. 5, Jalan Universiti, Bandar Sunway',
      city: 'Bandar Sunway',
      region: 'Selangor',
      postalCode: '47500',
    },
    tagline: 'Top-ranked private university with global partnerships',
    summary:
      'Sunway University offers internationally recognized programs in collaboration with universities like Lancaster University, providing strong academic quality, modern facilities, and global career pathways.',
    socials: {
      instagram: 'https://www.instagram.com/sunwayuniversity/',
      youtube: 'https://www.youtube.com/@SunwayUniversityOfficial',
    },
  },
  {
    slug: 'tmu-international-college',
    name: 'Toronto Metropolitan University International College',
    meta: 'Canada',
    logo: '/partners/tmu.png',
    phone: '+1 416-979-5000',
    website: 'www.torontomuic.ca',
    address: {
      street: '240 Jarvis St',
      city: 'Toronto',
      region: 'ON',
      postalCode: 'M5B 2L1',
    },
    tagline: 'Direct pathway to Toronto Metropolitan University',
    summary:
      'TMUIC offers foundation and transfer programs designed to help international students transition smoothly into degree programs at Toronto Metropolitan University in downtown Toronto.',
    socials: {
      instagram: 'https://www.instagram.com/torontomet/',
      youtube: 'https://www.youtube.com/@torontomet',
    },
  },
  {
    slug: 'ulethbridge-international-college',
    name: 'ULethbridge International College',
    meta: 'Calgary, Canada',
    logo: '/partners/ulethbridge.png',
    phone: '+1 403-571-8777',
    website: 'www.ulethbridgeintlcollege.ca',
    address: {
      street: '345 6 Ave SE',
      city: 'Calgary',
      region: 'AB',
      postalCode: 'T2G 4V1',
    },
    tagline: 'Pathway to University of Lethbridge degrees',
    summary:
      'ULICC provides foundation and transfer programs in Calgary, preparing students for direct entry into University of Lethbridge with academic and language support.',
    socials: {
      instagram: 'https://www.instagram.com/ulethbridge/',
      youtube: 'https://www.youtube.com/@ulethbridge',
    },
  },
  {
    slug: 'western-international-college',
    name: 'Western International College',
    meta: 'Canada',
    logo: '/partners/western.png',
    phone: '+1 519-661-2111',
    website: 'https://www.westernic.ca/',
    address: {
      street: '1151 Richmond St',
      city: 'London',
      region: 'ON',
      postalCode: 'N6A 3K7',
    },
    tagline: 'Pathway to Western University',
    summary:
      'WIC provides structured academic programs that help international students transition into Western University, supported by small classes and personalized learning.',
    socials: {
      instagram: 'https://www.instagram.com/westernuniversity/',
      youtube: 'https://www.youtube.com/@WesternUniversity',
    },
  },
  {
    slug: 'wilfrid-laurier-international-college',
    name: 'Wilfrid Laurier International College',
    meta: 'Canada',
    logo: '/partners/wilfrid-laurier.png',
    phone: '+1 519-884-0710',
    website: 'www.wlic.ca',
    address: {
      street: '75 University Ave W',
      city: 'Waterloo',
      region: 'ON',
      postalCode: 'N2L 3C5',
    },
    tagline: 'Direct pathway to Wilfrid Laurier University',
    summary:
      'WLIC offers university transfer programs that lead into Laurier degree programs, with strong academic guidance and student support in a vibrant campus environment.',
    socials: {
      instagram: 'https://www.instagram.com/wlaurieric/',
      youtube: 'https://www.youtube.com/channel/UCYJ7YFIpTk6zYTKXQqoTPfQ',
    },
  },
];

export const PARTNERS_BY_SLUG: ReadonlyMap<string, SchoolPartner> = new Map(
  partners.map((p) => [p.slug, p])
);

export function getPartnerBySlug(slug: string | undefined): SchoolPartner | undefined {
  if (!slug) return undefined;
  return PARTNERS_BY_SLUG.get(slug);
}

/** Ordered list for Services carousel / grids */
export const PARTNERS_LIST: readonly SchoolPartner[] = partners;

export function formatPartnerAddress(addr?: PartnerAddress): string | undefined {
  if (!addr) return undefined;
  const parts = [addr.street, addr.city, addr.region, addr.postalCode].filter(Boolean);
  return parts.length ? parts.join(', ') : undefined;
}

export function normalizeWebsiteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}
