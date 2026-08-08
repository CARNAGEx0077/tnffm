import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight, ExternalLink, Calendar, Trophy, Gamepad2, Users, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TOURNAMENTS } from "@/lib/tournaments";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tournament = TOURNAMENTS.find((t) => t.slug === slug);

  if (!tournament) {
    return { title: "Tournament Not Found | TNFFM" };
  }

  return {
    title: `${tournament.title} | TNFFM`,
    description: tournament.description || `${tournament.title} — hosted by ${tournament.organizer} on TNFFM.`,
  };
}

export default async function TournamentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tournament = TOURNAMENTS.find((t) => t.slug === slug);

  if (!tournament) {
    notFound();
  }

  // Get related tournaments (exclude current)
  const relatedTournaments = TOURNAMENTS.filter((t) => t.slug !== slug).slice(0, 3);

  // Info bar items
  const infoItems = [
    tournament.date && { label: "DATE", value: tournament.date, icon: Calendar },
    { label: "PRIZE POOL", value: tournament.prize, icon: Trophy },
    { label: "GAME", value: tournament.game, icon: Gamepad2 },
    tournament.format && { label: "FORMAT", value: tournament.format, icon: Users },
    tournament.teamSize && { label: "TEAM SIZE", value: tournament.teamSize, icon: Users },
  ].filter(Boolean) as { label: string; value: string; icon: React.ComponentType<{ size?: number; className?: string }> }[];

  return (
    <main className="relative min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* ═══════════════════════════════════════════ */}
      {/* HERO                                       */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background Artwork */}
        <div className="absolute inset-0">
          <Image
            src={tournament.banner || tournament.image}
            alt={tournament.title}
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 pb-16 md:pb-20 pt-40">
          {/* Back Link */}
          <Link
            href="/tournaments"
            className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase hover:text-white transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            ALL TOURNAMENTS
          </Link>

          {/* Status */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
              {tournament.status}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[0.95] mb-6 max-w-4xl">
            {tournament.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10">
            <p className="text-sm font-semibold tracking-wide text-white/50 uppercase">
              HOSTED BY {tournament.organizer}
            </p>
            {tournament.date && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                <p className="text-sm font-semibold tracking-wide text-white/50 uppercase">
                  {tournament.date}
                </p>
              </>
            )}
          </div>

          {/* Prize + Register */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">PRIZE POOL</p>
              <p className="text-3xl md:text-4xl font-black text-white">{tournament.prize}</p>
            </div>
            {tournament.registrationUrl ? (
              <a
                href={tournament.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-primary px-10 text-sm font-bold tracking-widest text-white uppercase transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,59,48,0.3)]"
              >
                REGISTER NOW
                <ExternalLink size={16} />
              </a>
            ) : (
              <div className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white/5 border border-white/10 px-10 text-sm font-bold tracking-widest text-white/30 uppercase cursor-default">
                REGISTRATION LINK COMING SOON
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* QUICK INFO BAR                             */}
      {/* ═══════════════════════════════════════════ */}
      <section className="border-y border-white/10 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {infoItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="py-6 md:py-8 px-4 md:px-6 flex items-center gap-4">
                  <Icon size={20} className="text-white/20 shrink-0" />
                  <div>
                    <p className="text-[9px] font-bold tracking-widest text-white/30 uppercase mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-white uppercase">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* MAIN CONTENT                               */}
      {/* ═══════════════════════════════════════════ */}
      <div className="flex-grow">
        <div className="container mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left Column — Primary Content */}
            <div className="lg:col-span-7 space-y-20">

              {/* About */}
              {tournament.description && (
                <section>
                  <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-8 flex items-center gap-4">
                    ABOUT THE TOURNAMENT
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </h2>
                  <p className="text-lg text-white/60 font-medium leading-[1.8]">
                    {tournament.description}
                  </p>
                </section>
              )}

              {/* Schedule */}
              {tournament.schedule && tournament.schedule.length > 0 && (
                <section>
                  <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-8 flex items-center gap-4">
                    TOURNAMENT SCHEDULE
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </h2>
                  <div className="space-y-0 relative before:absolute before:left-[11px] before:top-3 before:bottom-3 before:w-[1px] before:bg-white/10">
                    {tournament.schedule.map((item, idx) => (
                      <div key={idx} className="relative pl-10 py-5 border-b border-white/5 last:border-none">
                        <div className="absolute left-1 top-6 w-[22px] h-[22px] rounded-full bg-surface border-2 border-white/10 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                          <h3 className="text-base font-bold text-white uppercase tracking-wide">{item.stage}</h3>
                          <span className="text-xs font-bold tracking-widest text-white/30 uppercase">
                            {item.date || "TBA"}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-sm text-white/40 mt-2">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Format & Rules */}
              {(tournament.format || tournament.mode || (tournament.rules && tournament.rules.length > 0)) && (
                <section>
                  <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-8 flex items-center gap-4">
                    FORMAT & RULES
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </h2>

                  {/* Format details */}
                  {(tournament.format || tournament.mode || tournament.teamSize) && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                      {tournament.format && (
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-bold tracking-widest text-white/30 uppercase mb-2">FORMAT</p>
                          <p className="text-base font-bold text-white uppercase">{tournament.format}</p>
                        </div>
                      )}
                      {tournament.mode && (
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-bold tracking-widest text-white/30 uppercase mb-2">MODE</p>
                          <p className="text-base font-bold text-white uppercase">{tournament.mode}</p>
                        </div>
                      )}
                      {tournament.teamSize && (
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-bold tracking-widest text-white/30 uppercase mb-2">TEAM SIZE</p>
                          <p className="text-base font-bold text-white uppercase">{tournament.teamSize}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Rules */}
                  {tournament.rules && tournament.rules.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold tracking-widest text-white/50 uppercase mb-4">RULES</h3>
                      <ul className="space-y-3">
                        {tournament.rules.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-white/50 font-medium">
                            <span className="text-[10px] font-mono font-bold text-white/20 pt-0.5 shrink-0">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {/* Eligibility */}
              {tournament.eligibility && tournament.eligibility.length > 0 && (
                <section>
                  <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-8 flex items-center gap-4">
                    ELIGIBILITY
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </h2>
                  <ul className="space-y-3">
                    {tournament.eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white/50 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Right Column — Sidebar */}
            <div className="lg:col-span-5 space-y-12">

              {/* Registration Card */}
              <section className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 md:p-10">
                <h3 className="text-xs font-bold tracking-widest text-white/50 uppercase mb-6">REGISTRATION</h3>

                <div className="space-y-5 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">STATUS</span>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs font-bold tracking-widest text-primary uppercase">{tournament.status}</span>
                    </div>
                  </div>
                  <div className="h-[1px] bg-white/5" />
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">FEE</span>
                    <span className="text-sm font-bold text-white uppercase">{tournament.registrationFee}</span>
                  </div>
                  {tournament.registrationDeadline && (
                    <>
                      <div className="h-[1px] bg-white/5" />
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">DEADLINE</span>
                        <span className="text-sm font-bold text-white uppercase">{tournament.registrationDeadline}</span>
                      </div>
                    </>
                  )}
                </div>

                {tournament.registrationUrl ? (
                  <a
                    href={tournament.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-primary text-sm font-bold tracking-widest text-white uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,59,48,0.3)]"
                  >
                    REGISTER NOW
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <div className="w-full text-center py-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-xs font-bold tracking-widest text-white/30 uppercase">
                      Registration link will be available soon
                    </p>
                  </div>
                )}
              </section>

              {/* Organizer */}
              <section className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 md:p-10">
                <h3 className="text-xs font-bold tracking-widest text-white/50 uppercase mb-6">ORGANIZER</h3>

                <div className="flex items-center gap-4 mb-6">
                  {tournament.organizerLogo && (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-surface border border-white/5 shrink-0">
                      <Image
                        src={tournament.organizerLogo}
                        alt={tournament.organizer}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tight">{tournament.organizer}</h4>
                    {tournament.game && (
                      <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mt-1">{tournament.game}</p>
                    )}
                  </div>
                </div>

                {tournament.organizerDescription && (
                  <p className="text-sm text-white/40 font-medium leading-relaxed mb-6">
                    {tournament.organizerDescription}
                  </p>
                )}

                {tournament.organizerUrl && (
                  <a
                    href={tournament.organizerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-white/50 hover:text-white transition-colors uppercase"
                  >
                    VISIT COMMUNITY
                    <ExternalLink size={14} />
                  </a>
                )}

                {tournament.contact && (
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">CONTACT</p>
                    <p className="text-sm font-semibold text-white/60">{tournament.contact}</p>
                  </div>
                )}
              </section>

              {/* Tournament Poster */}
              <section className="rounded-3xl overflow-hidden border border-white/5">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={tournament.image}
                    alt={`${tournament.title} poster`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* MORE TOURNAMENTS                           */}
        {/* ═══════════════════════════════════════════ */}
        {relatedTournaments.length > 0 && (
          <section className="border-t border-white/10 py-20 md:py-24">
            <div className="container mx-auto px-6 md:px-12">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase block mb-3">EXPLORE MORE</span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
                    MORE TOURNAMENTS
                  </h2>
                </div>
                <Link
                  href="/tournaments"
                  className="hidden md:inline-flex items-center gap-2 text-xs font-bold tracking-widest text-white/50 hover:text-white transition-colors uppercase"
                >
                  VIEW ALL
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTournaments.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tournaments/${t.slug}`}
                    className="group relative rounded-2xl overflow-hidden bg-[#111111] border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={t.image}
                        alt={t.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                      {/* Status */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] font-bold tracking-widest text-primary uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        {t.status}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                        {t.title}
                      </h3>
                      <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-4">
                        BY {t.organizer}
                      </p>
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-[9px] font-bold tracking-widest text-white/20 uppercase">PRIZE</p>
                          <p className="text-sm font-bold text-white">{t.prize}</p>
                        </div>
                        {t.format && (
                          <div>
                            <p className="text-[9px] font-bold tracking-widest text-white/20 uppercase">FORMAT</p>
                            <p className="text-sm font-bold text-white">{t.format}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </Link>
                ))}
              </div>

              {/* Mobile link */}
              <div className="mt-10 flex justify-center md:hidden">
                <Link
                  href="/tournaments"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-white/50 hover:text-white transition-colors uppercase"
                >
                  VIEW ALL TOURNAMENTS
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
