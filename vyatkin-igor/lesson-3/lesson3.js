/*------------------ begin part 1 --------------------------*/

let n = 100;
let i = 2;
let j;
let result = true;

while (i <= n) {
    j = i;
    while (j >= 1) {
        if (i % j === 0 && i !== j && j !== 1) {
            result = false;
            break;
        }
        j--;
    }
    if (result === true) {
        console.log(i);
    }
    result = true;
    i++;
}

/*------------------ end part 1 --------------------------*/
