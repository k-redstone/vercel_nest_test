export const changelogTypeKeys = {
  ADD: 'ADD',
  FIX: 'FIX',
} as const

type ChangelogTypeUnion =
  (typeof changelogTypeKeys)[keyof typeof changelogTypeKeys]

export type { ChangelogTypeUnion }
