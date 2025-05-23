import WebApp from "@twa-dev/sdk";

/**
 * This object controls haptic feedback.
 */
export interface TelegramHaptics {
  /**
   * A method tells that an impact occurred.
   * @param style - the style of haptic impact.
   */
  impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void,
  /**
   * A method tells that a task or action has succeeded, failed, or produced a warning.
   * @param style - the action result style
   */
  notificationOccurred: (style: "error" | "success" | "warning") => void,
  /**
   * A method tells that the user has changed a selection.
   */
  selectionChanged: () => void,
}

/**
* This hook wraps the Telegram HapticFeedback object.
*/
export default function useTelegramHaptics(): TelegramHaptics {
  return {
      impactOccurred: WebApp.HapticFeedback.impactOccurred,
      notificationOccurred: WebApp.HapticFeedback.notificationOccurred,
      selectionChanged: WebApp.HapticFeedback.selectionChanged,
  };
}