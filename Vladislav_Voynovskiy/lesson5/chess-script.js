const drawChessBoard = () => {
  const base = document.getElementById('chess-board');
  const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  chars.reverse()
  const nums = [1, 2, 3, 4, 5, 6, 7, 8]
  base.style = ('display: flex; flex-wrap: wrap; border: 1px solid black; width: 400px; height: 400px; margin: auto;')
  for (let i = 7; i >= 0; i--) {
    let row = document.createElement('div');
    row.className = 'row';
    row.style = 'display: flex;'
    row.style.flexDirection = i % 2 === 0 ? '' : 'row-reverse';
    chars.reverse()
    for (j = 7; j >= 0; j--) {
      if (j % 2 === 0) {
        const whiteSquare = document.createElement('div');
        whiteSquare.className = 'white-square';
        whiteSquare.style = 'background-color: #f0d9b5; width: 50px; height: 50px; text-align: center;';
        whiteSquare.innerHTML = `${chars[j]}${nums[i]}`;
        row.appendChild(whiteSquare);
      } else {
        const blackSquare = document.createElement('div');
        blackSquare.className = 'white-square';
        blackSquare.style = 'background-color: #b58863; width: 50px; height: 50px; text-align: center;';
        blackSquare.innerHTML = `${chars[j]}${nums[i]}`;
        row.appendChild(blackSquare);
      }
    }
    base.appendChild(row);
  }
}