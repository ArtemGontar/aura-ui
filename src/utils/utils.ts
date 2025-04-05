
export const trimContent = (content: string, maxLength: number = 100): string => {
  return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content;
};

export const formatLocalizedDate = (dateString: string, locale: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};