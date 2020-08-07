const replaceQuotes = () => {
    const el = document.getElementById('task-1');
    el.value = el.value.replace(new RegExp(/(?<=\s)('+?)|('+?)(?=[\s.])/, 'gmi'), '"');
};

const validate = () => {
    const nameEl = document.getElementById('name');
    const phoneEl = document.getElementById('phone');
    const emailEl = document.getElementById('email');

    const errors = [];

    // Проверяем имя
    if (!/^[a-zа-яёе]+$/iu.test(nameEl.value)) {
        errors.push('Имя должно содержать только буквы');
        nameEl.parentElement.classList.add('invalid');
    } else {
        nameEl.parentElement.classList.remove('invalid');
    }

    // Проверяем телефон
    if (!/^\+7\(\d{3}\)\d{3}\-\d{4}$/i.test(phoneEl.value)) {
        errors.push('Телефон должен иметь вид +7(000)000-0000');
        phoneEl.parentElement.classList.add('invalid');
    } else {
        phoneEl.parentElement.classList.remove('invalid');
    }

    // Проверяем Email
    if (!/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/i.test(emailEl.value)) {
        errors.push('Email имеет неправильный формат. Примеры: mymail@mail.ru, my.mail@mail.ru, my-mail@mail.ru');
        emailEl.parentElement.classList.add('invalid');
    } else {
        emailEl.parentElement.classList.remove('invalid');
    }

    // Выводим ошибки под формой
    const errorList = document.getElementById('error-list');
    errorList.innerHTML = errors.map(err => `<div class="error">${err}</div>`).join('');
};

window.addEventListener('DOMContentLoaded', () => {
    // Предзаполняем поля ввода
    document.getElementById('task-1').value =
        `Lorem ipsum dolor sit amet consectetur adipisicing elit. ` +
        `'Harum laborum, ab aliquid, ratione iusto officiis architecto' ` +
        `adipisci incidunt dolore numquam fuga delectus animi consequuntur, ` +
        `'expedita ex laboriosam nesciunt facilis perspiciatis facere minus'. ` +
        `Cum eaque incidunt ullam? Officiis nam doloribus corporis.` +
        `aren't, don't, Ann's.`;

    document.getElementById('name').value = 'qwe23';
    document.getElementById('phone').value = '+79021977337';
    document.getElementById('email').value = 'to@me.site';
});
