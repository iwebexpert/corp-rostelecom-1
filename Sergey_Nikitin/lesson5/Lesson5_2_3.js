//код взят большей частью из предыдущего задания и адаптирован под текущее.
'use strict';

const basketDom = document.querySelector(".basket");
const catalogDom = document.querySelector(".catalog");
const options = {
    productCss: "product",
    buttonCss: "myButton",
}

class product {
    constructor(_title, _price, _priceType) {
        this.title = _title;
        this.price = _price;
        this.priceType = _priceType;
    }
}
class backetUnit {
    constructor(_prod, _count) {
        this.product = _prod;
        this.count = _count;
    }

}
class backet {

    constructor() {
        this.shopBin = new Array(0);
    }
    add(_backetUnit) {
        for (let i = 0; i < this.shopBin.length; i++) {
            if (this.shopBin[i].product.title === _backetUnit.product.title) {
                this.shopBin[i].count += _backetUnit.count;
                return true;
            }

        }
        this.shopBin.push(_backetUnit);
    }
    countBasketPrice() {
        let res = 0
        for (let i = 0; i < this.shopBin.length; i++) {
            res += (parseInt(this.shopBin[i].product.price) * parseInt(this.shopBin[i].count));

        }
        return res;
    }
    countBasketProd() {
        return this.shopBin.length;
    }
    countBasket() {
        let res = 0
        for (let i = 0; i < this.shopBin.length; i++) {
            res += (parseInt(this.shopBin[i].count));

        }
        return res;
    }
}

function createProductBox(prod, index) {
    const res = document.createElement("div");
    res.classList.add(options.productCss);

    const titleprod = document.createElement("p");
    titleprod.textContent = prod.title + '(' + prod.price + ' ' + prod.priceType + ')'
    const buttonadd = document.createElement("div");
    buttonadd.classList.add(options.buttonCss);
    buttonadd.textContent = "Добавить";
    buttonadd.setAttribute("productIndex", index + "");
    buttonadd.setAttribute("onClick", "addToBasket(this);");//так привык добавлять. пример addEventListener ниже
    res.appendChild(titleprod);
    res.appendChild(buttonadd);
    return res;

}
function addToBasket(button) {
    let indx = parseInt(button.getAttribute("productIndex"));
    if (backetCurrent === null && backetCurrent === undefined) {
        backetCurrent = new backet();
    }
    backetCurrent.add(new backetUnit(catalog[indx], 1));
    ShowBasket();
}
function clearBasket() {
    backetCurrent.shopBin = [];
    console.log("Корзина очищена")
    ShowBasket();
}
function ShowBasket() {
    basketDom.innerHTML = "";
    const titlebasket = document.createElement("h3");
    titlebasket.textContent = "Корзина";
    basketDom.appendChild(titlebasket);
    if (backetCurrent.shopBin.length === 0) {
        const texrbasket = document.createElement("p");
        texrbasket.textContent = "В корзине ничего нет!";
        basketDom.appendChild(texrbasket);
    }
    else {

        const texrbasket = document.createElement("p");
        texrbasket.textContent = "В корзине " + backetCurrent.countBasketProd() + " позиций и " + backetCurrent.countBasket() + " товаров на сумму = " + backetCurrent.countBasketPrice() + " рублей.";
        basketDom.appendChild(texrbasket);
        const buttonclear = document.createElement("div");
        buttonclear.classList.add(options.buttonCss);
        buttonclear.textContent = "Очистить";
        buttonclear.addEventListener("click", clearBasket);
        // buttonclear.setAttribute("onClick", "clearBasket();");
        basketDom.appendChild(buttonclear);
    }
}
const backetCurrent = new backet();
const catalog = [];
catalog.push(new product("Материнка", 10000, "RUB"));
catalog.push(new product("Проц", 33000, "RUB"));
catalog.push(new product("Плашка оперативы", 5000, "RUB"));
catalog.push(new product("Видяха", 40000, "RUB"));
catalog.push(new product("Блок питалова", 10000, "RUB"));
catalog.push(new product("Корпус", 4000, "RUB"));
catalog.push(new product("Кулер", 1500, "RUB"));
backetCurrent.add(new backetUnit(catalog[0], 1));
backetCurrent.add(new backetUnit(catalog[1], 1));
backetCurrent.add(new backetUnit(catalog[2], 2));
backetCurrent.add(new backetUnit(catalog[3], 1));
backetCurrent.add(new backetUnit(catalog[4], 1));
backetCurrent.add(new backetUnit(catalog[5], 1));
backetCurrent.add(new backetUnit(catalog[6], 1));
console.log("Корзина:", backetCurrent);
console.log("Цена компа=", backetCurrent.countBasketPrice());


window.onload = function () {
    catalogDom.innerHTML = "";
    const titleCatalog = document.createElement("h3");
    titleCatalog.textContent = "Католог товаров";
    catalogDom.appendChild(titleCatalog);
    for (let i = 0; i < catalog.length; i++) {
        catalogDom.appendChild(createProductBox(catalog[i], i));
    }
    ShowBasket();
}
