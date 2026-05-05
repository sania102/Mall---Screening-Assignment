"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "./components/Navbar";

/* ─────────────────────────────────────────────
   DATA  –  All facts verified against official
   Mabanee / The Avenues website and Wikipedia
───────────────────────────────────────────── */

const STATS = [
  { value: "12",          label: "Districts" },
  { value: "1,100+",     label: "Stores" },
  { value: "360,000 m²", label: "Gross Land Area" },
  { value: "13,000",     label: "Parking Spaces" },
];

/*
  All 12 official districts (verified):
  1st Avenue, 2nd Avenue, Prestige, Grand Avenue,
  SoKu, The Mall, The Souk, The Arcades,
  Grand Plaza, Electra, The Forum, The Gardens
  Source: mabanee.com & the-avenues.com/kuwait/en/about
*/
const DISTRICTS = [
  {
    id: "first-avenue",
    name: "1st Avenue",
    tag: "Retail & Entertainment",
    description:
      "The original district and beating heart of The Avenues. Home to over 200 stores, restaurants, cafés, and 11 Cinescape movie theatres — including an IKEA — making it Kuwait's most iconic retail destination.",
    image: "/images/first-avenue.jpg",
    color: "#c9a96e",
    gradient: "from-[#2a1f10] to-[#0f0b06]",
  },
  {
    id: "second-avenue",
    name: "2nd Avenue",
    tag: "Dining & Lifestyle",
    description:
      "Larger footprint than 1st Avenue. Features the Food World on the second floor, a glass-roofed outdoor feel, HyperMax, Magic Planet entertainment, and a flagship Marks & Spencer.",
    image: "/images/second-avenue.jpg",
    color: "#7ecac3",
    gradient: "from-[#091a1a] to-[#040d0d]",
  },
  {
    id: "grand-avenue",
    name: "Grand Avenue",
    tag: "Shopping & Dining",
    description:
      "A stone-paved, tree-lined boulevard over 500 m long and 22 m wide — inspired by European city streets — covered by a heat-proof transparent roof. Paved with natural stone from Turkey, Spain, China, and Italy.",
    image: "/images/grand.jpg",
    color: "#c9a96e",
    gradient: "from-[#3a2a10] to-[#1a1208]",
  },
  {
    id: "prestige",
    name: "Prestige",
    tag: "Luxury",
    description:
      "Kuwait's largest luxury shopping destination, combining world-class high-end retail and premium dining with direct integration with Waldorf Astoria Kuwait. Extended in Phase IV with a signature illuminated dome.",
    image: "/images/prestige.jpg",
    color: "#8b7355",
    gradient: "from-[#2a1f10] to-[#100c06]",
  },
  {
    id: "soku",
    name: "SoKu",
    tag: "Lifestyle & Dining",
    description:
      "Inspired by New York's SoHo district — the name stands for South of Kuwait. A bohemian, metropolitan setting with trendy restaurants, sophisticated cafés, and laid-back courtyards across two levels.",
    image: "/images/soku.jpg",
    color: "#e07b39",
    gradient: "from-[#2a1205] to-[#120802]",
  },
  {
    id: "the-mall",
    name: "The Mall",
    tag: "Modern Metropolitan",
    description:
      "A contemporary retail and dining district featuring brands making their Kuwait or Middle East debut, SuperPark and SuperPark Arena, QUEST soft play, and a curated range of casual and fine dining.",
    image: "/images/Mall.jpg",
    color: "#5d6d7e",
    gradient: "from-[#11161c] to-[#090d12]",
  },
  {
    id: "souk",
    name: "The Souk",
    tag: "Heritage",
    description:
      "Modeled on a traditional Kuwaiti market with wooden doors, ceilings, and winding streets. Celebrates local heritage through regional retail architecture and authentic Kuwaiti, Mediterranean, Arabian, and Indian dining.",
    image: "/images/souk.jpg",
    color: "#b5651d",
    gradient: "from-[#2d1a0a] to-[#130b04]",
  },
  {
    id: "arcades",
    name: "The Arcades",
    tag: "Retail",
    description:
      "Part of the Phase IV expansion, The Arcades adds further retail depth to The Avenues, seamlessly connected to the wider destination and accessible from multiple district entry points.",
    image: "/images/arcades.jpg",
    color: "#9b59b6",
    gradient: "from-[#1a0a2a] to-[#0a0514]",
  },
  {
    id: "grand-plaza",
    name: "Grand Plaza",
    tag: "Gathering Space",
    description:
      "The civic-scale focal point of The Avenues — the conclusion of the 640 m Grand Avenue promenade. Designed for shows, markets, and performances with ample seating beneath a spectacular ceiling structure.",
    image: "/images/grand-plaza.jpg",
    color: "#d4af37",
    gradient: "from-[#2a2410] to-[#120f06]",
  },
  {
    id: "electra",
    name: "Electra",
    tag: "Digital & Interactive",
    description:
      "A multimedia-driven district centred on digital retail, interactive technology experiences, and evolving brand displays — positioning The Avenues at the forefront of modern experiential retail.",
    image: "/images/electra.jpg",
    color: "#48c9b0",
    gradient: "from-[#031a1a] to-[#010d0d]",
  },
  {
    id: "forum",
    name: "The Forum",
    tag: "Modern Metropolitan",
    description:
      "A stunning Phase IV district anchored by a 70 m-diameter Circus covered by an intricate ETFE roof. Houses the entrance to Hilton Garden Inn Kuwait — the brand's largest hotel in the EMEA region.",
    image: "/images/forum.jpg",
    color: "#4a90d9",
    gradient: "from-[#0a1520] to-[#050a10]",
  },
  {
    id: "gardens",
    name: "The Gardens",
    tag: "Dining Destination",
    description:
      "A gourmet dining district built around shaded green courtyard spaces and a premium al fresco atmosphere — where food, greenery, and relaxed dwell time combine into one of The Avenues' most distinctive settings.",
    image: "/images/gardens.jpg",
    color: "#4a7c59",
    gradient: "from-[#0d2216] to-[#060f0a]",
  },
];

