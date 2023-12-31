const ZodiacSign = {
  Aries: { start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
  Taurus: { start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
  Gemini: { start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
  Cancer: { start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
  Leo: { start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
  Virgo: { start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
  Libra: { start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
  Scorpio: { start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
  Sagittarius: { start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
  Capricorn: { start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
  Aquarius: { start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
  Pisces: { start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
};

/**
 * Your task is to get Zodiac Sign using input `day` and `month`.
 *
 * For example:
 *
 * ```javascript getZodiacSign(1,5) => 'Taurus'
 * getZodiacSign(10,10) => 'Libra'
 * ```
 *
 * Correct answers are (preloaded):
 * ```javascript
 *
 * const signs = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini',
 * 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'];
 * ```
 * P.S. Each argument is correct integer number.
 *
 * WESTERN ASTROLOGY STAR SIGN DATES
 *
 * * Aries (March 21-April 19)
 * * Taurus (April 20-May 20)
 * * Gemini (May 21-June 20)
 * * Cancer (June 21-July 22)
 * * Leo (July 23-August 22)
 * * Virgo (August 23-September 22)
 * * Libra (September 23-October 22)
 * * Scorpio (October 23-November 21)
 * * Sagittarius (November 22-December 21)
 * * Capricorn (December 22-January 19)
 * * Aquarius (January 20 to February 18)
 * * Pisces (February 19 to March 20)
 *
 * @link https://www.codewars.com/kata/5a376259b6cfd77ca000006b/train/javascript
 * @param {number} day
 * @param {number} month
 * @returns {string}
 */
function getZodiacSign(day, month) {
  /** @type {keyof typeof ZodiacSign} */
  let sign;

  for (sign in ZodiacSign) {
    const { start, end } = ZodiacSign[sign];

    if (start.month === month) {
      if (day >= start.day) return sign;
    }

    if (end.month === month) {
      if (day <= end.day) return sign;
    }
  }

  return "";
}

export default getZodiacSign;
