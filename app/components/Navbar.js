"use client";

const links = [
  { href: "#overview", label: "Overview" },
  { href: "#why", label: "Why This Property" },
  { href: "#retail", label: "Retail" },
  { href: "#luxury", label: "Luxury" },
  { href: "#dining", label: "Dining" },
  { href: "#attractions", label: "Attractions" },
  { href: "#events", label: "Events" },
  { href: "#leasing", label: "Leasing" },
  { href: "#sponsorship", label: "Sponsorship" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#overview"
          className="text-sm md:text-base font-medium tracking-[0.22em] uppercase text-[#c9a96e] hover:text-white transition"
        >
          The Avenues
        </a>

        <nav className="hidden xl:flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-white/70">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full border border-[#c9a96e]/50 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[#c9a96e] transition hover:bg-[#c9a96e] hover:text-black"
        >
          Enquire
        </a>
      </div>
    </header>
  );
}