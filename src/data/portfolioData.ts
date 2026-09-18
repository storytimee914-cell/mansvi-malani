import { Project, Achievement, SkillCategory, CreativeItem, WebsiteProject } from '../types';

export const PERSONAL_INFO = {
  name: 'MANSVI MALANI',
  title: 'I BUILD DIGITAL THINGS.',
  subtitle: 'WEB · AI · AUTOMATION · CREATIVE',
  role: 'Web Developer + AI Creator + AI Automation Enthusiast + Digital Creator',
  location: 'Mumbai, India',
  email: 'malanimansvii@gmail.com',
  phone: '+91 9145999309',
  phoneDisplay: '+91 91459 99309',
  whatsappRaw: '9145999309',
  whatsappNumber: '919145999309',
  whatsappUrl: 'https://wa.me/919145999309',
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
    instagram: 'https://instagram.com',
    whatsapp: 'https://wa.me/919145999309'
  },
  bio: 'like turning “what if we built this?” into something you can actually click. I build websites, AI-powered workflows, and digital experiences that don’t just sit there looking pretty — they move, respond, automate, and solve real problems.'
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Modern frontends, reactive state, modular architectures & fluid 3D experiences.',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'REST APIs', 'Vite', 'Three.js/CSS 3D'],
    stampLabel: 'TECH STACK',
    tapeRotation: -3,
    accentColor: '#801620'
  },
  {
    id: 'ai-creator',
    title: 'AI & Machine Intelligence',
    description: 'Prompt engineering, agentic systems, multimodal pipelines & generative design.',
    skills: ['LLM Orchestration', 'LangChain', 'OpenAI/Gemini APIs', 'Autonomous Agents', 'Vector Embeddings', 'RAG Workflows'],
    stampLabel: 'AI POWERED',
    tapeRotation: 2,
    accentColor: '#1d2a44'
  },
  {
    id: 'automation',
    title: 'Automation & Workflows',
    description: 'Connecting APIs, scheduled pipelines, webhook triggers & zero-touch automations.',
    skills: ['n8n', 'Make.com', 'Zapier', 'Webhooks', 'Python Scripting', 'Cron Pipelines', 'Cloud Run'],
    stampLabel: 'AUTO-PILOT',
    tapeRotation: -1.5,
    accentColor: '#364935'
  },
  {
    id: 'video-editing',
    title: 'Video Editing & Motion',
    description: 'Pacing, color grading, kinetic typography, dynamic cuts & sound design.',
    skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut Pro', 'Motion Design', 'Audio Sync'],
    stampLabel: 'TIMELINE',
    tapeRotation: 3.5,
    accentColor: '#5c2c4d'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Google certified growth campaigns, SEO, audience positioning & content strategy.',
    skills: ['Google Analytics 4', 'Search Ads', 'Performance Max', 'SEO Optimization', 'Meta Ads', 'Conversion Funnels'],
    stampLabel: 'VERIFIED',
    tapeRotation: -2,
    accentColor: '#804e12'
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Transforming raw telemetry into statistical insights, dashboards & forecasts.',
    skills: ['Python / Pandas', 'SQL Queries', 'Exploratory Data Analysis', 'Tableau', 'Data Modeling', 'KPI Trackers'],
    stampLabel: 'IN PURSUIT',
    tapeRotation: 1.8,
    accentColor: '#1a3a3a'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'project-cinematic-reel-1',
    frameNumber: '▷ 01',
    title: 'Creative Reel 01 · Motion & Visual Arts',
    tagline: 'Google Drive portfolio reel showcasing cinematic visual pacing, grading & transitions',
    category: 'Video Production',
    year: '2025',
    rotation: 0,
    image: '/assets/work-reel-1-poster.jpg',
    videoUrl: '/assets/work-reel-1.mp4',
    videoPoster: '/assets/work-reel-1-poster.jpg',
    isVideo: true,
    videoAspect: '9:16',
    stages: [
      {
        title: '01. Sequence Exposition',
        desc: 'Cinematic visual composition and atmospheric lighting setup.',
        time: '00:00 - 00:10',
        image: '/assets/reel1_s2.jpg'
      },
      {
        title: '02. Dynamic Motion Cuts',
        desc: 'Rhythmic editing and pacing matched to ambient score.',
        time: '00:10 - 00:20',
        image: '/assets/reel1_s6.jpg'
      },
      {
        title: '03. Visual Grading & Contrast',
        desc: 'Color grading and fine-tuned tonal curve balance.',
        time: '00:20 - 00:30',
        image: '/assets/reel1_s12.jpg'
      },
      {
        title: '04. Climax & Title Outro',
        desc: 'Final resolve and brand title resolution.',
        time: '00:30 - 00:37',
        image: '/assets/reel1_s18.jpg'
      }
    ],
    description: 'Original Google Drive motion reel showcasing creative visual pacing, atmospheric grade, and precision transitions formatted for immersive vertical presentation.',
    highlights: [
      'Atmospheric color grading and balanced tonal curves',
      'Rhythmic video cuts synced to audio progression',
      'Vertical 9:16 format with high engagement pacing'
    ],
    techStack: ['Cinematography', 'Color Grading', 'After Effects', 'Sound Design'],
    demoUrl: 'https://drive.google.com/drive/folders/1jH5GU78-xTpZzejSBW383Yhf_7YyRCY1?usp=drive_link',
    driveUrl: 'https://drive.google.com/drive/folders/1jH5GU78-xTpZzejSBW383Yhf_7YyRCY1?usp=drive_link',
    colorAccent: '#7a3b2e'
  },
  {
    id: 'project-cinematic-reel-2',
    frameNumber: '▷ 02',
    title: 'Creative Reel 02 · Studio & Process Archive',
    tagline: 'Google Drive process-driven creative reel documenting hands-on craft and workshop production',
    category: 'Video Production',
    year: '2025',
    rotation: 0,
    image: '/assets/work-reel-2-poster.jpg',
    videoUrl: '/assets/work-reel-2.mp4',
    videoPoster: '/assets/work-reel-2-poster.jpg',
    isVideo: true,
    videoAspect: '9:16',
    stages: [
      {
        title: '01. Studio Prep & Setup',
        desc: 'Workspace arrangement and equipment staging.',
        time: '00:00 - 00:06',
        image: '/assets/reel2_s2.jpg'
      },
      {
        title: '02. Hands-On Crafting',
        desc: 'Detailed close-ups capturing manual artistry.',
        time: '00:06 - 00:12',
        image: '/assets/reel2_s6.jpg'
      },
      {
        title: '03. Assembly & Refining',
        desc: 'Precision fitting and textural adjustments.',
        time: '00:12 - 00:18',
        image: '/assets/reel2_s12.jpg'
      },
      {
        title: '04. Final Display',
        desc: 'Completed piece documented under studio lighting.',
        time: '00:18 - 00:24',
        image: '/assets/reel2_s18.jpg'
      }
    ],
    description: 'Documentary-style production reel from Google Drive highlighting behind-the-scenes artistry, equipment setups, and hands-on finishing steps.',
    highlights: [
      'Macro lens close-ups of tactile materials',
      'Fluid hand-held camera work with natural lighting',
      'Compact pacing ideal for social reels and portfolio showcase'
    ],
    techStack: ['Video Production', 'Macro Cinematography', 'Audio Post-Production'],
    demoUrl: 'https://drive.google.com/drive/folders/1jH5GU78-xTpZzejSBW383Yhf_7YyRCY1?usp=drive_link',
    driveUrl: 'https://drive.google.com/drive/folders/1jH5GU78-xTpZzejSBW383Yhf_7YyRCY1?usp=drive_link',
    colorAccent: '#8a4b38'
  },
  {
    id: 'project-cinematic-reel-3',
    frameNumber: '▷ 03',
    title: 'Creative Reel 03 · Live Expression & Motion',
    tagline: 'Google Drive vertical recap reel celebrating dynamic crowd energy and kinetic motion',
    category: 'Video Production',
    year: '2025',
    rotation: 0,
    image: '/assets/work-reel-3-poster.jpg',
    videoUrl: '/assets/work-reel-3.mp4',
    videoPoster: '/assets/work-reel-3-poster.jpg',
    isVideo: true,
    videoAspect: '9:16',
    stages: [
      {
        title: '01. Opening Atmosphere',
        desc: 'Setting the mood with ambient environmental audio.',
        time: '00:00 - 00:05',
        image: '/assets/reel3_s2.jpg'
      },
      {
        title: '02. Energetic Movement',
        desc: 'Quick cuts and speed ramping to amplify tempo.',
        time: '00:05 - 00:10',
        image: '/assets/reel3_s6.jpg'
      },
      {
        title: '03. Crowd & Detail Interaction',
        desc: 'Engaging moments captured with candid intimacy.',
        time: '00:10 - 00:15',
        image: '/assets/reel3_s12.jpg'
      },
      {
        title: '04. Finale Climax',
        desc: 'Grand finale resolution with lingering visual resonance.',
        time: '00:15 - 00:21',
        image: '/assets/reel3_s18.jpg'
      }
    ],
    description: 'Energetic vertical video reel from Google Drive featuring rapid-fire cuts, speed ramping, and vibrant color grading engineered for maximum viewer retention.',
    highlights: [
      'Speed-ramped transitions matching musical beats',
      'Vivid, saturated color grading with crisp contrast',
      'Tailored for 9:16 vertical storytelling'
    ],
    techStack: ['Speed Ramping', 'Beat-Matching', 'Vertical Video', 'Sound Design'],
    demoUrl: 'https://drive.google.com/drive/folders/1jH5GU78-xTpZzejSBW383Yhf_7YyRCY1?usp=drive_link',
    driveUrl: 'https://drive.google.com/drive/folders/1jH5GU78-xTpZzejSBW383Yhf_7YyRCY1?usp=drive_link',
    colorAccent: '#9e2a2b'
  },
  {
    id: 'project-cinematic-reel-4',
    frameNumber: '▷ 04',
    title: 'Creative Reel 04 · Kinetic Rhythm & Candid Motion',
    tagline: 'Google Drive vertical video capturing vibrant moments, rhythmic tempo & energetic cuts',
    category: 'Video Production',
    year: '2025',
    rotation: 0,
    image: '/assets/work-reel-4-poster.jpg',
    videoUrl: '/assets/work-reel-4.mp4',
    videoPoster: '/assets/work-reel-4-poster.jpg',
    isVideo: true,
    videoAspect: '9:16',
    stages: [
      {
        title: '01. Hook & Opening Movement',
        desc: 'Dynamic opening frames establishing high visual tempo.',
        time: '00:00 - 00:03',
        image: '/assets/reel4_s1.jpg'
      },
      {
        title: '02. Rhythmic Cadence',
        desc: 'Snappy rhythmic cuts synced with acoustic pacing.',
        time: '00:03 - 00:06',
        image: '/assets/reel4_s3.jpg'
      },
      {
        title: '03. Close-up Expressions',
        desc: 'Close-up expressions and kinetic framing.',
        time: '00:06 - 00:08',
        image: '/assets/reel4_s6.jpg'
      },
      {
        title: '04. Outro & Resolution',
        desc: 'High-impact finish with fluid motion resolution.',
        time: '00:08 - 00:10',
        image: '/assets/reel4_s9.jpg'
      }
    ],
    description: 'High-energy vertical reel from Google Drive capturing kinetic movement, vivid color grading, and rapid-fire rhythm tailored for modern social feeds.',
    highlights: [
      'Dynamic vertical 9:16 framing for mobile retention',
      'Beat-synced rhythmic pacing with crisp momentum',
      'Warm, balanced contrast with vibrant color treatment'
    ],
    techStack: ['Vertical Video', 'Kinetic Editing', 'Sound Design', 'Color Grading'],
    demoUrl: 'https://drive.google.com/file/d/1xSnZXImO1fwEXz_sIVUBdOqMlJU6Kg7W/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1jH5GU78-xTpZzejSBW383Yhf_7YyRCY1?usp=drive_link',
    colorAccent: '#a03b30'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Google Digital Marketing Course',
    organization: 'Google Career Certification',
    category: 'Certification',
    year: '2024',
    badge: '🏆 CERTIFIED',
    description: 'Mastered search engine optimization, Google Ads display/search campaigns, analytics telemetry, customer acquisition funnels, and performance marketing strategies.',
    rotation: -1.5,
    highlightColor: '#f9d56e',
    verified: true
  },
  {
    id: 'ach-2',
    title: 'Data Analytics Specialization',
    organization: 'Ongoing Advanced Curriculum',
    category: 'Certification',
    year: '2025–Present',
    badge: '📊 IN PROGRESS',
    description: 'Deep diving into Python for statistical analysis, SQL complex queries, data cleaning pipelines, hypothesis testing, and business intelligence dashboards.',
    rotation: 2,
    highlightColor: '#84a9ac',
    verified: true
  },
  {
    id: 'ach-3',
    title: 'Eureka! Entrepreneurship Competition',
    organization: 'IIT Bombay (Asia’s Largest Business Model Contest)',
    category: 'Competition',
    year: '2024',
    badge: '🚀 FINALIST',
    description: 'Participated in IIT Bombay’s flagship entrepreneurship challenge, pitching an automated tech-enabled startup model judged by top venture capitalists and founders.',
    rotation: -2.5,
    highlightColor: '#ff9a76',
    verified: true
  },
  {
    id: 'ach-4',
    title: 'National-Level Badminton Certificate',
    organization: 'National Sports Federation',
    category: 'Athletics & Arts',
    year: 'Honored',
    badge: '🏸 ATHLETICS',
    description: 'Represented state/region at national championships. Developed intense discipline, rapid tactical decision-making under pressure, and elite competitive endurance.',
    rotation: 1.8,
    highlightColor: '#b5e7a0',
    verified: true
  },
  {
    id: 'ach-5',
    title: 'National-Level Dance Certificate',
    organization: 'National Performing Arts Council',
    category: 'Athletics & Arts',
    year: 'Honored',
    badge: '💃 PERFORMING ARTS',
    description: 'Awarded national distinction for choreography, rhythm precision, expression, and stage performance, bridging artistic sensibility with technical discipline.',
    rotation: -2,
    highlightColor: '#f3c5ff',
    verified: true
  },
  {
    id: 'ach-6',
    title: 'Multiple R.S. Postcard Competitions',
    organization: 'Round Square / National Creative Guilds',
    category: 'Competition',
    year: 'Multiple Laurels',
    badge: '📮 POSTCARD HONORS',
    description: 'Multiple awards for creative miniature layout, visual postcard composition, literary voice, and graphic storytelling across inter-institutional postcard challenges.',
    rotation: 2.2,
    highlightColor: '#ffeaa7',
    verified: true
  }
];

