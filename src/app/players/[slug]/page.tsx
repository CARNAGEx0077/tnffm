import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
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
    return { title: "Player Not Found | TNFFM" };
  }

  return {
    title: `${targetPlayer.ign} | TNFFM`,
    description: `${targetPlayer.ign} player profile, current team ${teamName} and competitive history on TNFFM.`,
  };
}

export default async function PlayerProfilePage({ params }: PageProps) {
  const { slug } = await params;
  let player = null;
  let currentTeam = null;

  // Find player and their team
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
    player.social.instagram || player.social.youtube || player.social.twitter || player.social.discord;

  // Get current teammates (exclude the player themselves)
  const teammates = currentTeam.players.filter((p) => p.slug !== player.slug);

  // Get related players (just picking some other players from other teams as fallback if needed, but teammates is enough)
  let relatedPlayers = ROSTERS.flatMap((r) => r.players).filter((p) => p.slug !== player.slug && p.teamId !== currentTeam.id).slice(0, 4);

  return (
    <main className="relative min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          
          {/* Navigation */}
          <Link
            href="/players"
            className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase hover:text-white transition-colors mb-12"
          >
            <ArrowLeft size={14} />
            ALL PLAYERS
          </Link>

          {/* ═══════════════════════════════════════════ */}
          {/* HEADER                                     */}
          {/* ═══════════════════════════════════════════ */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24 mb-16 items-start">
            {/* Player Photo */}
            <div className="w-full md:w-[35%] aspect-[4/5] relative bg-white/[0.02] border border-white/5 rounded-sm overflow-hidden flex flex-col items-center justify-center shrink-0">
              {player.image ? (
                <Image
                  src={player.image}
                  alt={player.ign}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 35vw"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center text-center p-8">
                  <span className="text-6xl font-black text-white/5 tracking-tighter mb-4">
                    {currentTeam.shortName}
                  </span>
                  <span className="text-3xl font-bold text-white/20 uppercase tracking-widest">
                    {player.ign}
                  </span>
                </div>
              )}
            </div>

            {/* Player Details */}
            <div className="flex-1 pt-4 md:pt-10">
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-4 md:mb-6">
                {player.ign}
              </h1>
              
              <Link 
                href={`/rosters/${currentTeam.id}`}
                className="inline-block text-xl md:text-3xl font-bold tracking-tight text-white/50 uppercase mb-8 hover:text-primary transition-colors"
              >
                {currentTeam.name}
              </Link>
              
              <div className="block mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-bold tracking-widest text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  ACTIVE
                </div>
              </div>

              <div className="space-y-3">
                {player.role && (
                  <p className="text-lg md:text-xl font-bold text-white uppercase tracking-wide">
                    {player.role}
                  </p>
                )}
                {player.region && (
                  <p className="text-lg md:text-xl font-bold text-white uppercase tracking-wide">
                    {player.region}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* SNAPSHOT                                   */}
          {/* ═══════════════════════════════════════════ */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-8 border-y border-white/10 mb-16">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">CURRENT TEAM</p>
              <p className="text-sm font-bold text-white uppercase">{currentTeam.name}</p>
            </div>
            {player.role && (
              <div>
                <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">ROLE</p>
                <p className="text-sm font-bold text-white uppercase">{player.role}</p>
              </div>
            )}
            {player.region && (
              <div>
                <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">REGION</p>
                <p className="text-sm font-bold text-white uppercase">{player.region}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">STATUS</p>
              <p className="text-sm font-bold text-white uppercase">ACTIVE</p>
            </div>
            {player.joined && (
              <div>
                <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">PLAYER SINCE</p>
                <p className="text-sm font-bold text-white uppercase">{player.joined}</p>
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* CURRENT TEAM                               */}
          {/* ═══════════════════════════════════════════ */}
          <section className="mb-16">
            <h2 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-6">CURRENT TEAM</h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 md:py-8 px-6 md:px-10 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="flex items-center gap-6">
                <div className="relative w-16 h-16 shrink-0 bg-black/50 rounded-lg p-2 border border-white/5">
                  <Image
                    src={currentTeam.logo}
                    alt={currentTeam.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">{currentTeam.name}</h3>
                  <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mt-1">{currentTeam.shortName}</p>
                </div>
              </div>
              <Link
                href={`/rosters/${currentTeam.id}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/5 px-8 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-white/10 border border-white/5"
              >
                VIEW TEAM
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════ */}
          {/* CAREER HISTORY                             */}
          {/* ═══════════════════════════════════════════ */}
          {player.careerHistory && player.careerHistory.length > 0 && (
            <section className="py-12 border-t border-white/10">
              <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-10">CAREER HISTORY</h2>
              <div className="space-y-0 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                {player.careerHistory.map((item, idx) => (
                  <div key={idx} className="relative pl-10 py-6 border-b border-white/5 last:border-none">
                    <div className="absolute left-1 top-7 w-[22px] h-[22px] rounded-full bg-background border-2 border-white/10 flex items-center justify-center">
                      {idx === 0 ? (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-white/20" />
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase block mb-1">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">{item.team}</h3>
                      </div>
                      <span className="text-sm font-semibold tracking-wide text-white/50 uppercase">
                        {item.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* TOURNAMENT RECORD                          */}
          {/* ═══════════════════════════════════════════ */}
          {player.tournamentHistory && player.tournamentHistory.length > 0 && (
            <section className="py-12 border-t border-white/10">
              <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-10">TOURNAMENT RECORD</h2>
              <div className="overflow-x-auto pb-4">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-4 text-[10px] font-bold tracking-widest text-white/30 uppercase font-sans">Tournament</th>
                      <th className="pb-4 text-[10px] font-bold tracking-widest text-white/30 uppercase font-sans">Team</th>
                      <th className="pb-4 text-[10px] font-bold tracking-widest text-white/30 uppercase font-sans">Result</th>
                      <th className="pb-4 text-[10px] font-bold tracking-widest text-white/30 uppercase font-sans text-right">Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {player.tournamentHistory.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-5 pr-4 text-sm font-bold text-white uppercase">{item.tournament}</td>
                        <td className="py-5 pr-4 text-sm font-semibold text-white/60 uppercase">{item.team}</td>
                        <td className="py-5 pr-4 text-sm font-bold text-primary uppercase">{item.result}</td>
                        <td className="py-5 text-sm font-bold text-white/40 uppercase text-right">{item.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* ACHIEVEMENTS                               */}
          {/* ═══════════════════════════════════════════ */}
          {player.achievements && player.achievements.length > 0 && (
            <section className="py-12 border-t border-white/10">
              <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-10">ACHIEVEMENTS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {player.achievements.map((item, idx) => (
                  <div key={idx} className="flex flex-col p-6 bg-white/[0.02] border border-white/5 rounded-xl">
                    <span className="text-[10px] font-bold tracking-widest text-primary uppercase mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-white/50 uppercase">
                      {item.tournament}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* CURRENT TEAMMATES                          */}
          {/* ═══════════════════════════════════════════ */}
          {teammates && teammates.length > 0 && (
            <section className="py-12 border-t border-white/10">
              <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-10">CURRENT TEAMMATES</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {teammates.map((mate) => (
                  <Link
                    key={mate.ign}
                    href={`/players/${mate.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300"
                  >
                    {mate.image ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10">
                        <Image src={mate.image} alt={mate.ign} fill className="object-cover" sizes="48px" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-white/20">{mate.ign.substring(0, 2)}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white uppercase truncate group-hover:text-primary transition-colors">{mate.ign}</h4>
                      <p className="text-[9px] font-bold tracking-widest text-white/40 uppercase mt-0.5 truncate">{currentTeam.shortName}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* SOCIAL LINKS                               */}
          {/* ═══════════════════════════════════════════ */}
          {hasSocials && (
            <section className="py-12 border-t border-white/10">
              <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-10">SOCIAL LINKS</h2>
              <div className="flex flex-wrap gap-4">
                {player.social.instagram && (
                  <a href={player.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                    <span className="text-xs font-bold tracking-widest text-white uppercase">Instagram</span>
                    <ExternalLink size={12} className="text-white/40" />
                  </a>
                )}
                {player.social.youtube && (
                  <a href={player.social.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                    <span className="text-xs font-bold tracking-widest text-white uppercase">YouTube</span>
                    <ExternalLink size={12} className="text-white/40" />
                  </a>
                )}
                {player.social.twitter && (
                  <a href={player.social.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                    <span className="text-xs font-bold tracking-widest text-white uppercase">Twitter</span>
                    <ExternalLink size={12} className="text-white/40" />
                  </a>
                )}
                {player.social.discord && (
                  <a href={player.social.discord} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                    <span className="text-xs font-bold tracking-widest text-white uppercase">Discord</span>
                    <ExternalLink size={12} className="text-white/40" />
                  </a>
                )}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* EXPLORE MORE                               */}
          {/* ═══════════════════════════════════════════ */}
          {relatedPlayers && relatedPlayers.length > 0 && (
            <section className="py-12 md:py-20 border-t border-white/10 mt-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase block mb-2">DISCOVER</span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">MORE PLAYERS</h2>
                </div>
                <Link
                  href="/players"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-white/50 hover:text-white transition-colors uppercase"
                >
                  ALL PLAYERS
                  <ArrowRight size={14} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedPlayers.map((p) => (
                  <Link
                    key={p.ign}
                    href={`/players/${p.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/15 transition-all duration-300"
                  >
                    {p.image ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10">
                        <Image src={p.image} alt={p.ign} fill className="object-cover" sizes="48px" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-white/20">{p.ign.substring(0, 2)}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white uppercase truncate group-hover:text-primary transition-colors">{p.ign}</h4>
                      {/* Note: In a real app we'd look up the player's team name here, but we'll just show PLAYER for simplicity in the 'more players' widget */}
                      <p className="text-[9px] font-bold tracking-widest text-white/40 uppercase mt-0.5 truncate">PLAYER</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
          
        </div>
      </div>

      <Footer />
    </main>
  );
}
