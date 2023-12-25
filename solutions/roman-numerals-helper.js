/**
 * Write two functions that convert a roman numeral to and from an integer value. Multiple roman
 * numeral values will be tested for each function.
 *
 * Modern Roman numerals are written by expressing each digit separately starting with the left most
 * digit and skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M,
 * 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each
 * Roman symbol in descending order: MDCLXVI.
 *
 * Input range : `1 <= n < 4000`
 *
 * In this kata `4` should be represented as `IV`, NOT as `IIII` (the "watchmaker's four").
 *
 * @link https://www.codewars.com/kata/51b66044bce5799a7f000003/train/javascript
 * @example
 *
 * ```
 * to roman:
 * 2000 -> "MM"
 * 1666 -> "MDCLXVI"
 * 1000 -> "M"
 *  400 -> "CD"
 *   90 -> "XC"
 *   40 -> "XL"
 *    1 -> "I"
 *
 * from roman:
 * "MM"      -> 2000
 * "MDCLXVI" -> 1666
 * "M"       -> 1000
 * "CD"      -> 400
 * "XC"      -> 90
 * "XL"      -> 40
 * "I"       -> 1
 * ```
 *
 * ### Help
 *
 * | Symbol | Value |
 * |-------:|:------|
 * | I	  |  1    |
 * | IV  |  4    |
 * | V	  |  5    |
 * | X	  |  10   |
 * | L	  |  50   |
 * | C	  |  100  |
 * | D	  |  500  |
 * | M	  |  1000 |
 *
 */
class RomanNumerals {
  static numeralToNumber = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  static numberToNumeral = {
    1: "I",
    5: "V",
    10: "X",
    50: "L",
    100: "C",
    500: "D",
    1000: "M",
  };
  static pattern = /M{1,3}|D{1}|C{1,3}|L{1}|V{1}|V{1}|X{1,3}|I{1,3}/g;

  /**
   * @param {number[]} parts
   * @returns {number[]}
   */
  static $reduceDecomposeNumbers(parts) {
    if (parts.length < 4) return parts;

    const part = parts[0];

    if (parts.length === 4) {
      return [part, part * 5];
    }

    if (parts.length === 9) {
      return [part, part * 10];
    }

    return [part * 5, ...RomanNumerals.$reduceDecomposeNumbers(parts.slice(5))];
  }

  /**
   * @param {number} n
   * @returns {string}
   */
  static $toRomanDigit(n) {
    return RomanNumerals.numberToNumeral[n];
  }

  /**
   * @param {number} num
   * @returns {string}
   */
  static toRoman(num) {
    return decomposeNumber(num)
      .map(partitionIntoEqualParts)
      .map(RomanNumerals.$reduceDecomposeNumbers)
      .flat()
      .map(RomanNumerals.$toRomanDigit)
      .join("");
  }

  /**
   * @param {string} s
   * @returns {number}
   */
  static $fromRomanDigit(s) {
    return RomanNumerals.numeralToNumber[s];
  }

  /**
   * @param {string} str
   * @returns {number}
   */
  static fromRoman(str) {
    const digits = str
      .match(RomanNumerals.pattern)
      .map((v) => v.split(""))
      .map((v) => v.map(RomanNumerals.$fromRomanDigit))
      .flat()
      .reverse();
    const skip = [];
    let result = 0;

    for (let i = 0; i < digits.length; i++) {
      const prevIndex = i + 1;
      if (skip.includes(i)) continue;
      const prev = digits[prevIndex] || Infinity;
      const curr = digits[i];

      if (prev < curr) {
        result += curr - prev;
        skip.push(prevIndex);
        continue;
      }

      result += curr;
    }

    return result;
  }
}

/**
 * @param {number}   n
 * @param {number[]} [places=[]]
 * @param {number}   [factor=1]
 * @returns {number[]}
 */
function decomposeNumber(n, places = [], factor = 1) {
  if (n < 1) return places;

  const place = n % (10 * factor);

  places.unshift(place);

  return decomposeNumber(n - place, places, factor * 10);
}

/**
 * @param {number} n
 * @returns {number[]}
 */
function partitionIntoEqualParts(n) {
  const part = getEqualPart(n);
  const length = n / part;

  return Array.from({ length }, () => part);
}

/**
 * @param {number} n
 * @returns {number}
 */
function getEqualPart(n) {
  if (n < 10) return 1;

  const totalZeroes = Math.trunc(Math.log10(n));

  return Number("1" + "0".repeat(totalZeroes));
}

export default RomanNumerals;