const DINING_CARDS = [
  {
    name: "Fine Dining",
    count: "Premium",
    desc: "High-end restaurants and elevated culinary experiences woven throughout Prestige, Grand Avenue, and The Gardens.",
    image: "/images/fine-dining.jpg",
    gradient: "from-[#1a0a0a] to-[#0a0505]",
  },
  {
    name: "Global Cuisine",
    count: "International",
    desc: "Local and international restaurant concepts across all 12 districts — from Kuwaiti heritage cooking in The Souk to global brands in 2nd Avenue's Food World.",
    image: "/images/global.jpg",
    gradient: "from-[#0a0f1a] to-[#05080d]",
  },
  {
    name: "Café Culture",
    count: "All-Day",
    desc: "Cafés and social spaces integrated into SoKu, The Mall, Grand Avenue, and beyond — supporting longer visits and lifestyle-driven dwell time.",
    image: "/images/cafe.jpg",
    gradient: "from-[#1a1208] to-[#0d0904]",
  },
];

const ATTRACTIONS = [
  {
    name: "Cinescape",
    desc: "11 Cinescape movie theatres within 1st Avenue — one of Kuwait's largest cinema complexes — reinforce The Avenues as a full-day leisure destination.",
    stat: "11 Theatres",
    image: "/images/cinema.jpg",
    gradient: "from-[#1a0a20] to-[#0a0510]",
    color: "#9b59b6",
  },
  {
    name: "Grand Plaza",
    desc: "A civic-scale gathering space at the conclusion of the 640 m Grand Avenue promenade — designed for shows, markets, and performances beneath a spectacular ceiling.",
    stat: "640 m Promenade",
    image: "/images/plaza.jpg",
    gradient: "from-[#1a0f00] to-[#0d0700]",
    color: "#e67e22",
  },
  {
    name: "SuperPark & SuperPark Arena",
    desc: "Two separate SuperPark locations within The Mall district provide interactive, family-friendly entertainment at destination scale.",
    stat: "2 Locations",
    image: "/images/superpark.jpg",
    gradient: "from-[#0a1a0a] to-[#050d05]",
    color: "#27ae60",
  },
  {
    name: "The Forum Circus",
    desc: "The Forum's centrepiece: a 70 m-diameter Circus covered by an intricate ETFE roof — an architectural landmark in its own right within the wider destination.",
    stat: "70 m Diameter",
    image: "/images/forum-circus.jpg",
    gradient: "from-[#031a1a] to-[#010d0d]",
    color: "#48c9b0",
  },
];

const EVENT_TYPES = [
  {
    id: "brand",
    label: "Brand Activations",
    headline: "Create visibility at destination scale.",
    body:
      "The Avenues provides a high-profile setting for branded experiences, campaign launches, and customer-engagement moments across its 12 districts — from the civic Grand Plaza to the digital Electra district.",
    stat1: { n: "12",           l: "Districts" },
    stat2: { n: "Multi-format", l: "Activation Potential" },
    image: "/images/brand.jpg",
  },
  {
    id: "shows",
    label: "Shows & Public Programming",
    headline: "Built for gathering and visibility.",
    body:
      "Grand Plaza — the civic focal point of The Avenues at the end of the 640 m Grand Avenue promenade — is purpose-designed with seating and gathering capacity for shows, markets, and performances.",
    stat1: { n: "Grand Plaza", l: "Gathering Space" },
    stat2: { n: "640 m",       l: "Grand Avenue Promenade" },
    image: "/images/concerts.jpg",
  },
  {
    id: "popup",
    label: "Pop-Up Retail",
    headline: "Launch, test, and engage.",
    body:
      "The Avenues' 12-district layout creates flexible opportunities for temporary retail concepts, seasonal campaign moments, and market-entry activations within one of Kuwait's most prominent commercial environments.",
    stat1: { n: "12 Districts", l: "Retail Ecosystem" },
    stat2: { n: "Flexible",     l: "Campaign Format" },
    image: "/images/popup.jpg",
  },
];

