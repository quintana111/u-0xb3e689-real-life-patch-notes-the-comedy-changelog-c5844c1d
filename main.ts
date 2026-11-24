import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY_LINE = "v3.1.0: fixed a bug where the brain replayed every embarrassing moment from 2009 at 3am instead of sleeping.";

// Guard: the brief requires one line of at most 160 characters —
// fail loudly instead of writing an invalid entry.
if (ENTRY_LINE.length > 160 || ENTRY_LINE.includes("\n")) {
  throw new Error(`Invalid entry: ${ENTRY_LINE.length} chars, must be one line of at most 160 characters.`);
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputPath = process.env.ENTRY_OUTPUT_PATH || join(scriptDir, "entry.txt");

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, ENTRY_LINE + "\n", "utf8");
console.log(`Wrote entry to ${outputPath}`);
