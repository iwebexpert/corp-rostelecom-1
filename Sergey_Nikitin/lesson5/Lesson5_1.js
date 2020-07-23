const container = document.querySelector(".container");// (document.getElementsByClassName("container"))[0];
const options = {
    labelCss: "label",
    whiteBoxCss: "whitebox",
    blackBoxCss: "blackbox",
    letters: [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ' '],
}
function createLabelBox(label) {
    const res = document.createElement("div");
    res.classList.add(options.labelCss);
    res.textContent = label;
    return res;
}
function createBox(isBlack) {
    const res = document.createElement("div");
    res.classList.add(isBlack ? options.blackBoxCss : options.whiteBoxCss);
    return res;
}

window.onload = function () {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (i === 9 || j === 0 || j === 9 || i === 0) {
                if (i === 9 && j === 0 || i === 0 && j === 0 || i === 9 && j === 9 || i === 0 && j === 9) {
                    container.appendChild(createLabelBox(""));
                }
                else {

                    container.appendChild(createLabelBox(j === 0 || j === 9 ? 9 - i : options.letters[j]));
                }
            }
            else {
                container.appendChild(createBox((i + j) % 2 != 0));

            }
        }
    }
}