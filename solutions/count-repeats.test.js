import { createRequire } from "node:module";
import { describe, it } from "@jest/globals";
import countRepeats from "./count-repeats.js";

const require = createRequire(import.meta.url);

const Test = require("@codewars/test-compat");

describe("removeRepeats", function () {
  it("Should count repeats", function () {
    Test.assertEquals(countRepeats("AABCCD"), 2);
    Test.assertEquals(countRepeats("AABCCDA"), 2);
    Test.assertEquals(countRepeats("AaBBCCC"), 3);
  });
});
