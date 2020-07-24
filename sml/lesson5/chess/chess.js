/**
 * Домашнее задание #5
 * @author  Сорванов Михаил Леонидович [CorpRostelecom-1]
 */

/**
1.  Создать  функцию,  генерирующую  шахматную  доску.  Можно  использовать  любые  html-теги.  Доска
должна быть верно разлинована на черные и белые ячейки. Строки должны нумероваться числами
от 1 до 8, столбцы — латинскими буквами A, B, C, D, E, F, G, H.
 */

function chess() {
  let white = true;
  let tab = document.createElement('div');
  tab.className = 'tab';
  let content = document.getElementById('content');
  content.appendChild(tab);

  for (let i = 9; i >= 0; i--) {
    white = !white;
    let tr = document.createElement('div');
    tr.className = 'tr';
    tab.appendChild(tr);

    for (let j = 96; j < 106; j++) {
      if (i == 9 || i == 0) {
        let td = document.createElement('div');
        td.className = 'td';
        if (j > 96 && j < 105) {
          td.innerHTML = String.fromCharCode(j);
        }
        tr.appendChild(td);
      } else {
        if (j == 96 || j == 105) {
          let td = document.createElement('div');
          td.className = 'td';
          td.innerHTML = i;
          tr.appendChild(td);
        } else {
          if (white) {
            let kw = document.createElement('div');
            kw.className = 'kw';
            tr.appendChild(kw);
          } else {
            let kb = document.createElement('div');
            kb.className = 'kb';
            tr.appendChild(kb);
          }
          white = !white;
        }
      }
    }
  }
}
window.onload = chess();
