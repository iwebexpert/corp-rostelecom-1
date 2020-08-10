'use strict';

const form = document.querySelector('form');
const order = document.getElementById('order');

form.addEventListener('submit', event => {
    event.preventDefault();
    const userHamburger = new Hamburger(form.sizeHamburger.value, form.stuffingHamburger.value, getCheckedCheckBoxes());
    order.innerHTML = `Цена заказанного бургера: ${userHamburger.price()} руб.<br>Калорийность бургера составляет: ${userHamburger.calories()} калорий`;
});

function getCheckedCheckBoxes() {
    const selectedCheckBoxes = document.querySelectorAll('input.checkbox:checked');
    return Array.from(selectedCheckBoxes).map(cb => cb.value);
}
