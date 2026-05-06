/**
 * Social page “Moments” grid — photos + captions; cards link to Facebook or TikTok embeds.
 * Airport carousel: `public/images/social/moments-airport-*.png`.
 */
export type SocialFeedVariant = 'wide' | 'tall' | 'reg';

/** Slide for airport or in-feed carousels */
export type AirportMomentSlide = {
  img: string;
  alt?: string;
  /** Short line under the section title (e.g. city / terminal). */
  caption?: string;
};

export type SocialFeedPost = {
  img: string;
  alt?: string;
  postUrl: string;
  caption: string;
  dateLabel?: string;
  variant: SocialFeedVariant;
  /** When set, the card shows TikTok’s embed player; `img` is unused. */
  tiktokVideoId?: string;
  /** Optional photo carousel (e.g. Gathering); `img` is fallback only. */
  carouselSlides?: AirportMomentSlide[];
  /** Carousel chrome when `carouselSlides` is set. Default `gathering`. */
  carouselTheme?: 'gathering' | 'proud';
};

export const AIRPORT_MOMENTS_SLIDES: AirportMomentSlide[] = [
  {
    img: '/images/social/moments-airport-01.png',
    alt: 'Student with a full luggage cart at Vancouver International Airport (YVR) at night',
    caption: 'YVR — curbside',
  },
  {
    img: '/images/social/moments-airport-02.png',
    alt: 'Two students in a bright airport lounge with flight information screens',
    caption: 'Lounge — before the flight',
  },
  {
    img: '/images/social/moments-airport-03.png',
    alt: 'Three students posing in a large airport terminal with luggage carts',
    caption: 'Terminal — together',
  },
  {
    img: '/images/social/moments-airport-04.png',
    alt: 'Two students with a luggage cart in front of a terminal mural',
    caption: 'Departure floor',
  },
  {
    img: '/images/social/moments-airport-05.png',
    alt: 'Group of five students in an airport lounge with a Bon Voyage sign in the background',
    caption: 'Bon Voyage',
  },
  {
    img: '/images/social/moments-airport-06.png',
    alt: 'Group of seven students with YVR luggage carts and Northwest Coast carvings',
    caption: 'YVR — international',
  },
  {
    img: '/images/social/moments-airport-07.png',
    alt: 'Two students with phones and luggage at YVR near information and currency exchange',
    caption: 'YVR — concourse',
  },
  {
    img: '/images/social/moments-airport-08.png',
    alt: 'Student with matching grey suitcases outside airport glass doors at night',
    caption: 'Curb & doors',
  },
  {
    img: '/images/social/moments-airport-09.png',
    alt: 'Student with a luggage cart and blue suitcases in a busy airport',
    caption: 'In transit',
  },
  {
    img: '/images/social/moments-airport-10.png',
    alt: 'Five students standing together in a modern airport terminal',
    caption: 'Send-off',
  },
  {
    img: '/images/social/moments-airport-11.png',
    alt: 'Student pushing a luggage cart past terminal advertising in the arrivals area',
    caption: 'Arrivals',
  },
  {
    img: '/images/social/moments-airport-12.png',
    alt: 'Three students behind a cart stacked with pink and purple suitcases under a flight board',
    caption: 'Stacked & ready',
  },
  {
    img: '/images/social/moments-airport-13.png',
    alt: 'Two students with a Narita Airport bag by a luggage cart in an international terminal',
    caption: 'Narita — onward',
  },
];

