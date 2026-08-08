export type Tournament = {
  id: string;
  index: string;
  title: string;
  organizer: string;
  status: string;
  image: string;
  prize: string;
  registrationFee: string;
  // Optional fields that may not be available yet
  teams?: string;
  format?: string;
  date?: string;
  registrationUrl?: string;
};

export const TOURNAMENTS: Tournament[] = [
  {
    id: "re-quantum-war-season-2",
    index: "01",
    title: "RE QUANTUM WAR — SEASON 2",
    organizer: "RUTHLESS ESPORTS",
    status: "REGISTRATION OPEN",
    image: "/Images/tournaments/quantum-war-season-2.jpg",
    prize: "₹20,000",
    registrationFee: "FREE REGISTRATION",
  },
  {
    id: "rbz-streamers-battle-2026",
    index: "02",
    title: "RBZ STREAMERS BATTLE — 2026",
    organizer: "RULEBREAKERZ",
    status: "REGISTRATION OPEN",
    image: "/Images/tournaments/rbz-streamers-battle-2026.jpg",
    prize: "₹10,000 + TROPHY",
    registrationFee: "REGISTRATION OPEN",
  },
];
