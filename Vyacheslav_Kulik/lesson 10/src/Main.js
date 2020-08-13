function appendItemToItems() {
    let listItems = [
        new Item("Keyboard", 1500, "RUB",
            [
                'img/keyboard-1.jpg',
                'img/keyboard-2.jpg'
            ]),
        new Item("Mouse", 500, "RUB",
            [
                'https://resource.logitechg.com/w_659,c_limit,f_auto,q_auto:best,f_auto,dpr_2.0/content/dam/gaming/en/products/pro-mouse/promouse-hero.png?v=1',
                'https://thermaltake.azureedge.net/pub/media/catalog/product/cache/25e62158742be0ef47d2055284094406/l/2/l20m01.jpg'
            ]),
        new Item("Monitor", 10000, "RUB",
            [
                'img/monitor-1.jpg',
                'img/monitor-2.jpg'
            ]),
        new Item("Cover", 750, "RUB",
            [
                'https://imag.malavida.com/mvimgbig/download-fs/cover-strike-26032-3.jpg',
                'https://image.made-in-china.com/202f0j10kKYEvsCthbcr/Rug-Mouse-Pad-Mouse-Rug-Mouse-Pad-Rug.jpg'
            ]),
        new Item("Table", 6500, "RUB",
            [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR4-KQbG8OFy0h4dCVzE9RBLBfzcQEKPfO0Mw&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRK9DyhSexu1XfLX_uJpNe-BE89z92iK0AOKg&usqp=CAU',
                'https://b451c108ef7ce3b912eb-75c7695d67180639ae25fac6b37d4ead.ssl.cf3.rackcdn.com/onlinereality/uploads/prod_img/2_33495_s.jpg'
            ]),
        new Item("Bucket", 1100, "RUB",
            [
                'https://media.screwfix.com/is/image/ae235/64253_P?$p$',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4qG2OOFabsoxCfFt7ZrUF5MFIp1I47fZzWg&usqp=CAU'
            ]),
        new Item("Speakers", 3000, "RUB",
            [
                'https://www.bhphotovideo.com/images/images2000x2000/kanto_living_yu6gb_yu6_obsidian_gloss_black_1304091.jpg',
                'https://cnet2.cbsistatic.com/img/slMJOm3qmuMYcu3o3TvJ48uwy2c=/868x488/2018/03/02/15a1ce4e-1af7-481d-8a7f-7c84e53615c9/01-elac-debut-2-0-6-2.jpg',
                'https://ae01.alicdn.com/kf/HTB19ydOUmzqK1RjSZFLq6An2XXa7.jpg'
            ]),
        new Item("Video card", 27000, "RUB",
            [
                'https://images-na.ssl-images-amazon.com/images/I/71SL67VQMlL._AC_SL1500_.jpg',
                'https://images-na.ssl-images-amazon.com/images/I/71O3pb49OwL._AC_SX466_.jpg'
            ]),
        new Item("Audio card", 5000, "RUB",
            [
                'https://images-na.ssl-images-amazon.com/images/I/411rdurQRkL._AC_SX466_.jpg',
                'https://www.bhphotovideo.com/images/images2500x2500/asus_xonar_ae_7_1_channel_1376513.jpg',
                'https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/F/Q/144499_1542988168.jpg'
            ]),
        new Item("Network card", 3500, "RUB",
            [
                'https://go3.imgsmail.ru/imgpreview?key=71b9a24bcb870424&mb=storage&w=540',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR221m9d-VDV9yeksoJU_8p642vDfN7n0zNnQ&usqp=CAU',
                'https://ae01.alicdn.com/kf/HTB15QlhIbSYBuNjSspfq6AZCpXaS/Network-Card-4-Port-Gigabit-Ethernet-10-100-1000M-PCI-E-PCI-Express-to-4x-Gigabit.jpg'
            ]),
        new Item("Processor", 30000, "RUB",
            [
                'https://avatars.mds.yandex.net/get-mpic/199079/img_id5210718286443252348/orig',
                'https://i2.wp.com/nopcproblem.ru/wp-content/uploads/2019/08/intel-processor-500x500.jpg?fit=500%2C332&ssl=1',
                'https://3dnews.ru/assets/external/illustrations/2019/09/18/994271/Core-i9-10900X_01.jpg'
            ]),
    ]
    return listItems;
}

shoppingCart = new ShoppingCart();

listItems = new Items(shoppingCart);
//listItems = new Items(shoppingCart,appendItemToItems());
//console.log(JSON.stringify(listItems.listItems));







