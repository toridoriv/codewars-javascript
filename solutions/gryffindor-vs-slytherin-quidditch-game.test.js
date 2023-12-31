import { describe, it } from "@jest/globals";
import { createRequire } from "node:module";
import gameWinners from "./gryffindor-vs-slytherin-quidditch-game.js";

const require = createRequire(import.meta.url);
const Test = require("@codewars/test-compat");

describe("Tests", () => {
  it("test", () => {
    Test.assertEquals(gameWinners([100, "yes"], [100, "no"]), "Gryffindor wins!");
    Test.assertEquals(gameWinners([350, "no"], [250, "yes"]), "Slytherin wins!");
    Test.assertEquals(gameWinners([100, "yes"], [250, "no"]), "It's a draw!");
  });
});
