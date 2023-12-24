/**
 * Write a function that returns the count of characters that have to be removed in order to get a
 * string with no consecutive repeats.
 *
 * *Note:* This includes any characters.
 *
 * @link https://www.codewars.com/kata/598ee7b6ec6cb90dd6000061/train/javascript
 * @example
 *
 * ```python
 * 'abbbbc'  => 'abc'    #  answer: 3
 * 'abbcca'  => 'abca'   #  answer: 2
 * 'ab cca'  => 'ab ca'  #  answer: 1
 * ```
 *
 * @param {string} str
 * @returns {number}
 */
function countRepeats(str) {
  const chars = str.split("");
  let total = 0;

  for (let i = 0; i < chars.length; i++) {
    const prev = chars[i - 1];
    const curr = chars[i];

    if (curr === prev) {
      total += 1;
    }
  }

  return total;
}

export default countRepeats;
