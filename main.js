        window.onload = function(){
            let chess = document.getElementById('chess');
            let Alfabet = ['A','B','C','D','E','F','G','H'];


            for (let i=0; i<9; i++)
            {
                let row = document.createElement('div');
                row.className = 'row';

                for (let j=0; j<9; j++){
                let cell = document.createElement('div');
                cell.className = 'cell';
                
                if (i == 0 && j > 0) {
                    cell.innerText = Alfabet[j-1];
                    row.appendChild(cell);
                    continue;
                }

                if (i > 0 && j == 0) {
                    cell.innerText = i;
                    row.appendChild(cell);
                    continue;
                }
                
                if (i==0 && j == 0) {
                    row.appendChild(cell);
                    continue;
                }
                else if ((j - i) % 2) {
                    cell.className = 'cell black';
                    }
                    else {
                    cell.className = 'cell';
                    }
                row.appendChild(cell);
                }
            chess.appendChild(row);
            }
          
        }