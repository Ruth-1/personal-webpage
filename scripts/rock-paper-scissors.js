const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose!";
    }
    if (computerMove === "scissors") {
      result = "You tie!";
    }
    if (computerMove === "paper") {
      result = "You win!";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "You tie!";
    }
    if (computerMove === "scissors") {
      result = "You win!";
    }
    if (computerMove === "paper") {
      result = "You lose!";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win!";
    }
    if (computerMove === "scissors") {
      result = "You lose!";
    }
    if (computerMove === "paper") {
      result = "You tie!";
    }
  }

  if (result === "You win!") {
    score.wins += 1;
  } else if (result === "You lose!") {
    score.losses += 1;
  } else if (result === "You tie!") {
    score.ties += 1;
  }

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You picked ${playerMove}. Computer picked ${computerMove}`;

  updateResults();
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function updateResults() {
  document.querySelector(".js-results").innerHTML = `
  Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

  document.querySelectorAll(".js-reset-score").forEach((button) => {
    button.style.display = "inline-block";
  });
}

function displayResults() {
  let finalResult = "";
  if (score.wins > score.losses) {
    finalResult = " You Won!";
  } else if (score.losses > score.wins) {
    finalResult = "You Lost!";
  } else {
    finalResult = "You Tie!";
  }

  document.querySelector(
    ".js-final-results"
  ).innerHTML = ` Your Result.....${finalResult}
    `;
  document.querySelectorAll(".js-reset-score").forEach((button) => {
    button.style.display = "none";
  });

  //set a timeout to clear the results after 3 seconds
  setTimeout(() => {
    document.querySelector(".js-final-results").innerHTML = "";
  }, 1200);

  document.querySelector(".js-moves").innerHTML = "Pick a Move";
  document.querySelector(".js-results").innerHTML = "";
  document.querySelectorAll(".js-reset-score").forEach((button) => {
    button.style.display = "none";
  });
}

function resetScore() {
  document.querySelector(
    ".js-results"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  document.querySelectorAll(".js-reset-score").forEach((button) => {
    button.style.display = "none";
  });
}
