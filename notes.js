const colors = [
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "white",
  "orange",
  "white",
];

const children = document.querySelectorAll("div[data-child]");

for (let i = 0; i < children.length; i++) {
  const child = children[i];
  child.style.backgroundColor = colors[i];
}

let selectedPiece = null;
let selectedPieceIndex = null;

children.forEach((child) => {
  child.addEventListener("click", handleSquareClick);
});

function handleSquareClick(event) {
  const target = event.currentTarget;

  if (selectedPiece && target.textContent === "") {
    target.textContent = selectedPiece.textContent;
    selectedPiece.textContent = "";
    deselectPiece();
  } else if (target.textContent !== "") {
    selectPiece(target);
  }
}

function selectPiece(piece) {
  if (selectedPiece) {
    deselectPiece();
  }
  selectedPiece = piece;
  selectedPieceIndex = Array.from(children).indexOf(piece);
  piece.style.border = "2px solid black";
}

function deselectPiece() {
  if (selectedPiece) {
    selectedPiece.style.border = "";
    selectedPiece = null;
    selectedPieceIndex = null;
  }
}
