// ─────────────────────────────────────────────────────────
// CURRICULUM DATA — Grades 1–12, Math & Reading
// ─────────────────────────────────────────────────────────

export const GRADE_DATA = {
  1:  {
    math: ["Addition within 20","Subtraction within 20","Counting & Place Value","Basic Shapes","Comparing Numbers"],
    reading: ["Phonics & Decoding","Sight Words","Story Comprehension","Vocabulary","Sequencing"]
  },
  2:  {
    math: ["Addition within 100","Subtraction within 100","Place Value","Telling Time","Multiplication Intro"],
    reading: ["Reading Comprehension","Vocabulary & Context Clues","Characters & Setting","Cause & Effect","Author's Purpose"]
  },
  3:  {
    math: ["Multiplication ×1–×10","Division Basics","Fractions","Area & Perimeter","Rounding Numbers"],
    reading: ["Story Elements","Vocabulary Building","Inference & Prediction","Non-fiction Comprehension","Point of View"]
  },
  4:  {
    math: ["Multi-digit Multiplication","Long Division","Equivalent Fractions","Decimal Intro","Factors & Multiples"],
    reading: ["Figurative Language","Author's Craft","Summarizing","Compare & Contrast","Informational Text"]
  },
  5:  {
    math: ["Fraction Operations","Decimal Operations","Volume","Coordinate Plane","Order of Operations"],
    reading: ["Literary Analysis","Theme & Moral","Author's Purpose","Text Structure","Drawing Conclusions"]
  },
  6:  {
    math: ["Ratios & Proportions","Percent","Integer Operations","Expressions & Equations","Statistics"],
    reading: ["Poetry & Figurative Language","Novel Comprehension","Argumentative Text","Analyzing Characters","Research Skills"]
  },
  7:  {
    math: ["Proportional Relationships","Negative Numbers","Linear Equations","Inequalities","Probability"],
    reading: ["Rhetoric & Persuasion","Literary Devices","Comparing Texts","Tone & Mood","Informational Analysis"]
  },
  8:  {
    math: ["Systems of Equations","Pythagorean Theorem","Functions & Graphs","Scientific Notation","Transformations"],
    reading: ["Advanced Literary Analysis","Argumentative Reading","Historical Text","Satire & Irony","Theme Analysis"]
  },
  9:  {
    math: ["Linear Equations","Quadratic Equations","Polynomials","Factoring","Radical Expressions"],
    reading: ["Classical Literature","Critical Reading","Symbolism & Allegory","Author's Bias","Essay Comprehension"]
  },
  10: {
    math: ["Geometry Proofs","Trigonometry","Circles & Theorems","Coordinate Geometry","Similarity & Congruence"],
    reading: ["Shakespearean Language","Modernist Literature","Rhetorical Analysis","Comparative Literature","SAT-Level Vocabulary"]
  },
  11: {
    math: ["Quadratic Functions","Polynomial Functions","Exponential & Logs","Sequences & Series","Statistics & Normal Distribution"],
    reading: ["AP-Level Comprehension","Advanced Rhetoric","World Literature","Critical Analysis","Research & Citations"]
  },
  12: {
    math: ["Limits & Pre-Calculus","Derivatives","Integration","Vectors & Matrices","Combinatorics & Probability"],
    reading: ["College-Level Reading","Philosophical Texts","Advanced Argumentation","Synthesis of Sources","Literary Criticism"]
  },
}

export const BUDDIES = ["🦁","🐼","🦊","🐨","🐸","🦄","🐯","🐺"]

export const GRADE_ICON = {
  1:"⭐", 2:"🌟", 3:"💫", 4:"✨", 5:"🔥",
  6:"⚡", 7:"🚀", 8:"🌙", 9:"💎", 10:"🏆",
  11:"🎓", 12:"👑"
}

// Signals that indicate a student is frustrated or disengaged
export const FRUSTRATION_SIGNALS = [
  "stupid","hate","don't get","dont get","confused","hard","difficult",
  "impossible","idk","i don't know","i dont know","give up","too hard",
  "can't","cant","whatever","ugh","help","lost","???"
]

export const DISENGAGEMENT_SIGNALS = [
  "k","ok","okay","sure","yeah","no","nope","...","lol","haha","bye","what","huh"
]
