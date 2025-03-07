export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

export interface ThemeParams {
  bg_color: string
  text_color: string
  hint_color: string
  link_color: string
  button_color: string
  button_text_color: string
  secondary_bg_color: string
}

export interface LaunchParams {
  user: TelegramUser
  startParam?: string | null
  authDate?: string | null
  hash?: string | null
  colorScheme?: 'light' | 'dark'
  themeParams: ThemeParams
  viewportHeight?: number
  viewportStableHeight?: number
  isExpanded?: boolean
  platform?: string
}
