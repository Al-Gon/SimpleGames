function getRandomElem(newArr) {
  if (newArr.length > 1) {
    return newArr[Math.floor(Math.random() * newArr.length)];
  }
  return newArr[0];
}
// составляет массив из ключей доступных для выбора ячеек
function getFloatArr(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === '') {
        newArr.push(`${i}${j}`);
      }
    }
  }
  return newArr;
}

function getChoosenKey(arr) {
  const floatArray = getFloatArr(arr);
  return getRandomElem(floatArray);
}

function getIndex(id) {
  return [+id[0], +id[1]];
}

function checkDraw(arr) {
  const emptyCells = [].concat(...arr).filter((el) => !el);
  return !emptyCells.length;
}

function checkWinner(arr, key, value) {
  const [x, y] = getIndex(key);
  let Horizont = [];
  const Vertical = [];
  const LeftRight = [];
  const RightLeft = [];
  const lines = [Vertical, LeftRight, RightLeft];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][y] === value) {
      Vertical.push([i, y]);
    }
    if (x === y && arr[i][i] === value) {
      LeftRight.push([i, i]);
    }
    if (x + y === arr.length - 1 && arr[i][arr.length - i - 1] === value) {
      RightLeft.push([i, arr.length - i - 1]);
    }
    Horizont = arr[i].filter((el) => el === value);
    if (Horizont.length === arr.length) {
      return Array.from({ length: arr.length }, (_, ind) => [i, ind]);
    }
  }
  const winnerLine = lines.filter((line) => line.length === arr.length);

  return winnerLine.length ? winnerLine[0] : winnerLine;
}

export { getIndex, checkWinner, checkDraw, getChoosenKey };
