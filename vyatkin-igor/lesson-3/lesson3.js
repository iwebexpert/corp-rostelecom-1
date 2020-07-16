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


/*------------------ begin part 2,3 --------------------------*/
const shop = [
    ["CPU AMD Ryzen 5 Pinnacle Ridge", 11990, "RUB", 2],
    ["MB GIGABYTE B450M DS3H", 5390, "RUB", 2],
    ["GPU SAPPHIRE AMD Radeon RX 580", 17990, "RUB", 2],
    ["RAM CRUCIAL CT8G4DFS8266 DDR4 - 8Gb", 2590, "RUB", 2],
    ["БП SEASONIC FOCUS Plus SSR-550PX", 9750, "RUB", 2],
    ["SSD KINGSTON A400 SA400S37", 2590, "RUB", 2],
    ["Monitor SAMSUNG C24RG50FQI 23.5", 13990, "RUB", 2],
    ["Midi-Tower ATX ZALMAN S2", 2430, "RUB", 2]

];

function countBasketPrice(items) {
    let ammount = 0;
    //TODO - расчет стоимости
    let price;
    let count;
    let cost_positions;
    for (let i = 0; i < shop.length; i++) {
        for (let j = 1; j < shop[i].length; j = j + 2) {
            if (j == 1) price = shop[i][j];
            if (j == 3) {
                count = shop[i][j];
                cost_positions = price * count;
            }
        }
        ammount += cost_positions;
    }

    return ammount;
}

console.log('Общая стоимость товаров: ', countBasketPrice(shop));


/*------------------ end part 2,3 --------------------------*/



/*------------------ begin part 4 --------------------------*/

for (let i = 0; i < 10; console.log(i++)) {};

/*------------------ end part 4 --------------------------*/


/*------------------ begin part 5 --------------------------*/
let str = "";
for (let i = 1; i <= 20; i++) {

    for (let j = 1; j <= i; j++) {
        str = str + "X";
    }
    console.log(str);
    str = "";
};
/*------------------ end part 5 --------------------------*/


