function Show() {

    const listProductsInBasket =
        [

        ];

    const listProductsForCatalog =
        [
            new Product("Оперативная память ", 7500,
                [
                    "https://c.dns-shop.ru/thumb/st1/fit/320/250/9453309e111d8de79f3e098ca6d85de9/caa0c52814f700d67cd8fb07a9d56ce4f5af401aa38672fca7172fb0e7178c5b.jpg",
                    "https://c.dns-shop.ru/thumb/st1/fit/320/250/2c199bcf5b010019773c8c7879c79b6e/a36dd174f998f0edba0b8690f7760477cb3abce09f587b66d84981d3584eaf05.jpg"
                ]),

            new Product("Материнская плата", 12569,
                [
                    "https://c.dns-shop.ru/thumb/st1/fit/320/250/99266b43a82089209214abe8c2c9068b/7f238517370852d1f1ae5d026ba0e100a101ed276a487155e483312dd64c9907.jpg",
                    "https://c.dns-shop.ru/thumb/st4/fit/320/250/93bea1a108c20c7641ab85ef072c4a0a/195940f0ab91663a047e42262a4bd109ff880847c424eb55c9c01434e0580de0.jpg",
                    "https://c.dns-shop.ru/thumb/st1/fit/320/250/75c909672bd90914a31882db6aacd531/d58c37db33e7ec85e41a192fd31255491e6a228dc8d5489974971c9823c8d878.jpg"
                ]),
            new Product("Блок питания", 12980,
                [
                    "https://c.dns-shop.ru/thumb/st4/fit/320/250/7cb215413856c95ebfa06acbd96ff39f/7b130aa7bb4040790e5046aebe74c50616d967718f6828fdb5e3cb1dc99f3c73.jpg",
                    "https://c.dns-shop.ru/thumb/st1/fit/320/250/4bd09c640911bcfd79f8cdd8e07d3dbc/9ecd48e1fb79b386fbaaf471f359d47a17d1255ee207a000ef6fec38f544f240.jpg",
                    "https://c.dns-shop.ru/thumb/st4/fit/320/250/6b214bde271acb1c6b7513745bf025dc/3cb3d83c1180f3e855db1afebd32d714c907628f69b7c91cfceaae38fe92405e.jpg"

                ]),


            new Product("Видеокарта", 47630,
                [
                    "https://c.dns-shop.ru/thumb/st4/fit/320/250/f450654e86cf871acb1a10d2605dac8e/cfdcc5f75c94b999d073205bce84ac23ead58699828bca44ce3d63d8ba22965f.jpg",
                    "https://c.dns-shop.ru/thumb/st4/fit/320/250/44ebe6111d40424c3f974a4504722b27/13202fde1b5efb8211458680e876e490de44448b3c59541833e37caf8affc98f.jpg",
                    "https://c.dns-shop.ru/thumb/st1/fit/320/250/6be923bf629f15e8609e2944e8410ef6/39c461d9b437094747e097ff25052455e1c9cbd35d03d2fa888720d48f5621af.jpg"
                ]),

        ];


    const webModal = new WebModal();

    const basket = new Basket(listProductsInBasket);

    const webBasket = new WebBasket(basket);
    webBasket.Show();

    const catalog = new WebСatalog(listProductsForCatalog, webBasket, webModal);
    catalog.Show();
} 