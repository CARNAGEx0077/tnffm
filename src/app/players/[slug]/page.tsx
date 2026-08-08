import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ROSTERS } from "@/lib/rosters";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let targetPlayer = null;
  let teamName = "";

  for (const roster of ROSTERS) {
    const p = roster.players.find((player) => player.slug === slug);
    if (p) {
      targetPlayer = p;
      teamName = roster.name;
      break;
    }
  }

  if (!targetPlayer) {
    return {
      title: "Player Not Found | TNFFM",
    };
  }

  return {
    title: `${targetPlayer.ign} | TNFFM`,
    description: `${targetPlayer.ign} player profile, current team and competitive history on TNFFM.`,
  };
}

export default async function PlayerProfilePage({ params }: PageProps) {
  const { slug } = await params;
  let player = null;
  let currentTeam = null;

  for (const roster of ROSTERS) {
    const p = roster.players.find((pl) => pl.slug === slug);
    if (p) {
      player = p;
      currentTeam = roster;
      break;
    }
  }

  if (!player || !currentTeam) {
    notFound();
  }

  const hasSocials =
    player.social.instagram || player.social.youtube || player.social.twitter;

  return (
    <main className="relative min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/30 uppercase mb-12">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <ChevronRight size={12} className="text-white/20" />
            <Link href="/players" className="hover:text-white transition-colors">
              PLAYERS
            </Link>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-primary">{player.ign}</span>
          </div>

          {/* Split Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-center">
            {/* Player Information (Left) */}
            <div className="flex flex-col order-2 lg:order-1">
              <div className="mb-4">
                <span className="text-xs font-bold tracking-widest text-white/50 uppercase">
                  PLAYER
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-8">
                {player.ign}
              </h1>

              {/* Status */}
              <div className="inline-flex items-center gap-2 mb-10 w-fit px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-bold tracking-widest text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                ACTIVE
              </div>

              {/* Core Info Grid */}
              <div className="grid grid-cols-2 gap-y-8 gap-x-12 border-t border-white/10 pt-8">
                <div>
                  <h3 className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">
                    CURRENT TEAM
                  </h3>
                  <Link
                    href={`/rosters/${currentTeam.id}`}
                    className="text-sm font-semibold text-white uppercase hover:text-primary transition-colors flex items-center gap-2"
                  >
                    {currentTeam.name}
                    <ChevronRight size={14} className="text-white/30" />
                  </Link>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">
                    TEAM TAG
                  </h3>
                  <p className="text-sm font-semibold text-white uppercase">
                    {currentTeam.shortName}
                  </p>
                </div>

                {player.role && (
                  <div>
                    <h3 className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">
                      ROLE
                    </h3>
                    <p className="text-sm font-semibold text-white uppercase">
                      {player.role}
                    </p>
                  </div>
                )}

                {player.region && (
                  <div>
                    <h3 className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">
                      REGION
                    </h3>
                    <p className="text-sm font-semibold text-white uppercase">
                      {player.region}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Player Image (Right) */}
            <div className="order-1 lg:order-2 w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] relative bg-surface/30 rounded-3xl overflow-hidden border border-white/5 flex flex-col items-center justify-center">
              {player.image ? (
                <Image
                  src={player.image}
                  alt={player.ign}
                  fill
                  className="object-cover md:object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center text-center p-8">
                  <span className="text-6xl font-black text-white/5 tracking-tighter mb-4">
                    {currentTeam.shortName}
                  </span>
                  <span className="text-3xl font-bold text-white/20 uppercase tracking-widest mb-2">
                    {player.ign}
                  </span>
                  <div className="w-12 h-1 bg-primary/20 mb-6" />
                  <span className="text-xs font-bold text-white/10 uppercase tracking-widest">
                    PLAYER PROFILE
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-20">
              {/* Current Team Block */}
              <section>
                <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-8 flex items-center gap-4">
                  CURRENT TEAM
                  <div className="h-[1px] flex-1 bg-white/10" />
                </h2>
                <Link
                  href={`/rosters/${currentTeam.id}`}
                  className="group flex items-center gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="relative w-20 h-20 shrink-0 bg-black/50 rounded-xl p-3 border border-white/5">
                    <Image
                      src={currentTeam.logo}
                      alt={currentTeam.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-white uppercase group-hover:text-primary transition-colors">
                      {currentTeam.name}
                    </h3>
                    <p className="text-xs font-bold tracking-widest text-white/40 uppercase mt-1">
                      {currentTeam.shortName}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest text-white/40 uppercase group-hover:text-white transition-colors">
                    VIEW TEAM
                    <ChevronRight size={16} />
                  </div>
                </Link>
              </section>

              {/* Tournament History */}
              <section>
                <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-8 flex items-center gap-4">
                  TOURNAMENT HISTORY
                  <div className="h-[1px] flex-1 bg-white/10" />
                </h2>
                {player.tournamentHistory && player.tournamentHistory.length > 0 ? (
                  <div className="space-y-4">
                    {/* Prepare for actual rendering when data exists */}
                  </div>
                ) : (
                  <div className="py-12 px-8 rounded-2xl border border-white/5 bg-white/[0.01] text-center">
                    <p className="text-sm font-semibold tracking-wide text-white/40 uppercase">
                      No tournament history available yet.
                    </p>
                  </div>
                )}
              </section>

              {/* Achievements */}
              <section>
                <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-8 flex items-center gap-4">
                  ACHIEVEMENTS
                  <div className="h-[1px] flex-1 bg-white/10" />
                </h2>
                {player.achievements && player.achievements.length > 0 ? (
                  <div className="space-y-4">
                    {/* Prepare for actual rendering when data exists */}
                  </div>
                ) : (
                  <div className="py-12 px-8 rounded-2xl border border-white/5 bg-white/[0.01] text-center">
                    <p className="text-sm font-semibold tracking-wide text-white/40 uppercase">
                      No achievements recorded yet.
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-12">
              {/* Career Summary */}
              <section>
                <h3 className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-6">
                  CAREER SUMMARY
                </h3>
                <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                  {/* Current Team Item */}
                  <div className="relative pl-10">
                    <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                    <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">
                      CURRENT
                    </div>
                    <div className="text-sm font-semibold text-white uppercase">
                      {currentTeam.name}
                    </div>
                  </div>
                </div>
              </section>

              {/* Player Stats (Hidden unless populated) */}
              {player.stats && (
                <section>
                  <h3 className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-6">
                    STATISTICS
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">WINS</div>
                      <div className="text-2xl font-black text-white">{player.stats.wins}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">KILLS</div>
                      <div className="text-2xl font-black text-white">{player.stats.kills}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">TOURNAMENTS</div>
                      <div className="text-2xl font-black text-white">{player.stats.tournaments}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">MATCHES</div>
                      <div className="text-2xl font-black text-white">{player.stats.matches}</div>
                    </div>
                  </div>
                </section>
              )}

              {/* Socials */}
              {hasSocials && (
                <section>
                  <h3 className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-6">
                    SOCIAL MEDIA
                  </h3>
                  <div className="flex flex-col gap-3">
                    {player.social.instagram && (
                      <a href={player.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                        <span className="text-xs font-bold tracking-widest text-white uppercase">Instagram</span>
                        <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors" />
                      </a>
                    )}
                    {player.social.youtube && (
                      <a href={player.social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                        <span className="text-xs font-bold tracking-widest text-white uppercase">YouTube</span>
                        <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors" />
                      </a>
                    )}
                    {player.social.twitter && (
                      <a href={player.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                        <span className="text-xs font-bold tracking-widest text-white uppercase">Twitter</span>
                        <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors" />
                      </a>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
