export type TournamentScheduleItem = {
  stage: string;
  date: string | null;
  description?: string;
};

export type Tournament = {
  id: string;
  slug: string;
  index: string;
  title: string;
  shortName: string;
  organizer: string;
  organizerDescription?: string;
  organizerLogo?: string;
  organizerUrl?: string;
  status: string;
  image: string;
  banner?: string;
  prize: string;
  registrationFee: string;
  game: string;
  description?: string;
  // Optional fields
  teams?: string;
  format?: string;
  teamSize?: string;
  mode?: string;
  date?: string;
  location?: string;
  registrationDeadline?: string;
  registrationUrl?: string;
  schedule?: TournamentScheduleItem[];
  rules?: string[];
  eligibility?: string[];
  contact?: string;
};

export const TOURNAMENTS: Tournament[] = [
  {
    id: "re-quantum-war-season-2",
    slug: "quantum-war-season-2",
    index: "01",
    title: "RE QUANTUM WAR — SEASON 2",
    shortName: "QUANTUM WAR S2",
    organizer: "RUTHLESS ESPORTS",
    organizerDescription:
      "Ruthless Esports is one of Tamil Nadu's active Free Fire MAX competitive communities, organizing regular tournaments and scrims for the local scene.",
    status: "REGISTRATION OPEN",
    image: "/images/tournaments/quantum-war-season-2.jpg",
    prize: "₹20,000",
    registrationFee: "FREE REGISTRATION",
    game: "FREE FIRE MAX",
    description:
      "RE Quantum War Season 2 is an open-registration Free Fire MAX tournament hosted by Ruthless Esports. Compete against the best squads from Tamil Nadu for a prize pool of ₹20,000.",
    format: "SQUAD",
    teamSize: "4 + 1",
    mode: "BATTLE ROYALE",
  },
  {
    id: "rbz-streamers-battle-2026",
    slug: "rbz-streamers-battle-2026",
    index: "02",
    title: "RBZ STREAMERS BATTLE — 2026",
    shortName: "STREAMERS BATTLE",
    organizer: "RULEBREAKERZ",
    organizerDescription:
      "RuleBreakerzZ is a growing Tamil Nadu esports community focused on organizing competitive Free Fire MAX events and streamer showcases.",
    status: "REGISTRATION OPEN",
    image: "/images/tournaments/rbz-streamers-battle-2026.jpg",
    prize: "₹10,000 + TROPHY",
    registrationFee: "REGISTRATION OPEN",
    game: "FREE FIRE MAX",
    description:
      "RBZ Streamers Battle 2026 is a special competitive event featuring Tamil Nadu's top Free Fire MAX content creators and streamers competing for ₹10,000 and a trophy.",
    format: "SQUAD",
    teamSize: "4 + 1",
    mode: "BATTLE ROYALE",
  },
];