export const SOCIAL_FEED_POSTS: SocialFeedPost[] = [
  {
    img: '/images/social/post-02.png',
    postUrl: 'https://www.tiktok.com/@winyangon3/video/7559350572768398610',
    tiktokVideoId: '7559350572768398610',
    caption:
      'ကနေ့ဒါ visa မလျှောက်ခင် ဒါကို အဆုံးထိကြည့်စေချင်ပါတယ်။',
    variant: 'reg',
  },
  {
    img: '/images/social/gathering/gathering-huddle-sky.png',
    postUrl:
      'https://www.facebook.com/permalink.php?story_fbid=pfbid0L6bubbosUYB4Wms89XJnGdAHLvzTCJ2756SSpxnC9ckHCs2YWVWR4jqXuVCPSS2yl&id=100067407050438',
    caption: 'Making Memories — Sky-high huddle · Friends all around',
    variant: 'reg',
    carouselSlides: [
      {
        img: '/images/social/gathering/gathering-huddle-sky.png',
        alt: 'A group of young adults in a huddle, smiling and making peace signs against a clear blue sky.',
        caption: 'Sky-high huddle — friends all around',
      },
      {
        img: '/images/social/gathering/gathering-tulip-selfie-seven.png',
        alt: 'A group of seven friends smiling and posing for a selfie in a large field of yellow, pink, and purple tulips.',
        caption: 'Tulip fields — group selfie',
      },
      {
        img: '/images/social/gathering/gathering-tulip-couple-mountain.png',
        alt: 'A young man and woman posing in a field of yellow and pink tulips with a large green mountain in the background.',
        caption: 'Tulip fields — together by the mountain',
      },
      {
        img: '/images/social/gathering/gathering-tulip-pink-mountain.png',
        alt: 'Two people standing in a vast field of pink tulips, looking toward a large forested mountain.',
        caption: 'Tulip fields — pink blooms and peaks',
      },
      {
        img: '/images/social/gathering/gathering-tulip-five-friends.png',
        alt: 'A group of five friends posing together in a colorful tulip field with a large mountain in the background.',
        caption: 'Tulip outing — five friends',
      },
      {
        img: '/images/social/gathering/gathering-dim-sum-meal.png',
        alt: 'A group sharing dim sum around a large round table with steamer baskets in a bright, modern dining room.',
        caption: 'Dim sum — one table, many stories',
      },
      {
        img: '/images/social/gathering/gathering-pool-table-party.png',
        alt: 'A large group of smiling young adults posing together around a pool table at a social gathering.',
        caption: 'Lounge night — pool table and celebration',
      },
    ],
  },
  {
    img: '/images/social/proud-moments/01.png',
    postUrl:
      'https://www.facebook.com/permalink.php?story_fbid=pfbid02bxoj5HwpKr67H6j8KMvmRGxbByeNpgw6Rp6zzz7eefBBxF4M7xMeTuAASMS6Q4Jul&id=100067407050438',
    caption: 'Proud Moments',
    variant: 'reg',
    carouselTheme: 'proud',
    carouselSlides: [
      {
        img: '/images/social/proud-moments/01.png',
        alt: 'Four students holding Second Place certificates at Alexander Hackathon in front of a whiteboard',
        caption: 'Alexander Hackathon — second place',
      },
      {
        img: '/images/social/proud-moments/02.png',
        alt: 'Graduate in cap and gown holding University of Ottawa diploma beside a smiling family member',
        caption: 'University of Ottawa — honours B. Comm',
      },
      {
        img: '/images/social/proud-moments/03.png',
        alt: 'Student with Douglas College Global Citizenship Dean’s Award plaque and a white rose',
        caption: 'Douglas College — leadership award',
      },
      {
        img: '/images/social/proud-moments/04.png',
        alt: 'Graduate in cap and gown with Alexander Academy diploma cover, flanked by two officials',
        caption: 'Alexander Academy — graduation',
      },
      {
        img: '/images/social/proud-moments/05.png',
        alt: 'Six BCIT graduates in caps and gowns with diplomas, Graphic Communications 2021',
        caption: 'BCIT - graduation',
      },
      {
        img: '/images/social/proud-moments/06.png',
        alt: 'Large group of students and graduates posing together in formal attire on a red carpet',
        caption: 'Together — celebration night',
      },
      {
        img: '/images/social/proud-moments/07.png',
        alt: 'Formal group photo of students in evening wear in a hotel lobby',
        caption: 'Formal night — community',
      },
    ],
  },
];
