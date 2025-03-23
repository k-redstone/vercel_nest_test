export const matchTypeKeys = {
  PARTY: 'PARTY',
  CUSTOM: 'CUSTOM',
} as const

export const teamTypeKeys = {
  RED: 'RED',
  BLUE: 'BLUE',
}

export const valorantAgentKeys = {
  Brimstone: 'Brimstone',
  Viper: 'Viper',
  Omen: 'Omen',
  Killjoy: 'Killjoy',
  Cypher: 'Cypher',
  Sova: 'Sova',
  Sage: 'Sage',
  Phoenix: 'Phoenix',
  Jett: 'Jett',
  Reyna: 'Reyna',
  Raze: 'Raze',
  Breach: 'Breach',
  Skye: 'Skye',
  Yoru: 'Yoru',
  Astra: 'Astra',
  KAYO: 'KAYO',
  Chamber: 'Chamber',
  Neon: 'Neon',
  Fade: 'Fade',
  Harbor: 'Harbor',
  Gekko: 'Gekko',
  Deadlock: 'Deadlock',
  Iso: 'Iso',
  Clove: 'Clove',
  Vyse: 'Vyse',
  Tejo: 'Tejo',
  Waylay: 'Waylay',
}

export const valorantTierKeys = {
  Ascendant_1: 'Ascendant_1',
  Ascendant_2: 'Ascendant_2',
  Ascendant_3: 'Ascendant_3',
  Bronze_1: 'Bronze_1',
  Bronze_2: 'Bronze_2',
  Bronze_3: 'Bronze_3',
  Diamond_1: 'Diamond_1',
  Diamond_2: 'Diamond_2',
  Diamond_3: 'Diamond_3',
  Gold_1: 'Gold_1',
  Gold_2: 'Gold_2',
  Gold_3: 'Gold_3',
  Immortal_1: 'Immortal_1',
  Immortal_2: 'Immortal_2',
  Immortal_3: 'Immortal_3',
  Iron_1: 'Iron_1',
  Iron_2: 'Iron_2',
  Iron_3: 'Iron_3',
  Platinum_1: 'Platinum_1',
  Platinum_2: 'Platinum_2',
  Platinum_3: 'Platinum_3',
  Silver_1: 'Silver_1',
  Silver_2: 'Silver_2',
  Silver_3: 'Silver_3',
  Radiant: 'Radiant',
  UnRank: 'UnRank',
}

export const valorantMapKeys = {
  Ascent: 'Ascent',
  Fracture: 'Fracture',
  Haven: 'Haven',
  Icebox: 'Icebox',
  Lotus: 'Lotus',
  Pearl: 'Pearl',
  Split: 'Split',
  Abyss: 'Abyss',
  Bind: 'Bind',
  Breeze: 'Breeze',
  Range: 'Range',
  Sunset: 'Sunset',
}

type MatchTypeUnion = (typeof matchTypeKeys)[keyof typeof matchTypeKeys]

type TeamTypeUnion = (typeof teamTypeKeys)[keyof typeof teamTypeKeys]

type ValorantAgentUnion =
  (typeof valorantAgentKeys)[keyof typeof valorantAgentKeys]

type ValorantTierUnion =
  (typeof valorantTierKeys)[keyof typeof valorantTierKeys]

type ValorantMapUnion = (typeof valorantMapKeys)[keyof typeof valorantMapKeys]

export type {
  MatchTypeUnion,
  TeamTypeUnion,
  ValorantAgentUnion,
  ValorantTierUnion,
  ValorantMapUnion,
}
