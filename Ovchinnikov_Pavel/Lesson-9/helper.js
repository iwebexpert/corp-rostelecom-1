function getTotal() {
    return document.getElementById("total");
}

function getCheck(name) {
    return document.querySelectorAll('input[name="' + name + '"]:checked');
}

function getCheckValue(name) {
    return getCheck(name)[0] ? getCheck(name)[0].value : null;
}

function getCheckValues(name) {
    let el = getCheck(name);
    let values = [];
    for (let i = 0; i < el.length; i++)
        values.push(el[i].value);
    return values;

}

function calculate() {
    let hamburger = new Hamburger(getCheckValue("size"), getCheckValue("stuffing"), getCheckValues("toppings"));    

    let total = "Ваш заказ:" + '<br>' +
        '&nbsp;' + '&nbsp;' + '&nbsp;' + "размер - " + hamburger.getSize() + '<br>' +
        '&nbsp;' + '&nbsp;' + '&nbsp;' + "начинка - " + hamburger.getStuffing() + '<br>' +
        '&nbsp;' + '&nbsp;' + '&nbsp;' + "добавки - " + hamburger.getToppings() + '<br>' +
        '&nbsp;' + '&nbsp;' + '&nbsp;' + "-------------------" + '<br>' +
        '&nbsp;' + '&nbsp;' + '&nbsp;' + "цена - " + hamburger.calculatePrice() + " руб." + '<br>' +
        '&nbsp;' + '&nbsp;' + '&nbsp;' + "калорийность - " + hamburger.calculateCalories() + " калорий";

    if (getTotal())
        getTotal().innerHTML = total;

}