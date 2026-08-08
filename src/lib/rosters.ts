export type Player = {
  ign: string;
  slug: string;
  teamId: string;
  image: string | null;
  role: string | null;
  realName: string | null;
  region: string | null;
  social: {
    instagram: string | null;
    youtube: string | null;
    twitter: string | null;
    discord: string | null;
  };
  achievements: { title: string; tournament: string; year: string }[];
  tournamentHistory: { tournament: string; team: string; result: string; year: string }[];
  careerHistory: { year: string; team: string; role: string }[];
  joined: string | null;
  stats: {
    tournaments: number;
    wins: number;
    kills: number;
    matches: number;
  } | null;
};

export type Roster = {
  id: string;
  shortName: string;
  name: string;
  logo: string;
  status: string;
  players: Player[];
  region: string | null;
  founded: string | null;
  social: {
    instagram: string | null;
    youtube: string | null;
    twitter: string | null;
  };
};

const createPlayer = (ign: string, slug: string, teamId: string, image: string | null = null): Player => ({
  ign,
  slug,
  teamId,
  image,
  role: null,
  realName: null,
  region: null,
  social: {
    instagram: null,
    youtube: null,
    twitter: null,
    discord: null,
  },
  achievements: [],
  tournamentHistory: [],
  careerHistory: [],
  joined: null,
  stats: null,
});

export const ROSTERS: Roster[] = [
  {
    id: "pvs-gaming",
    shortName: "PVS",
    name: "PVS GAMING",
    logo: "/images/team_logo/pvs_gaming.png",
    status: "ACTIVE",
    region: null,
    founded: null,
    social: { instagram: null, youtube: null, twitter: null },
    players: [
      createPlayer("PVS.KHONSU", "pvs-khonsu", "pvs-gaming", "/images/pvs/khonsu.JPG"),
      createPlayer("PVS.YOGESH", "pvs-yogesh", "pvs-gaming", "/images/pvs/yogesh.jpeg"),
      createPlayer("PVS.NOBITA", "pvs-nobita", "pvs-gaming", "/images/pvs/nobita.jpeg"),
      createPlayer("PVS.SCRIPT", "pvs-script", "pvs-gaming", "/images/pvs/script.jpeg"),
      createPlayer("PVS.KRISH", "pvs-krish", "pvs-gaming", "/images/pvs/krish.jpeg"),
    ],
  },
  {
    id: "narikootam-gamerz",
    shortName: "NKG",
    name: "NARIKOOTAM GAMERZ",
    logo: "/images/team_logo/nkg_Esports.png",
    status: "ACTIVE",
    region: null,
    founded: null,
    social: { instagram: null, youtube: null, twitter: null },
    players: [
      createPlayer("NKG.ALEEM", "nkg-aleem", "narikootam-gamerz"),
      createPlayer("NKG.RAJESH", "nkg-rajesh", "narikootam-gamerz"),
      createPlayer("NKG.SCRIPT", "nkg-script", "narikootam-gamerz"),
      createPlayer("NKG.HYPER", "nkg-hyper", "narikootam-gamerz"),
      createPlayer("NKG.MANI", "nkg-mani", "narikootam-gamerz"),
    ],
  },
  {
    id: "ruthless-esports",
    shortName: "RE",
    name: "RUTHLESS ESPORTS",
    logo: "/images/team_logo/ruthless_esports.png",
    status: "ACTIVE",
    region: null,
    founded: null,
    social: { instagram: null, youtube: null, twitter: null },
    players: [
      createPlayer("RE.THAKU", "re-thaku", "ruthless-esports"),
      createPlayer("RE.KUTTY", "re-kutty", "ruthless-esports"),
      createPlayer("RE.AKILJR", "re-akiljr", "ruthless-esports"),
      createPlayer("RE.BELIKESR", "re-belikesr", "ruthless-esports"),
      createPlayer("RE.KS07", "re-ks07", "ruthless-esports"),
    ],
  },
  {
    id: "rk-esports",
    shortName: "RK",
    name: "RK ESPORTS",
    logo: "/images/team_logo/rk_esports.png",
    status: "ACTIVE",
    region: null,
    founded: null,
    social: { instagram: null, youtube: null, twitter: null },
    players: [
      createPlayer("RK.ODIN", "rk-odin", "rk-esports"),
      createPlayer("RK.FLASH", "rk-flash", "rk-esports"),
      createPlayer("RK.LIYON", "rk-liyon", "rk-esports"),
      createPlayer("RK.SINGAM", "rk-singam", "rk-esports"),
    ],
  },
];
