#!/usr/bin/env bun

import mustache from "mustache";
import fs from "node:fs";
import { CodeWarsKata } from "./helpers/challenge.js";

const challengeId = process.argv[2];

if (!challengeId) {
  console.error("❌ Please provide a valid challenge id.");
  process.exit(1);
}

const challengeTemplate = fs.readFileSync("./scripts/templates/challenge.mustache", "utf-8");
const testTemplate = fs.readFileSync("./scripts/templates/test.mustache", "utf-8");
const kata = new CodeWarsKata(challengeId);

await kata.init();

const challengePath = `./solutions/${kata.meta.slug}.js`;
const testPath = `./solutions/${kata.meta.slug}.test.js`;
const data = {
  description_parts: kata.meta.description
    .split("\n")
    .map((v) => (v.includes("Example") ? "@example" : v)),
  function_name: kata.getMainFunctionName(),
  filename: challengePath.replace("/solutions", ""),
  fixture: kata.session.exampleFixture,
  function: kata.session.setup,
  params: kata.getParams(),
  source: CodeWarsKata.client.baseUrl.origin + kata.endpoints.kata,
};

const challenge = mustache.render(challengeTemplate, data);
const test = mustache.render(testTemplate, data);

fs.writeFileSync(challengePath, challenge, "utf-8");
fs.writeFileSync(testPath, test, "utf-8");