export const CREATIVE_ITEMS: CreativeItem[] = [
  {
    id: 'art-mansvi-fabrics',
    title: 'Mansvi Fabrics · Fiber to Fashion Reel',
    medium: 'Commercial 9:16 Video Production & Kinetic Color Grading',
    date: 'FEB 2025',
    iso: 'ISO 100',
    shutter: '1/50s · 24fps',
    aperture: 'f/1.8 CINEMATIC',
    resolution: '4K Vertical (9:16)',
    image: '/assets/mansvi-fabrics-poster.jpg',
    description: 'High-energy commercial reel documenting the conversion of raw mulberry cocoons and organic cotton fibers into printed botanical textiles and finished tailored tunics.',
    tags: ['Video Reel', 'Mansvi Fabrics', 'Textiles', 'Fashion Motion']
  },
  {
    id: 'art-1',
    title: 'Tokyo Neon Solitude',
    medium: 'Digital Digicam Photography & Color Grading',
    date: 'OCT 2024',
    iso: 'ISO 800',
    shutter: '1/60s',
    aperture: 'f/2.4',
    resolution: '3.2 MP',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    description: 'Capturing the raw cyan and magenta neon glow of Shibuya backstreets through a vintage low-res digital camera sensor.',
    tags: ['Digicam', 'Night Walk', 'Tokyo', 'Y2K Colors']
  },
  {
    id: 'art-2',
    title: '35mm Film Still Study',
    medium: 'Grain Negative & Portrait Experiment',
    date: 'AUG 2024',
    iso: 'ISO 400',
    shutter: '1/250s',
    aperture: 'f/1.8',
    resolution: 'Analog 35mm',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    description: 'Double exposure film negative emphasizing natural grain textures, soft halation, and moody crimson-warm tones.',
    tags: ['Portra 400', 'Analog Grain', 'Double Exposure', 'Scrapbook']
  },
  {
    id: 'art-3',
    title: 'Generative Flora & Vector Geometry',
    medium: 'Algorithmic Canvas Art & SVG Shaders',
    date: 'JAN 2025',
    iso: 'DIGITAL',
    shutter: '60 FPS',
    aperture: 'MATH',
    resolution: 'Vector UHD',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Procedurally generated botanical curves calculated using Fibonacci phyllotaxis spirals and generative flow fields.',
    tags: ['Generative Code', 'Vector', 'Procedural', 'Abstract']
  },
  {
    id: 'art-4',
    title: 'Retro Audio Cassette & Zine Layout',
    medium: 'Physical Collage & High-Resolution Scan',
    date: 'DEC 2024',
    iso: 'ISO 200',
    shutter: '1/125s',
    aperture: 'f/4.0',
    resolution: '600 DPI',
    image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-crafted scrapbook zine page featuring cassette ribbons, typewriter text, postal stamps, and tear-tape bindings.',
    tags: ['Zine Art', 'Cassette', 'Postcard', 'Ephemera']
  },
  {
    id: 'art-5',
    title: 'Cyberpunk Industrial Monolith',
    medium: '3D Blender Render & Film Halation',
    date: 'NOV 2024',
    iso: 'RAYTRACE',
    shutter: '32 SAMPLES',
    aperture: 'f/1.4',
    resolution: '2048 x 2048',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
    description: 'Surreal geometric sculpture floating in deep red atmospheric fog, textured with scratched metal and optical lens flare.',
    tags: ['3D Render', 'Sci-Fi', 'Crimson Fog', 'Clay & Chrome']
  },
  {
    id: 'art-6',
    title: 'Vintage Postcard & Postage Stamp Study',
    medium: 'Mixed Media & Stamp Typography',
    date: 'MAY 2024',
    iso: 'ANALOG',
    shutter: 'DAYLIGHT',
    aperture: 'MACRO',
    resolution: 'Archive Scan',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    description: 'Award-winning postcard design exploring mail-art culture, hand-carved block printing, and vintage postal cancellation stamps.',
    tags: ['Postcard Contest', 'Mail Art', 'Typography', 'Letterpress']
  }
];

