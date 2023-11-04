export const INHALE_COLOR = '#0f5362'
export const EXHALE_COLOR = '#c08845'
export const RESET_ORANGE = '#f6786e'

export const LARGE_CIRCLE_SIZE = 6
export const SMALL_CIRCLE_SIZE = 2

export const SMOOTH_PATH_TIMING = 1000
export const BREATH_CURVE = 'cubic-bezier(.13,.38,.48,1.02)'

export const INHALE_SIZE = 8
export const EXHALE_SIZE = 4
export const DEFAULT_ACTION_TEXT = 'Breath Box'
export const DEFAULT_ACTION_FONT_SIZE = '5vh'

export interface ActionStyle {
  transitionDuration: string
  transitionTimingFunction: string
  fontSize: string
  color: string
}

export interface ConfigInput {
  breathDuration: number
  holdDuration: number
  inputMinutes: number
  inputSeconds: number
  ascending: boolean
  validTimeInput: boolean
  validBreathHoldInput: boolean
  validHoldInput: boolean
}

export interface ConfigSetters {
  setBreathDuration: React.Dispatch<React.SetStateAction<number>>
  setHoldDuration: React.Dispatch<React.SetStateAction<number>>
  setInputMinutes: React.Dispatch<React.SetStateAction<number>>
  setInputSeconds: React.Dispatch<React.SetStateAction<number>>
  setCountDirection: React.Dispatch<React.SetStateAction<boolean>>
}
