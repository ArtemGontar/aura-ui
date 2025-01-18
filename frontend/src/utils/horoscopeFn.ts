export const getHoroscopeSign = (day: number, month: number): string => {
  const signs = [
    { sign: "Capricorn", start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
    { sign: "Aquarius", start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
    { sign: "Pisces", start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
    { sign: "Aries", start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
    { sign: "Taurus", start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
    { sign: "Gemini", start: { month: 5, day: 21 }, end: { month: 6, day: 21 } },
    { sign: "Cancer", start: { month: 6, day: 22 }, end: { month: 7, day: 22 } },
    { sign: "Leo", start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
    { sign: "Virgo", start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
    { sign: "Libra", start: { month: 9, day: 23 }, end: { month: 10, day: 23 } },
    { sign: "Scorpio", start: { month: 10, day: 24 }, end: { month: 11, day: 21 } },
    { sign: "Sagittarius", start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
  ];

  for (const { sign, start, end } of signs) {
    if (
      (month === start.month && day >= start.day) ||
      (month === end.month && day <= end.day) ||
      (month > start.month && month < end.month)
    ) {
      return sign;
    }
  }

  return "Unknown";
};