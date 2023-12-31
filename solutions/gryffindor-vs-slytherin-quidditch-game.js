/** @typedef {"yes" | "no"} YesNo */

/** @typedef {[number, YesNo]} QuidditchResult */

const result = {
  gryffindor: "Gryffindor wins!",
  slytherin: "Slytherin wins!",
  tie: "It's a draw!",
};

/**
 * @param {number | YesNo} value
 * @returns {number}
 */
function replaceWithSnitchPoints(value) {
  if (typeof value === "number") return value;

  return value === "yes" ? 150 : 0;
}

/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function sum(x, y) {
  return x + y;
}

/**
 * It's the most hotly anticipated game of the school year - Gryffindor vs Slytherin! Write a
 * function which returns the winning team.
 *
 * You will be given two arrays with two values.
 *
 * The first given value is the number of points scored by the team's Chasers and the second a
 * string with a 'yes' or 'no' value if the team caught the golden snitch!
 *
 * The team who catches the snitch wins their team an extra 150 points - but doesn't always win them
 * the game.
 *
 * ```javascript gameWinners([150, 'yes'],[200, 'no']) //'Gryffindor wins!'
 * gameWinners([400, 'no'],[350, 'yes']) //'Slytherin wins!'
 * ```
 *
 * If the score is a tie return "It's a draw!""
 *
 * ** The game only ends when someone catches the golden snitch, so one array will always include
 * 'yes' or 'no.' Points scored by Chasers can be any positive integer.
 *
 * @link https://www.codewars.com/kata/5840946ea3d4c78e90000068/train/javascript
 * @param {QuidditchResult} gryffindor
 * @param {QuidditchResult} slytherin
 * @returns {string}
 */
function gameWinners(gryffindor, slytherin) {
  const gryffindorTotal = gryffindor.map(replaceWithSnitchPoints).reduce(sum, 0);
  const slytherinTotal = slytherin.map(replaceWithSnitchPoints).reduce(sum, 0);

  if (gryffindorTotal === slytherinTotal) return result.tie;

  return gryffindorTotal > slytherinTotal ? result.gryffindor : result.slytherin;
}

export default gameWinners;
