export const filterTaskType = {
  ALL: 'all',
  FAIL: 'fail',
  SUCCESS: 'success',
} as const

export type FilterTaskType = `${(typeof filterTaskType)[keyof typeof filterTaskType]}_tasks`
