export const getHoroscopeSign = (day: number, month: number): string => {
  const signs = [
    { sign: "Capricorn", start: { month: 1, day: 20 }, end: { month: 2, day: 16 } },
    { sign: "Aquarius", start: { month: 2, day: 17 }, end: { month: 3, day: 11 } },
    { sign: "Pisces", start: { month: 3, day: 12 }, end: { month: 4, day: 18 } },
    { sign: "Aries", start: { month: 4, day: 19 }, end: { month: 5, day: 13 } },
    { sign: "Taurus", start: { month: 5, day: 14 }, end: { month: 6, day: 19 } },
    { sign: "Gemini", start: { month: 6, day: 20 }, end: { month: 7, day: 20 } },
    { sign: "Cancer", start: { month: 7, day: 21 }, end: { month: 8, day: 9 } },
    { sign: "Leo", start: { month: 8, day: 10 }, end: { month: 9, day: 15 } },
    { sign: "Virgo", start: { month: 9, day: 16 }, end: { month: 10, day: 30 } },
    { sign: "Libra", start: { month: 10, day: 31 }, end: { month: 11, day: 22 } },
    { sign: "Scorpio", start: { month: 11, day: 23 }, end: { month: 11, day: 29 } },
    { sign: "Ophiuchus", start: { month: 11, day: 30 }, end: { month: 12, day: 17 } },
    { sign: "Sagittarius", start: { month: 12, day: 18 }, end: { month: 1, day: 19 } },
  ];

  const date = new Date(2000, month - 1, day); // Year is arbitrary, only month and day matter

  for (const { sign, start, end } of signs) {
    const startDate = new Date(2000, start.month - 1, start.day);
    const endDate = new Date(2000, end.month - 1, end.day);

    if (date >= startDate && date <= endDate) {
      return sign;
    }
  }

  return "Unknown";
};