const LEASING_PATHS = [
  {
    id: "luxury",
    label: "Luxury",
    color: "#c9a96e",
    headline: "Position your brand in an elevated environment.",
    points: [
      "Prestige is Kuwait's largest luxury shopping destination — extended across Phases III and IV.",
      "Direct integration with Waldorf Astoria Kuwait reinforces premium brand adjacency.",
      "Features a signature illuminated dome, purpose-designed as a landmark meeting point.",
      "Part of a broader 12-district ecosystem with 1,100+ stores and 13,000 parking spaces.",
    ],
    cta: "Request Luxury Leasing Brief",
    image: "/images/luxury.jpg",
    gradient: "from-[#2a1f10] to-[#100c06]",
  },
  {
    id: "retail",
    label: "Retail",
    color: "#4a7c59",
    headline: "Reach shoppers across multiple districts and formats.",
    points: [
      "Over 1,100 stores across 12 themed districts covering 360,000 m² gross land area.",
      "Retail environments range from the glass-roofed 1st & 2nd Avenues to the boulevard-style Grand Avenue.",
      "Multiple brands have chosen The Avenues as their Kuwait or Middle East debut location.",
      "Winner of the ICSC Gold Award for Best Shopping Centre, Middle East & North Africa.",
    ],
    cta: "Explore Retail Opportunities",
    image: "/images/retail.jpg",
    gradient: "from-[#0d2216] to-[#060f0a]",
  },
  {
    id: "fnb",
    label: "Dining",
    color: "#c0392b",
    headline: "Join a destination where food is part of the draw.",
    points: [
      "Dining is integrated across all 12 districts — from fine dining in Prestige to the heritage cuisine of The Souk.",
      "Food World in 2nd Avenue and the al fresco Gardens are dedicated dining destinations within the mall.",
      "SoKu's bohemian setting draws a lifestyle-led dining audience separately from mainstream mall traffic.",
      "Ideal for concepts that benefit from a destination rather than convenience-led context.",
    ],
    cta: "Discuss Dining Opportunities",
    image: "/images/fnb.jpg",
    gradient: "from-[#2d0a08] to-[#130403]",
  },
  {
    id: "popup",
    label: "Brand Presence",
    color: "#8e44ad",
    headline: "Create flexible visibility inside a landmark destination.",
    points: [
      "Suitable for launches, temporary activations, and seasonal brand moments.",
      "Grand Plaza's civic scale makes it ideal for high-visibility experiential pop-ups.",
      "Electra district provides a digital-first environment for technology and lifestyle brand activations.",
      "Can be structured as a standalone activation or as part of a broader sponsorship conversation.",
    ],
    cta: "Discuss Brand Activation",
    image: "/images/popup1.jpg",
    gradient: "from-[#1a0a2a] to-[#0a0514]",
  },
];

const SPONSORSHIP_TIERS = [
  {
    tier: "Signature Presence",
    color: "#c9a96e",
    perks: [
      "Naming rights on a district or venue",
      "Permanent brand installation",
      "Exclusive category alignment",
      "Co-branded events calendar",
      "Bespoke activation concept and budget",
    ],
  },
  {
    tier: "District Activation",
    color: "#a0a0b0",
    perks: [
      "Digital OOH presence across key atria",
      "Anchor activation zone within a named district",
      "Seasonal signature event co-sponsorship",
      "Priority category positioning",
      "Campaign performance reporting",
    ],
  },
  {
    tier: "Campaign Partnership",
    color: "#8b7355",
    perks: [
      "Campaign-based activations",
      "Digital and physical media packages",
      "Event co-sponsorship slots",
      "Audience engagement by district",
    ],
  },
];

/* ─────────────────────────────────────────────
   IMAGE WITH GRADIENT FALLBACK
───────────────────────────────────────────── */
function ImgWithFallback({
  src,
  alt,
  className = "",
  gradient = "from-[#1a1a1a] to-[#0a0a0a]",
  style = {},
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`bg-gradient-to-br ${gradient} ${className}`}
        style={style}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
      loading="lazy"
      decoding="async"
    />
  );
}


function BgVideo({
  src,
  className = "",
  preload = "metadata",
  style = {},
}) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload={preload}
      crossOrigin="anonymous"
      className={className}
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform",
        transform: "translateZ(0)",
        ...style,
      }}
    >
      {/* WebM first — better compression at same visual quality */}
      <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
      <source src={src} type="video/mp4" />
    </video>
  );
}

