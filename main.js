const boardSize = 5;
let selectedPiece = null;
let gameInterval = null;
let currentPlayer = 1;
let playerTurnMessage = document.createElement("div");
document.body.appendChild(playerTurnMessage);

const initialPoints = 9;
const pointThreshold = 3;
const moveSound = new Audio("soundlab/gamesound.mp3");

const hierarchy = {
  god: 11,
  devil: 10,
  net: 9,
  mind: 8,
  man: 7,
  animal: 6,
  wind: 5,
  fire: 4,
  water: 3,
  earth: 2,
  tree: 1,
  empty: 0,
};

const pieces = {};
document.querySelectorAll(".piece").forEach((piece) => {
  pieces[piece.dataset.index] = initialPoints;
  updatePieceDisplay(piece);
});

document.addEventListener("keydown", (event) => {
  console.log("Key pressed:", event.key);
  switch (event.key) {
    case "ArrowUp":
      movePiece("up");
      break;
    case "ArrowDown":
      movePiece("down");
      break;
    case "ArrowLeft":
      movePiece("left");
      break;
    case "ArrowRight":
      movePiece("right");
      break;
  }
});

function selectPiece(piece) {
  const piecePlayer = getPiecePlayer(piece);
  if (piecePlayer !== currentPlayer) {
    alert(`It's Player ${currentPlayer}'s turn!`);
    return;
  }

  if (selectedPiece === piece) {
    piece.classList.remove("selected");
    selectedPiece = null;
    console.log("Piece deselected");
  } else {
    if (selectedPiece) {
      selectedPiece.classList.remove("selected");
    }
    piece.classList.add("selected");
    selectedPiece = piece;
    console.log("Piece selected:", selectedPiece.dataset.type);
  }
}

function movePiece(direction) {
  if (!selectedPiece) {
    console.log("No piece selected");
    return;
  }
  console.log(
    "Moving piece:",
    selectedPiece.dataset.type,
    "Direction:",
    direction
  );

  moveSound.currentTime = 0;
  moveSound.play();

  const currentPos = parseInt(selectedPiece.dataset.index);
  let newPos = currentPos;

  switch (direction) {
    case "up":
      if (currentPos >= boardSize) newPos -= boardSize;
      break;
    case "down":
      if (currentPos < boardSize * (boardSize - 1)) newPos += boardSize;
      break;
    case "left":
      if (currentPos % boardSize !== 0) newPos -= 1;
      break;
    case "right":
      if ((currentPos + 1) % boardSize !== 0) newPos += 1;
      break;
  }

  const targetPiece = document.querySelector(`[data-index='${newPos}']`);
  console.log("Target piece:", targetPiece);

  if (targetPiece && canControl(selectedPiece, targetPiece)) {
    console.log("Controlling piece");
    controlPiece(selectedPiece, targetPiece);
    swapPieces(selectedPiece, targetPiece);
    endTurn();
  } else if (targetPiece && targetPiece.dataset.type === "empty") {
    console.log("Swapping pieces");
    swapPieces(selectedPiece, targetPiece);
    endTurn();
  } else {
    console.log("Invalid move: cannot control or move to this piece");
  }
}

function canControl(piece1, piece2) {
  const type1 = piece1.dataset.type;
  const type2 = piece2.dataset.type;

  if (!hierarchy[type1] || !hierarchy[type2]) return false;

  return hierarchy[type1] > hierarchy[type2];
}

function controlPiece(controller, controlled) {
  console.log(
    `${controller.dataset.type} is controlling ${controlled.dataset.type}`
  );

  const controlledIndex = controlled.dataset.index;
  pieces[controlledIndex]--;
  pieces[controller.dataset.index]++;

  updatePieceDisplay(controlled);
  updatePieceDisplay(controller);

  if (pieces[controlledIndex] <= 0) {
    console.log(`${controlled.dataset.type} has been removed from the board`);
    controlled.remove();
  } else if (pieces[controlledIndex] <= pointThreshold) {
    console.log(`${controlled.dataset.type} has lost hierarchy power`);
  }

  controlled.classList.add("controlled");
}

function updatePieceDisplay(piece) {
  const points = pieces[piece.dataset.index];

  if (piece.dataset.type !== "empty") {
    let pointsDisplay = piece.querySelector(".points");
    if (!pointsDisplay) {
      pointsDisplay = document.createElement("strong");
      pointsDisplay.className = "points";
      piece.appendChild(pointsDisplay);
    }
    pointsDisplay.textContent = points;
  } else {
    const pointsDisplay = piece.querySelector(".points");
    if (pointsDisplay) {
      pointsDisplay.remove();
    }
  }
}

function swapPieces(piece1, piece2) {
  const tempIndex = piece1.dataset.index;
  piece1.dataset.index = piece2.dataset.index;
  piece2.dataset.index = tempIndex;

  const parent = piece1.parentNode;
  parent.insertBefore(piece1, piece2);
  parent.insertBefore(piece2, parent.children[tempIndex]);
}

function endTurn() {
  if (selectedPiece) {
    selectedPiece.classList.remove("selected");
    selectedPiece = null;
  }
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnMessage();
}

function getPiecePlayer(piece) {
  return piece.id.endsWith("1") ? 1 : 2;
}

function updateTurnMessage() {
  playerTurnMessage.textContent = `Player ${currentPlayer}'s turn. Select your pieces and use arrow keys to play`;
}

updateTurnMessage();
