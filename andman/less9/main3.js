const inputList = document.querySelectorAll('input');
const message = document.querySelector('.message');
const sendBtn = document.querySelector('.send-button');
var size;
var stuff;
var spec;
var mayonez;

//Получение текущих значенией и навешивание обработчиков событий
for (var i = 0; i < inputList.length; i++) {
    if (inputList[i].type == 'radio' || inputList[i].type == 'checkbox') {
        if (inputList[i].type == 'radio' && inputList[i].checked) {
            window[inputList[i].name] = inputList[i].value;
        }
        if (inputList[i].type == 'checkbox') {
            window[inputList[i].name] = (inputList[i].checked) ? true : false;
        }
        inputList[i].addEventListener('click', function () {
            if (this.checked && this.type == 'radio') {
                window[this.name] = this.value;
            }
            if (this.type == 'checkbox') {
                window[this.name] = (this.checked) ? true : false;
            }
            //message.innerHTML = `Размер: ${size}, начинка: ${stuff}, приправа: ${spec},майонез: ${mayonez}`;
        });
    }
}
// console.log(size, stuff, spec, mayonez);
// message.innerHTML = `Размер: ${size}, начинка: ${stuff}, приправа: ${spec},майонез: ${mayonez}`;
sendBtn.addEventListener('click', function () {
    const hamburger = new Hamburger(size, stuff);
    if (spec) //Добавим приправу
        hamburger.addTopping({ "name": "spec", "cost": 15, "kkal": 0 });
    if (mayonez) //Добавим майонез
        hamburger.addTopping({ "name": "mayonez", "cost": 20, "kkal": 5 });
    const result = hamburger.calculate();
    message.innerHTML = `Цена гамбургера: ${result.price} руб, калорийность: ${result.kkal} ккал`;
})