/* ─────────────────────────────────────────────
   STAT BAR
───────────────────────────────────────────── */
function StatBar({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a]">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-black py-12 px-6 text-center"
        >
          <div className="text-4xl md:text-5xl font-thin text-[#c9a96e] tracking-tight">
            {s.value}
          </div>
          <div className="text-gray-400 text-sm mt-2 uppercase tracking-widest">
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CTA MODAL
───────────────────────────────────────────── */
function CTAModal({ isOpen, onClose, title, subtitle }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.3 }}
          className="bg-[#111] border border-[#2a2a2a] rounded-2xl max-w-lg w-full p-10 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-2xl font-thin mb-2 text-[#c9a96e]">{title}</h3>
          <p className="text-gray-400 text-sm mb-8">{subtitle}</p>
          <div className="space-y-4">
            {["Full Name", "Company / Brand"].map((ph) => (
              <input
                key={ph}
                type="text"
                placeholder={ph}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a96e] transition"
              />
            ))}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a96e] transition"
            />
            <textarea
              rows={3}
              placeholder="Tell us about your interest..."
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a96e] transition resize-none"
            />
          </div>
          <button className="mt-6 w-full bg-[#c9a96e] text-black py-4 rounded-lg font-medium tracking-wide hover:bg-[#b8924a] transition">
            Submit Enquiry
          </button>
          <button
            onClick={onClose}
            className="mt-4 w-full text-gray-600 text-sm hover:text-white transition"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   SOUND TOGGLE
───────────────────────────────────────────── */
function SoundToggle({ videoRef }) {
  const [muted, setMuted] = useState(true);

  const toggle = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    if (!vid.muted && vid.paused) vid.play().catch(() => {});
    setMuted(vid.muted);
  }, [videoRef]);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.8 }}
      onClick={toggle}
      aria-label={muted ? "Unmute video" : "Mute video"}
      className="absolute bottom-8 right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm text-white text-xs hover:border-white/70 transition"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {muted ? (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        ) : (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        )}
      </svg>
      <span className="uppercase tracking-widest">{muted ? "Unmute" : "Mute"}</span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────── */
