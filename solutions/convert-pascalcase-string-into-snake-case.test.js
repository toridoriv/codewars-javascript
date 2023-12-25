import { describe, it } from "@jest/globals";
import { createRequire } from "node:module";
import toUnderscore from "./convert-pascalcase-string-into-snake-case.js";

const require = createRequire(import.meta.url);

const Test = require("@codewars/test-compat");

describe("toUnderscore", function () {
  it("Should convert to snake case", function () {
    Test.assertEquals(toUnderscore("TestController"), "test_controller");
    Test.assertEquals(toUnderscore("MoviesAndBooks"), "movies_and_books");
    Test.assertEquals(toUnderscore("App7Test"), "app7_test");
    Test.assertEquals(toUnderscore(1), "1");
  });
});
