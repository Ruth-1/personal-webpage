let currentPlayer = "X";
const cells = document.querySelectorAll(".cell");
const moves = document.querySelector(".js-moves-t");
const resetButton = document.querySelector(".js-reset-button");
let flag = false;
console.log(cells);

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    //checks that a cell has not already been filled
    if (!cell.value) {
      cell.value = currentPlayer;
      checkWin();
      if (isTie()) {
        // Call the function isTie()
        moves.innerHTML = "DRAW!";
        cells.forEach((cell) => {
          cell.disabled = true;
          cell.style.backgroundColor = "lightgrey";
        });
      } else {
        currentPlayer = currentPlayer === "X" ? "0" : "X";
        if (!flag) {
          moves.innerText = `Player ${currentPlayer}'s Turn`;
        }
      }
    }
  });
});

function isTie() {
  let istie = true;
  document.querySelectorAll(".cell").forEach((cell) => {
    if (!cell.value) {
      istie = false;
    }
  });
  return istie;
}

function checkWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      cells[a].value &&
      cells[a].value === cells[b].value &&
      cells[a].value === cells[c].value
    ) {
      moves.innerText = `Player ${currentPlayer} Won!`;
      cells.forEach(
        (cell) => (
          (cell.disabled = true), (cell.style.backgroundColor = "lightgrey")
        )
      );
      flag = true;
      break;
    } else {
      moves.innerText = `Player ${currentPlayer}'s Turn`;
    }
  }
}

resetButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.value = "";
    cell.disabled = false;
    cell.style.backgroundColor = "white";
  });
  moves.innerText = "Player X turn";
  currentPlayer = "X";
});
