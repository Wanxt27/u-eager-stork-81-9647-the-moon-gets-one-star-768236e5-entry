// The Moon Gets One Star — a one-star review of the Moon, written to /output/entry.txt.
// Node 22, standard library only. Deterministic: the same single line every run.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// The review: one star, one grievance, one punchline. The Moon follows you
// home every night and then acts like a stranger by morning.
const REVIEW =
  "One star. It follows me home every night, then pretends not to know me in the morning.";

function check(text: string): void {
  if (text.length < 1 || text.length > 120) {
    throw new Error(`review must be 1-120 characters, got ${text.length}`);
  }
  if (text.trim() !== text || text.length === 0) {
    throw new Error("review must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("review must be exactly one line");
  }
  if (!text.startsWith("One star")) {
    throw new Error("review must open with its one-star rating");
  }
  if (/\s$/.test(text)) {
    throw new Error("review must not end with whitespace");
  }
  // The gate counts characters, but keep the byte size in the same range
  // so no multi-byte surprise can slip past the character check.
  const bytes = Buffer.byteLength(text, "utf8");
  if (bytes > 120) {
    throw new Error(`review must be at most 120 bytes, got ${bytes}`);
  }
}

check(REVIEW);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, REVIEW, "utf8");

// Read it back and confirm what landed on disk is exactly the review.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== REVIEW) {
  throw new Error("output on disk does not match the review");
}
check(written);
console.log(`wrote ${written.length} characters to ${OUT_FILE}`);
