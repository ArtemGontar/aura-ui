import { useCallback } from 'react';

type RequestInvoice = (invoiceSlug: string) => void;

export const useTelegramInvoice = (): { requestInvoice: RequestInvoice } => {
  const requestInvoice = useCallback((invoiceSlug: string) => {
    if (window.Telegram?.WebApp?.requestInvoice) {
      window.Telegram.WebApp.requestInvoice(invoiceSlug);
    } else {
      console.error('Telegram WebApp API is not available');
    }
  }, []);

  return { requestInvoice };
};
