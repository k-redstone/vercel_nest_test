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

type MatchTypeUnion = (typeof matchTypeKeys)[keyof typeof matchTypeKeys]

type TeamTypeUnion = (typeof teamTypeKeys)[keyof typeof teamTypeKeys]

type ValorantAgentUnion =
  (typeof valorantAgentKeys)[keyof typeof valorantAgentKeys]

export type { MatchTypeUnion, TeamTypeUnion, ValorantAgentUnion }