function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function Home() {
  const [activeEvent,    setActiveEvent]    = useState("brand");
  const [activeLease,    setActiveLease]    = useState("luxury");
  const [userPath,       setUserPath]       = useState(null);
  const [modalOpen,      setModalOpen]      = useState(false);
  const [modalMeta,      setModalMeta]      = useState({ title: "", subtitle: "" });
  const [activeDistrict, setActiveDistrict] = useState(0);

  const heroVideoRef = useRef(null);
  const heroRef      = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  function openModal(title, subtitle) {
    setModalMeta({ title, subtitle });
    setModalOpen(true);
  }

  const currentEvent = EVENT_TYPES.find((e) => e.id === activeEvent);
  const currentLease = LEASING_PATHS.find((l) => l.id === activeLease);

  const ctaLabel =
    userPath === "retail"
      ? "Schedule a Leasing Call"
      : userPath === "event"
      ? "Book a Site Visit"
      : userPath === "sponsor"
      ? "Request Partnership Deck"
      : "Get in Touch";

  const ctaSubtitle =
    userPath === "retail"
      ? "Our leasing team will be in touch within 24 hours."
      : userPath === "event"
      ? "Our events team will confirm your preferred dates."
      : userPath === "sponsor"
      ? "Receive our full sponsorship prospectus."
      : "Tell us what you're looking for and we'll respond within 24 hours.";

  return (
    <main className="w-full bg-black font-[family-name:var(--font-geist-sans)]">
      <CTAModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalMeta.title}
        subtitle={modalMeta.subtitle}
      />
      <Navbar />

      
      <Section id="overview">
        <div ref={heroRef} className="relative w-full h-screen overflow-hidden">
          <motion.div
            style={{ scale: heroScale }}
            className="absolute inset-0 origin-center"
          >
            
            <video
              ref={heroVideoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                willChange: "transform",
              }}
            >
              <source src="/videos/avenues.webm" type="video/webm" />
              <source src="/videos/avenues.mp4" type="video/mp4" />
            </video>
          </motion.div>

         
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 0.4, duration: 1.2 }}
              className="text-[#c9a96e] text-xs uppercase tracking-[0.4em] mb-6"
            >
              Kuwait · Al Rai · Fifth Ring Road
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1.1 }}
              className="text-white text-5xl md:text-7xl font-thin leading-tight tracking-tight max-w-4xl"
            >
              This isn't a mall.
              <br />
              <span className="text-[#c9a96e]">It's a city of experiences.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-gray-300 mt-6 text-lg md:text-xl max-w-xl font-light"
            >
              12 districts. 1,100+ stores. Kuwait's landmark retail, dining,
              and lifestyle destination.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.8 }}
              className="text-gray-500 mt-2 text-xs uppercase tracking-widest"
            >
              Developed and managed by Mabanee
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="flex gap-4 mt-10 flex-wrap justify-center"
            >
              <button
                onClick={() =>
                  openModal(
                    "Explore The Avenues",
                    "Tell us how you'd like to partner with us."
                  )
                }
                className="px-8 py-4 bg-[#c9a96e] text-black text-sm font-medium rounded-full hover:bg-[#b8924a] transition"
              >
                Start a Conversation
              </button>
              <a
                href="#why"
                className="px-8 py-4 border border-white/40 text-white text-sm font-light rounded-full hover:border-white transition"
              >
                Explore the Opportunity ↓
              </a>
            </motion.div>
          </motion.div>

          <SoundToggle videoRef={heroVideoRef} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40 animate-pulse" />
          </motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          USER PATH SELECTOR
      ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] border-b border-[#1a1a1a] py-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-500 text-xs uppercase tracking-widest mb-6"
        >
          Personalise Your Experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white text-2xl md:text-3xl font-thin mb-10"
        >
          How would you like to partner with The Avenues?
        </motion.h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { id: "retail",  label: "Retail" },
            { id: "event",   label: "Events" },
            { id: "sponsor", label: "Sponsorship" },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setUserPath(p.id)}
              className={`px-7 py-3 rounded-full text-sm border transition ${
                userPath === p.id
                  ? "bg-[#c9a96e] text-black border-[#c9a96e]"
                  : "border-[#333] text-gray-400 hover:border-[#c9a96e] hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        {userPath && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#c9a96e] mt-6 text-sm"
          >
            {userPath === "retail" &&
              "↓ Scroll to discover your ideal space at The Avenues"}
            {userPath === "event" &&
              "↓ Explore brand presence and activation opportunities"}
            {userPath === "sponsor" &&
              "↓ See how leading brands activate at The Avenues"}
          </motion.p>
        )}
      </section>

      {/* ══════════════════════════════════════
          2. WHY THE AVENUES
     
      ══════════════════════════════════════ */}
      <Section id="why">
        <div className="bg-black py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <p className="text-[#c9a96e] text-xs uppercase tracking-widest mb-4">
                The Scale
              </p>
              <h2 className="text-4xl md:text-6xl font-thin text-white">
                Numbers That Demand Attention
              </h2>
            </motion.div>

            <StatBar stats={STATS} />

            <div className="mt-20 grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-[#c9a96e] text-xs uppercase tracking-widest mb-4">
                  Why Here
                </p>
                <h3 className="text-3xl md:text-4xl font-thin text-white leading-snug">
                  Kuwait's commercial capital — in one address.
                </h3>
                <p className="text-gray-400 mt-6 leading-relaxed">
                  Located in Al Rai on the Fifth Ring Road, The Avenues combines
                  destination-scale planning with a curated mix of retail, dining,
                  and entertainment across 360,000 m² of gross land area. Its
                  12-district layout and 13,000-car parking capacity support both
                  everyday visits and major commercial visibility.
                </p>
                <p className="text-gray-400 mt-4 leading-relaxed">
                  Adjacent to Hilton Garden Inn Kuwait — the brand's largest hotel in
                  the EMEA region — and the five-star Waldorf Astoria Kuwait, The
                  Avenues is Kuwait's premier lifestyle and hospitality address.
                  Winner of the ICSC Gold Award (Best Shopping Centre, MENA) and
                  Kuwait's first mall to receive LEED Silver certification.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { label: "Location",  value: "Al Rai, Kuwait" },
                  { label: "Opened",    value: "April 2007" },
                  { label: "Districts", value: "12" },
                  { label: "Parking",   value: "13,000 Cars" },
                  { label: "Land Area", value: "360,000 m²" },
                  { label: "Award",     value: "ICSC Gold" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6"
                  >
                    <div className="text-2xl font-thin text-[#c9a96e]">
                      {item.value}
                    </div>
                    <div className="text-gray-500 text-xs mt-1 uppercase tracking-wide">
                      {item.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          3. RETAIL — All 12 Districts
          
      ══════════════════════════════════════ */}
      <Section id="retail">
        <div className="bg-[#070707] py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-[#c9a96e] text-xs uppercase tracking-widest mb-4">
                The Retail Environment
              </p>
              <h2 className="text-4xl md:text-6xl font-thin text-white">
                12 Districts. One Destination.
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                Each of The Avenues' 12 districts has its own theme, architecture,
                and commercial character — from European boulevards to heritage souks
                to digital-first districts.
              </p>
            </motion.div>

            {/* District selector — all 12 */}
            <div className="flex gap-2 justify-center flex-wrap mb-12">
              {DISTRICTS.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => setActiveDistrict(i)}
                  className="px-4 py-2 rounded-full text-xs border transition"
                  style={
                    activeDistrict === i
                      ? {
                          backgroundColor: d.color,
                          borderColor: d.color,
                          color: "#000",
                        }
                      : { borderColor: "#333", color: "#9ca3af" }
                  }
                >
                  {d.name}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDistrict}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="relative h-[420px] rounded-2xl overflow-hidden">
                  <ImgWithFallback
                    src={DISTRICTS[activeDistrict].image}
                    alt={DISTRICTS[activeDistrict].name}
                    className="w-full h-full object-cover"
                    gradient={DISTRICTS[activeDistrict].gradient}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span
                      className="text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{
                        backgroundColor:
                          DISTRICTS[activeDistrict].color + "33",
                        color: DISTRICTS[activeDistrict].color,
                        border: `1px solid ${DISTRICTS[activeDistrict].color}44`,
                      }}
                    >
                      {DISTRICTS[activeDistrict].tag}
                    </span>
                  </div>
                </div>

                <div className="pl-0 md:pl-8">
                  <h3
                    className="text-4xl font-thin mb-4"
                    style={{ color: DISTRICTS[activeDistrict].color }}
                  >
                    {DISTRICTS[activeDistrict].name}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {DISTRICTS[activeDistrict].description}
                  </p>
                  <div className="mt-8 flex gap-4 flex-wrap">
                    <button
                      onClick={() =>
                        openModal(
                          `Lease in ${DISTRICTS[activeDistrict].name}`,
                          "Our team will send you available spaces within 24 hours."
                        )
                      }
                      className="px-6 py-3 text-sm rounded-full text-black font-medium transition hover:opacity-80"
                      style={{
                        backgroundColor: DISTRICTS[activeDistrict].color,
                      }}
                    >
                      Enquire About This District
                    </button>
                    <a
                      href="#leasing"
                      className="px-6 py-3 text-sm rounded-full border border-[#333] text-gray-400 hover:text-white hover:border-[#555] transition"
                    >
                      View Leasing Paths →
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          4. LUXURY — Prestige District
         
      ══════════════════════════════════════ */}
      <Section id="luxury">
        <div className="relative w-full h-[80vh] overflow-hidden">
          {/*
            VIDEO QUALITY FIX on section backgrounds:
            Use BgVideo component which applies GPU compositing styles.
            Keep opacity on the video element via CSS class (opacity-*),
            NOT via inline style mixing with filter — the two together
            trigger a CPU composite path in most browsers.
          */}
          <BgVideo
            src="/videos/luxury.mp4"
            className="absolute w-full h-full object-cover opacity-60"
            preload="metadata"
          />
          <ImgWithFallback
            src="/images/luxury/prestige-wing.jpg"
            alt="The Prestige District"
            className="absolute w-full h-full object-cover"
            gradient="from-[#1a1208] to-[#0a0804]"
            style={{ zIndex: -1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-10 w-full">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
              >
                <p className="text-[#c9a96e] text-xs uppercase tracking-widest mb-4">
                  The Prestige District
                </p>
                <h2 className="text-5xl md:text-6xl font-thin text-white leading-tight">
                  Luxury, elevated.
                </h2>
                <p className="text-gray-300 mt-6 text-lg leading-relaxed">
                  Kuwait's largest luxury shopping destination, combining
                  world-class high-end retail and premium dining — with direct
                  integration with the five-star Waldorf Astoria Kuwait. Prestige
                  features a signature illuminated dome, purpose-designed as a
                  landmark meeting point within the destination.
                </p>
                <div className="mt-8 flex gap-8 flex-wrap">
                  {[
                    { n: "Prestige",       l: "Kuwait's Largest Luxury District" },
                    { n: "Waldorf Astoria", l: "Integrated 5-Star Hotel" },
                    { n: "Illuminated",    l: "Signature Dome" },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="text-[#c9a96e] text-2xl font-thin">{s.n}</div>
                      <div className="text-gray-500 text-xs uppercase tracking-wide mt-1">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    openModal(
                      "Luxury Leasing Enquiry",
                      "Speak directly with our luxury leasing director."
                    )
                  }
                  className="mt-8 px-8 py-4 bg-[#c9a96e] text-black text-sm font-medium rounded-full hover:bg-[#b8924a] transition"
                >
                  Speak to Our Luxury Team
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          5. DINING
      ══════════════════════════════════════ */}
      <Section id="dining">
        <div className="bg-black py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <p className="text-[#c9a96e] text-xs uppercase tracking-widest mb-4">
                Dining & Lifestyle
              </p>
              <h2 className="text-4xl md:text-6xl font-thin text-white">
                Food as a destination in itself.
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                A diverse culinary landscape woven across all 12 districts — from
                heritage Kuwaiti cooking in The Souk to al fresco dining in The
                Gardens to the bohemian cafés of SoKu.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {DINING_CARDS.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer h-[360px]"
                >
                  <ImgWithFallback
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    gradient={d.gradient}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/80 transition duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="text-3xl font-thin text-[#c9a96e] mb-1">
                      {d.count}
                    </div>
                    <h3 className="text-white text-2xl font-light mb-3">{d.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
                      {d.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 relative h-[50vh] rounded-2xl overflow-hidden">
              {/*
                VIDEO QUALITY FIX: BgVideo component handles GPU compositing.
                Gradient overlay is a SIBLING div, not applied to the video.
              */}
              <BgVideo
                src="/videos/dining.mp4"
                className="absolute w-full h-full object-cover"
                preload="metadata"
              />
              <ImgWithFallback
                src="/images/dining/strip.jpg"
                alt="Dining at The Avenues"
                className="absolute w-full h-full object-cover"
                gradient="from-[#1a0a0a] to-[#0a0505]"
                style={{ zIndex: -1 }}
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                <div>
                  <h3 className="text-3xl md:text-5xl font-thin text-white">
                    Dining woven into the destination experience.
                  </h3>
                  <button
                    onClick={() =>
                      openModal(
                        "Dining Opportunities",
                        "Our team will be in touch within 24 hours."
                      )
                    }
                    className="mt-6 px-7 py-3 border border-white/40 text-white text-sm rounded-full hover:bg-white hover:text-black transition"
                  >
                    Explore Dining Opportunities
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          6. ATTRACTIONS
         
      ══════════════════════════════════════ */}
      <Section id="attractions">
        <div className="bg-[#050505] py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <p className="text-[#c9a96e] text-xs uppercase tracking-widest mb-4">
                Attractions & Entertainment
              </p>
              <h2 className="text-4xl md:text-6xl font-thin text-white">
                A destination built to keep you longer.
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                Entertainment, leisure, and architectural landmarks are integrated
                across The Avenues' 12 districts — making it a full-day destination.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {ATTRACTIONS.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative rounded-2xl overflow-hidden h-[300px] group"
                >
                  <ImgWithFallback
                    src={a.image}
                    alt={a.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    gradient={a.gradient}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div
                      className="text-xs uppercase tracking-widest mb-2"
                      style={{ color: a.color }}
                    >
                      {a.stat}
                    </div>
                    <h3 className="text-white text-2xl font-thin mb-2">{a.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
                      {a.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          7. BRAND PRESENCE (EVENTS)
      ══════════════════════════════════════ */}
      <Section id="events">
        <div className="relative w-full overflow-hidden">
          <BgVideo
            src="/videos/events.mp4"
            className="absolute w-full h-full object-cover opacity-20"
            preload="metadata"
          />
          <div className="relative z-10 py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className="text-[#c9a96e] text-xs uppercase tracking-widest mb-4">
                  Brand Presence
                </p>
                <h2 className="text-4xl md:text-6xl font-thin text-white">
                  A destination built for brand presence.
                </h2>
              </motion.div>

              <div className="flex gap-3 justify-center flex-wrap mb-12">
                {EVENT_TYPES.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setActiveEvent(e.id)}
                    className={`px-6 py-3 rounded-full text-sm border transition ${
                      activeEvent === e.id
                        ? "bg-[#c9a96e] text-black border-[#c9a96e]"
                        : "border-[#333] text-gray-400 hover:border-[#555] hover:text-white"
                    }`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0d0d0d]/80 backdrop-blur-sm border border-[#1a1a1a] rounded-2xl overflow-hidden"
                >
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto min-h-[260px]">
                      <ImgWithFallback
                        src={currentEvent.image}
                        alt={currentEvent.label}
                        className="w-full h-full object-cover"
                        gradient="from-[#1a1208] to-[#0a0804]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d0d0d]/80 hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent block md:hidden" />
                    </div>

                    <div className="p-10 flex flex-col justify-center">
                      <h3 className="text-3xl md:text-4xl font-thin text-white mb-4">
                        {currentEvent.headline}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {currentEvent.body}
                      </p>
                      <div className="flex gap-10 mt-8">
                        <div>
                          <div className="text-3xl font-thin text-[#c9a96e]">
                            {currentEvent.stat1.n}
                          </div>
                          <div className="text-gray-600 text-xs uppercase tracking-wide mt-1">
                            {currentEvent.stat1.l}
                          </div>
                        </div>
                        <div>
                          <div className="text-3xl font-thin text-[#c9a96e]">
                            {currentEvent.stat2.n}
                          </div>
                          <div className="text-gray-600 text-xs uppercase tracking-wide mt-1">
                            {currentEvent.stat2.l}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          openModal(
                            currentEvent.headline,
                            "Our team will contact you within 24 hours."
                          )
                        }
                        className="mt-8 self-start px-7 py-3 bg-[#c9a96e] text-black text-sm font-medium rounded-full hover:bg-[#b8924a] transition"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>

                  {/* Venue chips — all verified named spaces */}
                  <div className="border-t border-[#1a1a1a] grid grid-cols-2 md:grid-cols-4 divide-x divide-[#1a1a1a]">
                    {[
                      "Grand Plaza",
                      "The Forum Circus",
                      "Grand Avenue Promenade",
                      "District Courtyards",
                    ].map((v, i) => (
                      <div key={i} className="px-6 py-4 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] flex-shrink-0" />
                        <div className="text-white text-xs font-light">{v}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          8. LEASING
      ══════════════════════════════════════ */}
      <Section id="leasing">
        <div className="bg-black py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-[#c9a96e] text-xs uppercase tracking-widest mb-4">
                Leasing
              </p>
              <h2 className="text-4xl md:text-6xl font-thin text-white">
                Find your space.
              </h2>
              <p className="text-gray-500 mt-4">
                Tailored paths for every brand category.
              </p>
            </motion.div>

            <div className="flex gap-3 justify-center flex-wrap mb-10">
              {LEASING_PATHS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActiveLease(l.id)}
                  className="px-6 py-3 rounded-full text-sm border transition"
                  style={
                    activeLease === l.id
                      ? { backgroundColor: l.color, borderColor: l.color, color: "#000" }
                      : { borderColor: "#333", color: "#9ca3af" }
                  }
                >
                  {l.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLease}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl overflow-hidden grid md:grid-cols-2"
              >
                <div className="relative h-64 md:h-auto min-h-[280px]">
                  <ImgWithFallback
                    src={currentLease.image}
                    alt={currentLease.label}
                    className="w-full h-full object-cover"
                    gradient={currentLease.gradient}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d0d0d]/60 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent block md:hidden" />
                </div>

                <div className="p-10">
                  <h3
                    className="text-3xl font-thin mb-6"
                    style={{ color: currentLease.color }}
                  >
                    {currentLease.headline}
                  </h3>
                  <ul className="space-y-4">
                    {currentLease.points.map((pt, i) => (
                      <li
                        key={i}
                        className="flex gap-3 items-start text-gray-400 text-sm leading-relaxed"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: currentLease.color }}
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() =>
                      openModal(
                        currentLease.cta,
                        "Our leasing team will prepare a tailored proposal for you."
                      )
                    }
                    className="mt-8 px-7 py-3 text-black text-sm font-medium rounded-full transition hover:opacity-80"
                    style={{ backgroundColor: currentLease.color }}
                  >
                    {currentLease.cta}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          9. SPONSORSHIP
      ══════════════════════════════════════ */}
      <Section id="sponsorship">
        <div className="bg-[#070707] py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-[#c9a96e] text-xs uppercase tracking-widest mb-4">
                Brand Partnerships
              </p>
              <h2 className="text-4xl md:text-6xl font-thin text-white">
                Sponsorship at scale.
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                Partner with Kuwait's most prominent retail, dining, and lifestyle
                destination through branded experiences, high-visibility presence,
                and audience-facing activations across 12 districts.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {SPONSORSHIP_TIERS.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl p-8 hover:border-[#c9a96e]/20 transition flex flex-col"
                >
                  <h3
                    className="text-xl font-thin mb-1"
                    style={{ color: tier.color }}
                  >
                    {tier.tier}
                  </h3>
                  <div
                    className="w-8 h-px mt-4 mb-6"
                    style={{ backgroundColor: tier.color }}
                  />
                  <ul className="space-y-3 flex-1">
                    {tier.perks.map((perk, j) => (
                      <li
                        key={j}
                        className="flex gap-2 items-start text-gray-500 text-sm"
                      >
                        <span
                          className="mt-1 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: tier.color }}
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() =>
                      openModal(
                        `${tier.tier} Enquiry`,
                        "Our partnerships team will send you the full prospectus."
                      )
                    }
                    className="mt-8 w-full py-3 rounded-full text-sm border transition"
                    style={{ borderColor: tier.color, color: tier.color }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = tier.color;
                      e.currentTarget.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = tier.color;
                    }}
                  >
                    Enquire
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          10. FINAL CTA
      ══════════════════════════════════════ */}
      <Section id="contact">
        <div className="relative overflow-hidden">
          <BgVideo
            src="/videos/avenues.mp4"
            className="absolute w-full h-full object-cover opacity-30"
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black" />
          <div className="relative z-10 py-40 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#c9a96e] text-xs uppercase tracking-widest mb-6">
                The Opportunity
              </p>
              <h2 className="text-5xl md:text-7xl font-thin text-white max-w-3xl mx-auto leading-tight">
                Your brand belongs here.
              </h2>
              <p className="text-gray-400 mt-6 text-lg max-w-xl mx-auto">
                12 districts. 1,100+ stores. 360,000 m² of destination. Kuwait's
                defining retail and lifestyle address — award-winning, LEED-certified,
                and adjacent to Waldorf Astoria and Hilton Garden Inn.
              </p>
              <div className="flex gap-4 justify-center flex-wrap mt-12">
                <button
                  onClick={() => openModal(ctaLabel, ctaSubtitle)}
                  className="px-10 py-5 bg-[#c9a96e] text-black text-sm font-medium rounded-full hover:bg-[#b8924a] transition"
                >
                  {ctaLabel}
                </button>
                <a
                  href="#overview"
                  className="px-10 py-5 border border-white/30 text-white text-sm rounded-full hover:border-white transition"
                >
                  Explore Again ↑
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="bg-black border-t border-[#111] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[#c9a96e] text-xs uppercase tracking-widest mb-1">
              The Avenues Kuwait
            </div>
            <div className="text-gray-600 text-xs">
              Al Rai, Fifth Ring Road, Farwaniya Governorate, Kuwait
            </div>
            <div className="text-gray-600 text-xs mt-1">
              Developed and managed by Mabanee Company K.P.S.C.
            </div>
          </div>
          <div className="flex gap-6 text-xs text-gray-600 flex-wrap justify-center">
            {[
              "overview",
              "retail",
              "luxury",
              "dining",
              "attractions",
              "events",
              "leasing",
              "sponsorship",
              "contact",
            ].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="hover:text-white transition capitalize"
              >
                {s}
              </a>
            ))}
          </div>
          <div className="text-right">
            <div className="text-gray-700 text-xs">
              © {new Date().getFullYear()} The Avenues. All rights reserved.
            </div>
            <div className="text-gray-700 text-xs mt-1">
              Facts sourced from Mabanee official website and The Avenues Kuwait.
            </div>
          </div>
        </div>
        
      </footer>
    </main>
  );
}