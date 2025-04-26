export const trimContent = (content: string, maxLength: number = 100): string => {
  return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content;
};

export const formatLocalizedDate = (dateString: string, locale: string): string => {
  const date = new Date(dateString);
  
  // Map language codes to full locale codes to ensure proper formatting
  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'ru': 'ru-RU',
    'be': 'be-BY', // Explicit Belarusian locale with country code
    'uk': 'uk-UA'
  };
  
  // Use the mapped locale or fallback to the original one
  const formattedLocale = localeMap[locale] || locale;
  
  try {
    return date.toLocaleDateString(formattedLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    // Fallback to a simpler format or English if the locale is not supported
    console.warn(`Date localization failed for locale ${formattedLocale}:`, error);
    return date.toLocaleDateString('en-US', {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};