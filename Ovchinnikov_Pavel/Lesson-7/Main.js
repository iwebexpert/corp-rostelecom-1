
function Show() {

    const listProductsInBasket =
        [
            // new Products(new Product("Товар_1", 10), 2),
            //  new Products(new Product("Товар_2", 20), 2)
        ];

    const listProductsForCatalog =
        [
            new Product("Ноутбук ", 20000,
                [
                    "https://img.mvideo.ru/Pdb/30049917b.jpg",
                    "https://img.mvideo.ru/Pdb/30049917b1.jpg",
                    "https://img.mvideo.ru/Pdb/30049917b2.jpg",
                    "https://img.mvideo.ru/Pdb/30049917b3.jpg",
                    "https://img.mvideo.ru/Pdb/30049917b4.jpg",
                    "https://img.mvideo.ru/Pdb/30049917b5.jpg"
                ]),

            new Product("Системный блок", 10000,
                [
                    "https://img.mvideo.ru/Pdb/30050696b.jpg",
                    "https://img.mvideo.ru/Pdb/30050696b1.jpg",
                    "https://img.mvideo.ru/Pdb/30050696b2.jpg",
                    "https://img.mvideo.ru/Pdb/30050696b3.jpg",
                    "https://img.mvideo.ru/3dPics/30050696/005.jpg"
                ]),
            new Product("Монитор", 5000,
                [
                    "https://img.mvideo.ru/Pdb/30036675b.jpg",
                    "https://img.mvideo.ru/Pdb/30036675b1.jpg",
                    "https://img.mvideo.ru/Pdb/30036675b2.jpg",
                    "https://img.mvideo.ru/Pdb/30036675b3.jpg"
                ]),


            new Product("Клавиатура", 1000,
                [
                    "https://img.mvideo.ru/Pdb/50130903b.jpg",
                    "https://img.mvideo.ru/Pdb/50130903b1.jpg",
                    "https://img.mvideo.ru/Pdb/50130903b2.jpg"
                ]),
            new Product("Мышка", 100,
                [
                    "https://img.mvideo.ru/Pdb/50130917b.jpg",
                    "https://img.mvideo.ru/Pdb/50130917b1.jpg",
                    "https://img.mvideo.ru/Pdb/50130917b2.jpg",
                    "https://img.mvideo.ru/Pdb/50130917b3.jpg"
                ]),
            new Product("Коврик", 10,
                [
                    "https://img.mvideo.ru/Pdb/50049282b.jpg",
                    "https://img.mvideo.ru/Pdb/50049282b1.jpg",
                    "https://img.mvideo.ru/Pdb/50049282b2.jpg",
                    "https://img.mvideo.ru/Pdb/50049282b3.jpg",
                    "https://img.mvideo.ru/Pdb/50049282b5.jpg"
                ]),
        ];


    const webModal = new WebModal();

    const basket = new Basket(listProductsInBasket);

    const webBasket = new WebBasket(basket);
    webBasket.Show();

    const catalog = new WebСatalog(listProductsForCatalog, webBasket, webModal);
    catalog.Show();
}