// The Best Meal You Ever Had — entry program.
// Writes one sentence (<=200 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const SENTENCE =
  "The best meal I ever had was my grandmother's congee at 2 a.m., eaten standing in her kitchen while rain hit the windows and she pretended not to see me steal the crispy rice from the pot's edge.";

class MealSentence {
  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }

  get length(): number {
    return [...this.text].length;
  }

  get isOneSentence(): boolean {
    return this.text.indexOf("\n") === -1 && this.text.endsWith(".");
  }

  check(): void {
    if (this.length < 20 || this.length > 200) {
      throw new Error(`sentence is ${this.length} chars, outside the 20-200 gate`);
    }
    if (!this.isOneSentence) {
      throw new Error("entry must be a single sentence");
    }
  }

  save(): void {
    this.check();
    mkdirSync("/output", { recursive: true });
    writeFileSync("/output/entry.txt", this.text, "utf8");
  }
}

const meal = new MealSentence(SENTENCE);
meal.save();
console.log(`wrote ${meal.length} chars to /output/entry.txt`);
