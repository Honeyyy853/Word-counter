const textInput = document.querySelector(".text-input");
const wordCountElement = document.querySelector(".word-count");
const letterCountElement = document.querySelector(".letter-count");
const spaceCountElement = document.querySelector(".space-count");

const checks = [atLeastTwoCharacters, absenceOfThreeConsecutiveCharacters];

function atLeastTwoCharacters(text) {
  const letters = text.match(/[a-z]/gi) || [];
  return letters.length >= 2;
}

function absenceOfThreeConsecutiveCharacters(text) {
  const counts = {};
  for (const char of text) {
    counts[char] = (counts[char] || 0) + 1;
    if (counts[char] >= 3) {
      return false;
    }
  }
  return true;
}

textInput.addEventListener("input", () => {
  const text = textInput.value;
  const wordsArray = text.trim().split(/\s+/);
  const letterCount = (text.match(/[a-z]/gi) || []).length;
  const spaceCount = (text.match(/\s/g) || []).length;

  let wordCount = 0;
  outer: for (const word of wordsArray) {
    if (!word) continue; // skip empty strings
    for (const check of checks) {
      if (!check(word)) {
        continue outer;
      }
    }
    wordCount++;
  }

  wordCountElement.textContent = wordCount;
  letterCountElement.textContent = letterCount;
  spaceCountElement.textContent = spaceCount;
});
