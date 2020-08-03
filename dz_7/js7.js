<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dz_5-2</title>
    <link rel="stylesheet" href="style7.css">
    <script src="./js7.js" defer></script>
</head>

<body>
    <!-- корзина сумма|колличество -->
    <div class="conteiner basket">
        <div >
            <p id="slider__button" class="slider__button">Корзина</p>
            <p>Сумма покупки - <span id="sum_in_basket">0</span>р</p>
            <p>Количество товаров - <span id="count_in_basket">0</span>шт</p>
        </div>
    </div>

    <!-- слайдер корзины -->
    <div id="sliderconteiner" class="slider__conteiner">
    </div>

    <!-- карточки товара -->
    <div class="conteiner" id="conteiner__card">
    </div>

    <!-- модальное окно галереи -->
    <div id="modal" class="modal closed">
        <button class="modal__closed" data-modalclosed="true">X</button>
        <div class="modal__content" id="modal__content">
        </div>
    </div>

</body>

</html>
