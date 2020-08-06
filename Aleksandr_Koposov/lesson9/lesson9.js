const renderSummary = (burger) => {
    new Dom('#burger-summary', 'burger__summary', null,
        `<div><b>${burger.size}</b></div>` +
        `<div><b>Итого:</b> <span class="red-text">${burger.cost} руб.</span></div>` +
        `<div><b>Всего калорий:</b> ${burger.calories}</div>`
    );
};

const renderBurger = (burger) => {
    const stuffings = new Dom('#burger-content');
    stuffings.innerHTML = '';
    [...burger.stuffings].reverse().forEach((stuffing, index) => {
        const el = document.createElement('img');
        el.setAttribute('src', stuffing.src);
        el.setAttribute('alt', 'Начинка №' + index);
        el.style.zIndex = burger.stuffings.length - index;
        stuffings.appendChild(el);
    });
    renderSummary(burger);
};

const renderPage = (burger) => {
    // Рисуем мелкий бургер для выбора размера
    const smallBurger = new Dom('#burger-small', 'item selected', () => {
        burger.resize(true);
        bigBurger.classList.toggle('selected');
        smallBurger.classList.toggle('selected');
        renderBurger(burger);
    }, 'Маленький бургер');
    const smallBurgerImage = new Dom('img');
    smallBurgerImage.setAttribute('src', burger.src);
    smallBurgerImage.setAttribute('alt', burger.size);
    smallBurgerImage.setAttribute('width', 50);
    smallBurger.appendChild(smallBurgerImage);

    // Рисуем большой бургер для выбора размера
    const bigBurger = new Dom('#burger-big', 'item', () => {
        burger.resize(false);
        bigBurger.classList.toggle('selected');
        smallBurger.classList.toggle('selected');
        renderBurger(burger);
    }, 'Большой бургер');
    const bigBurgerImage = new Dom('img');
    bigBurgerImage.setAttribute('src', burger.src);
    bigBurgerImage.setAttribute('alt', burger.size);
    bigBurgerImage.setAttribute('width', 100);
    bigBurger.appendChild(bigBurgerImage);

    // Рисуем начинки и добавки
    const itemRender = (content, item, burger) => {
        const card = new Dom('div', 'item card');

        const itemName = new Dom('div', 'item__title', null, item.title);
        card.appendChild(itemName);

        const itemImage = new Dom('img', 'item__image');
        itemImage.setAttribute('src', item.src);
        itemImage.setAttribute('alt', 'Добавка');
        card.appendChild(itemImage);

        const itemInfo = new Dom('div', 'item__info');
        const price = new Dom('div', 'price', null, item.price);
        const calories = new Dom('div', 'calories', null, item.calories);
        itemInfo.appendChild(price);
        itemInfo.appendChild(calories);
        card.appendChild(itemInfo);

        const cardActions = new Dom('div', 'item__actions');
        const actionAdd = new Dom('a', 'btn btn-circle btn-accent', () => {
            burger.addStuffing(item);
            actionRemove.classList.remove('disabled');
            renderBurger(burger);
        }, '+');
        cardActions.appendChild(actionAdd);

        const disabled = !burger.hasStuffing(item);
        const actionRemove = new Dom('a',
            `btn btn-circle btn-red ${disabled ? 'disabled' : ''}`, () => {
                if (actionRemove.classList.contains('disabled')) {
                    return;
                }
                burger.removeStuffing(item);
                if (!burger.hasStuffing(item)) {
                    actionRemove.classList.add('disabled');
                }
                renderBurger(burger);
            }, '&ndash;');
        cardActions.appendChild(actionRemove);

        card.appendChild(cardActions);
        content.appendChild(card);
    };
    [
        new CheeseTopping(),
        new SaladTopping(),
        new PotatoTopping()
    ].forEach(item => itemRender(
        new Dom('#burger-stuffings'),
        item,
        burger)
    );
    [
        new OnionTopping(),
        new MayonnaiseTopping()
    ].forEach(item => itemRender(
        new Dom('#burger-additional'),
        item,
        burger)
    );
};

window.addEventListener('DOMContentLoaded', () => {
    const burger = new Burger();
    burger.addStuffing(new MeetTopping());
    renderPage(burger);
    renderBurger(burger);
});