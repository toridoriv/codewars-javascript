import { describe, it } from "@jest/globals";
import { createRequire } from "node:module";
import getZodiacSign from "./get-zodiac-sign.js";

const require = createRequire(import.meta.url);
const Test = require("@codewars/test-compat");

describe("Basic tests", () => {
  it("sample tests", () => {
    Test.assertEquals(getZodiacSign(10, 10), "Libra");
    Test.assertEquals(getZodiacSign(1, 5), "Taurus");
    Test.assertEquals(getZodiacSign(6, 9), "Virgo");
    Test.assertEquals(getZodiacSign(25, 11), "Sagittarius");
  });

  it("random tests", () => {
    Test.assertEquals(getZodiacSign(5, 1), "Capricorn");
    Test.assertEquals(getZodiacSign(6, 1), "Capricorn");
  });
});
