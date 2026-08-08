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
  const team = ROSTERS.find((r) => r.id === slug);

  if (!team) {
    return {
      title: "Team Not Found | TNFFM",
    };
  }

  return {
    title: `${team.name} | TNFFM`,
    description: `${team.name} active roster and team information on Tamil Nadu Free Fire MAX.`,
  };
}

export default async function TeamProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const team = ROSTERS.find((r) => r.id === slug);

  if (!team) {
    notFound();
  }

  const hasSocials = team.social.instagram || team.social.youtube || team.social.twitter;

  return (
    <main className="relative min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/30 uppercase mb-12">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={12} className="text-white/20" />
            <Link href="/rosters" className="hover:text-white transition-colors">ROSTERS</Link>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-primary">{team.name}</span>
          </div>

          {/* Team Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 mb-20">
            <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0 bg-surface/50 rounded-3xl p-6 border border-white/5 shadow-2xl">
              <Image
                src={team.logo}
                alt={`${team.name} logo`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 128px, 192px"
                priority
              />
            </div>
            
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-bold tracking-widest text-green-400 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {team.status}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase mb-2">
                {team.name}
              </h1>
              <p className="text-xl font-bold tracking-widest text-white/30 uppercase">
                {team.shortName}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Column: Roster */}
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-8 flex items-center gap-4">
                CURRENT ROSTER
                <div className="h-[1px] flex-1 bg-white/10" />
              </h2>

              <div className="flex flex-col gap-0">
                {team.players.map((player, idx) => (
                  <Link
                    key={player.ign}
                    href={`/players/${player.slug}`}
                    className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors -mx-4 px-4 rounded-xl"
                  >
                    <div className="text-2xl font-black text-white/20 group-hover:text-white/40 transition-colors shrink-0 w-12">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    {player.image ? (
                      <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full overflow-hidden bg-surface/50 border border-white/10 group-hover:border-primary/50 transition-colors">
                        <Image
                          src={player.image}
                          alt={player.ign}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-colors">
                        <span className="text-xs font-bold text-white/20">{player.ign.slice(0, 2)}</span>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors tracking-wide uppercase">
                        {player.ign}
                      </h3>
                      <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mt-1">
                        PLAYER
                      </p>
                    </div>

                    <div className="hidden md:flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <ChevronRight size={18} className="text-white/50" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: Info */}
            <div className="lg:col-span-4 space-y-12">
              <div>
                <h3 className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-6">
                  TEAM INFORMATION
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Status</div>
                    <div className="text-sm font-semibold text-white uppercase">{team.status}</div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Active Players</div>
                    <div className="text-sm font-semibold text-white uppercase">{team.players.length}</div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Region</div>
                    <div className="text-sm font-semibold text-white uppercase">
                      {team.region || <span className="text-white/20">NOT AVAILABLE</span>}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Founded</div>
                    <div className="text-sm font-semibold text-white uppercase">
                      {team.founded || <span className="text-white/20">NOT AVAILABLE</span>}
                    </div>
                  </div>
                </div>
              </div>

              {hasSocials && (
                <div>
                  <h3 className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-6">
                    SOCIALS
                  </h3>
                  <div className="flex flex-col gap-3">
                    {team.social.instagram && (
                      <a href={team.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                        <span className="text-xs font-bold tracking-widest text-white uppercase">Instagram</span>
                        <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors" />
                      </a>
                    )}
                    {team.social.youtube && (
                      <a href={team.social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                        <span className="text-xs font-bold tracking-widest text-white uppercase">YouTube</span>
                        <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors" />
                      </a>
                    )}
                    {team.social.twitter && (
                      <a href={team.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                        <span className="text-xs font-bold tracking-widest text-white uppercase">Twitter</span>
                        <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
