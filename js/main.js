const inputs = document.querySelector(".inputs");
const hint = document.querySelector(".hint span");
const left = document.querySelector(".chance_left span");
const wrong = document.querySelector(".wrong  span");
const reset = document.querySelector(".reset");

const typing_input = document.querySelector(".typing_inp");

let word,
  max_guesses,
  wrong_letters = [],
  correct_letters = [];

function random_word() {
  let item = wordList[Math.floor(Math.random() * wordList.length)];
  word = item.word;
  max_guesses = word.length >= 5 ? 8 : 6;
  correct_letters = [];
  wrong_letters = [];
  hint.innerHTML = item.hint;
  left.innerHTML = max_guesses;
  wrong.innerHTML = wrong_letters;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
    inputs.innerHTML = html;
  }
}
random_word();
function game(e) {
  let key = e.target.value.toLowerCase();
  if (
    key.match(/^[A-Za-z]+$/) &&
    !wrong_letters.includes(` ${key}`) &&
    !correct_letters.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          correct_letters += key;
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      max_guesses--;
      wrong_letters.push(`${key}`);
    }
    left.innerHTML = max_guesses;
    wrong.innerHTML = wrong_letters;
  }
  typing_input.value = "";

  setTimeout(() => {
    if (correct_letters.length === word.length) {
      swal("Congrats", "You found the word 🏆🏆🏆", "success");
    
      return random_word();
    } else if (max_guesses < 1) {
      
      swal("Game Over!", "You don't have remaining guesses", "error");
      
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 100);
}

reset.addEventListener("click", random_word);

typing_input.addEventListener("input", game);

inputs.addEventListener("click", () => typing_input.focus());

document.addEventListener("keydown", () => typing_input.focus());