export const WEBSITE_PROJECTS: WebsiteProject[] = [
  {
    id: 'web-textile',
    title: 'Mansvi Fabrics — Textile Manufacturer',
    role: 'Full-Stack Web Engineering & Brand Experience',
    category: 'Textile Manufacturing & Wholesale',
    url: 'https://mansvifabrics.com',
    displayUrl: 'mansvifabrics.com',
    tagline: 'Official digital storefront & wholesale catalog for premium Viscose Rayon & printed fabrics',
    description: 'Commercial digital platform for India’s leading rayon and printed fabric manufacturer. Features an interactive fabric catalog, technical specifications (GSM, weave, shrinkage), automated WhatsApp export RFQ inquiry routing, and sustainable sourcing documentation.',
    image: '/assets/mansvi-fabrics-poster.jpg',
    techStack: ['Production Web', 'Fabric Gallery', 'WhatsApp RFQ Engine', 'B2B Catalog', 'SEO Optimized'],
    features: [
      'Comprehensive digital swatch catalog with weave & GSM specifications',
      'Direct WhatsApp one-tap inquiry pipeline for wholesale export clients',
      'Factory mill documentary footage & sustainability compliance certificates'
    ],
    colorAccent: '#a03b30',
    badgeText: 'Textile Website',
    year: '2025'
  },
  {
    id: 'web-architecture',
    title: 'Aura Architecture & Spatial Studio',
    role: 'Lead Frontend Architecture & UI Design',
    category: 'Architecture & Spatial Design',
    url: 'https://architecture-virid-two.vercel.app/',
    displayUrl: 'architecture-virid-two.vercel.app',
    tagline: 'Minimalist, high-contrast digital portfolio showcasing timber, glass & structural architecture',
    description: 'An editorial architectural showcase engineered with bespoke project viewports, smooth spatial transitions, fair-face concrete textures, and refined typography inspired by Japanese and Scandinavian modernist design.',
    image: '/assets/web-architecture.jpg',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Spatial UI', 'Editorial Typography'],
    features: [
      'Interactive spatial project gallery with fluid image aspect scaling',
      'Minimalist Zen light theme with warm architectural contrast',
      'Structural blueprints, project specs & award accreditation badges'
    ],
    colorAccent: '#a27b5c',
    badgeText: 'Architecture Website',
    year: '2025'
  },
  {
    id: 'web-cafe-scroll',
    title: 'Artisanal Cafe — 3D Scroll Journey',
    role: 'Creative Web Development & Motion Engineering',
    category: 'Interactive 3D Experience',
    url: 'https://ezgif-animationcoffee.vercel.app/',
    displayUrl: 'ezgif-animationcoffee.vercel.app',
    desktopOnly: true,
    tagline: 'Frame-by-frame 3D scroll-driven animation uncovering the artisanal pour-over coffee journey',
    description: 'A scroll-driven 3D animation experience engineered specifically for desktop browsers. As the visitor scrolls, frame-by-frame canvas mechanics reveal the sensory journey from raw coffee cherries and roasting to pour-over brew and ambient cafe spaces.',
    image: '/assets/web-coffee-cafe.jpg',
    techStack: ['Scroll-Driven 3D', 'HTML5 Canvas', 'Motion Keyframes', 'Desktop Web Experience'],
    features: [
      'High-precision scroll-driven frame-by-frame animation engine',
      'Rich multi-stage storytelling: bean selection, roasting & pour-over extraction',
      'Special Requirement: Designed and optimized exclusively for desktop viewports'
    ],
    colorAccent: '#b06530',
    badgeText: 'Cafe (Only for Desktop)',
    year: '2025'
  },
  {
    id: 'web-dental',
    title: 'Precision Dental Clinic & Healthcare',
    role: 'Frontend Engineering & Healthcare UI/UX',
    category: 'Healthcare & Clinical Booking',
    url: 'https://dental-clinic-ashen-three.vercel.app/',
    displayUrl: 'dental-clinic-ashen-three.vercel.app',
    tagline: 'Patient-centric clinic platform with 3D implant breakdowns, treatment guides & booking',
    description: 'Comprehensive clinic web platform featuring 3D precision dental implant guides, pediatric and cosmetic dentistry service breakdowns, doctor credential portfolios, emergency contact protocols, and direct appointment reservation flows.',
    image: '/assets/web-dental.jpg',
    techStack: ['React', 'TypeScript', 'Healthcare UI/UX', 'Patient Booking', 'Responsive Design'],
    features: [
      'Interactive 3D implant visualization and treatment procedural guides',
      'Seamless patient appointment booking form with instant confirmation',
      'Emergency clinic response hotline integration and doctor credential profiles'
    ],
    colorAccent: '#1d6f78',
    badgeText: 'Dental Website',
    year: '2025'
  }
];
