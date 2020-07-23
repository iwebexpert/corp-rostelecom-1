//const mainContainer = document.getElementById('content')
function createStartElements() {
    const mainContainer = document.getElementById('content')
    console.log(mainContainer);
    let cell = null;
    let row = null;
    let lb=null;
    const row_label=" ABCDEFGH";
    const col_label=" 12345678";
    for(let i=0;i<9;i++) {
        row = document.createElement('div');
        row.className = 'row';
        for(let j=0; j<9;j++) {
            cell = document.createElement('div');
            if(i==0)
            {
                lb = document.createElement('span');
                lb.className="label";
                lb.innerText=row_label[j];
                cell.appendChild(lb);
            }
            if(j==0)
            {
                lb = document.createElement('span');
                lb.className="label";
                lb.innerText=col_label[i];
                cell.appendChild(lb);
            }
            if(i==0 || j==0)
                cell.className = 'square2';
            else
                cell.className = (i+j)%2==0 ? 'square' : "square2";
            row.appendChild(cell);
        }
        mainContainer.appendChild(row);
    }
}