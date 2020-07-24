let cont = document.createElement('div');
cont.className = 'container';
document.body.appendChild(cont);
let kletka;
let flag = true;
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];


for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        kletka = document.createElement('div');
        if (i == 0 && j == 0) {
            kletka.className = 'content-kletka';
        }
        cont.appendChild(kletka);
        if ((j == 0) && (i > 0)) {
            kletka.className = 'content-kletka';
            kletka.textContent = i;
        }
        if ((i == 0) && (j > 0)) {
            kletka.className = 'content-kletka';
            kletka.textContent = letters[j - 1];
        }
        if (i > 0 && j > 0) {
            if (j == 1) {
                flag = !flag;
            }
            if (flag) {
                kletka.className = 'white';
            }
            else {
                kletka.className = 'black';
            }
            cont.appendChild(kletka);
            flag = !flag;
        }
    }
}