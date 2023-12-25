/**
 * Complete the function/method so that it takes a `PascalCase` string and returns the string in
 * `snake_case` notation. Lowercase characters can be numbers. If the method gets a number as input,
 * it should return a string.
 *
 * @link https://www.codewars.com/kata/529b418d533b76924600085d/train/javascript
 * @example
 *
 * ```
 * "TestController"  -->  "test_controller"
 * "MoviesAndBooks"  -->  "movies_and_books"
 * "App7Test"        -->  "app7_test"
 * 1                 -->  "1"
 * ```
 *
 * @param {string | number} str
 * @returns {string}
 */
function toUnderscore(str) {
  const splitted = String(str).split(/(?=[A-Z])/g);

  return splitted.join("_").toLowerCase();
}

export default toUnderscore;
