window.onload = function () {

    class Item { // Item
        constructor(type, price, currency, photo) {
            this.type = type;
            this.price = price;
            this.currency = currency;
            this.photo = photo;
        }

        show() {
            return this.type + '\t' + this.price + '\t' + this.currency;
        }
    }

    const itemsFull = { // All Items for 3* task
        items: [],
        checkInItems(objectItems) { //check item (object) into items
            let checkResult = false;
            if (this.items.length === 0) { // check empty
                return checkResult;
            } else for (let i = 0; i < this.items.length; i++) {
                if (JSON.stringify(this.items[i][0]) === JSON.stringify(objectItems)) {
                    checkResult = true;
                }
            }
            return checkResult;
        },
        addItems(objectItems) { // add
            if (!this.checkInItems(objectItems)) {
                this.items.push(objectItems);
            }
        },
        searchItemsId(type) { //search Item
            for (let i = 0; i < this.items.length; i++) {
                //console.log(this.items[i])
                if (this.items[i].type === type) {
                    return i;
                }
            }
        }
    }

    const shoppingCart = {
        items: [],
        checkInItems(objectItems) { //check item (object) into items
            let checkResult = false;
            if (!this.items.length) { // check empty
                return checkResult;
            } else for (let i = 0; i < this.items.length; i++) {
                if (JSON.stringify(this.items[i][0]) === JSON.stringify(objectItems)) {
                    checkResult = i;
                }
            }
            return checkResult;
        },
        addItems(objectItems) { // add
            if (this.checkInItems(objectItems) !== false) {
                this.items[this.checkInItems(objectItems)][1]++;
            } else {
                this.items.push([objectItems, 1]);
            }
        },
        deleteItems(objectItems) { // delete
            if (this.items[this.checkInItems(objectItems)][1]) {
                if (this.items[this.checkInItems(objectItems)][1] > 1) {
                    this.items[this.checkInItems(objectItems)][1]--;
                } else {
                    this.items.splice(this.checkInItems(objectItems), 1);
                }
            } else return 0;
        },
        deleteItemsAll(objectItems) { // Delete All Quantity Item
            if (this.checkInItems(objectItems) !== false) {
                this.items.splice(this.checkInItems(objectItems), 1);
            } else {
                return false;
            }
        },
        getQuantity(objectItems) { // get Quantity Item
            if (this.checkInItems(objectItems) !== false) {
                return this.items[this.checkInItems(objectItems)][1];
            } else {
                return false;
            }
        },
        show() {
            for (let i = 0; i < this.items.length; i++) {
                console.log(this.items[i][0].show(), `\t|\tQuantity: ${this.items[i][1]}`);
                //console.log(this.items[i][0].show(), `Quantity: ${shoppingCart.items[i][1]}`);
            }
        },
        showItem(id) { // show one item
            return this.items[id][0].show() + `\tQuantity: ${shoppingCart.items[id][1]}`;
        },
        countBasketPrice() { // count Price
            let amountPrice = 0;
            for (let i = 0; i < this.items.length; i++) {
                amountPrice += this.items[i][0].price * this.items[i][1];
            }
            return amountPrice;
        },
        countQuantityItems() { // count all Quantity Items
            let amountQuantityItems = 0;
            for (let i = 0; i < this.items.length; i++) {
                amountQuantityItems += this.items[i][1];
            }
            return amountQuantityItems;
        }

    }
    //Add item
    const keyboard = new Item("Keyboard", 1500, "RUB", {photo1: 'img/keyboard-1.jpg', photo2: 'img/keyboard-2.jpg'});
    const mouse = new Item("Mouse", 500, "RUB", {
        photo1: 'https://resource.logitechg.com/w_659,c_limit,f_auto,q_auto:best,f_auto,dpr_2.0/content/dam/gaming/en/products/pro-mouse/promouse-hero.png?v=1',
        photo2: 'https://thermaltake.azureedge.net/pub/media/catalog/product/cache/25e62158742be0ef47d2055284094406/l/2/l20m01.jpg'
    });
    const monitor = new Item("Monitor", 10000, "RUB", {photo1: 'img/monitor-1.jpg', photo2: 'img/monitor-2.jpg'});
    const cover = new Item("Cover", 750, "RUB", {
        photo1: 'https://imag.malavida.com/mvimgbig/download-fs/cover-strike-26032-3.jpg',
        photo2: 'https://image.made-in-china.com/202f0j10kKYEvsCthbcr/Rug-Mouse-Pad-Mouse-Rug-Mouse-Pad-Rug.jpg'
    });
    const table = new Item("Table", 6500, "RUB", {
        photo1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR4-KQbG8OFy0h4dCVzE9RBLBfzcQEKPfO0Mw&usqp=CAU',
        photo2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRK9DyhSexu1XfLX_uJpNe-BE89z92iK0AOKg&usqp=CAU'
    });
    const bucket = new Item("Bucket", 1100, "RUB", {
        photo1: 'https://media.screwfix.com/is/image/ae235/64253_P?$p$',
        photo2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4qG2OOFabsoxCfFt7ZrUF5MFIp1I47fZzWg&usqp=CAU'
    });
    const speakers = new Item("Speakers", 3000, "RUB", {
        photo1: 'https://www.bhphotovideo.com/images/images2000x2000/kanto_living_yu6gb_yu6_obsidian_gloss_black_1304091.jpg',
        photo2: 'https://cnet2.cbsistatic.com/img/slMJOm3qmuMYcu3o3TvJ48uwy2c=/868x488/2018/03/02/15a1ce4e-1af7-481d-8a7f-7c84e53615c9/01-elac-debut-2-0-6-2.jpg'
    });
    const videoCard = new Item("Video card", 27000, "RUB", {
        photo1: 'https://images-na.ssl-images-amazon.com/images/I/71SL67VQMlL._AC_SL1500_.jpg',
        photo2: 'https://images-na.ssl-images-amazon.com/images/I/71O3pb49OwL._AC_SX466_.jpg'
    });
    const processor = new Item("Processor", 30000, "RUB", {
        photo1: 'https://avatars.mds.yandex.net/get-mpic/199079/img_id5210718286443252348/orig',
        photo2: 'https://i2.wp.com/nopcproblem.ru/wp-content/uploads/2019/08/intel-processor-500x500.jpg?fit=500%2C332&ssl=1'
    });
    const audioCard = new Item("Audio card", 5000, "RUB", {
        photo1: 'https://images-na.ssl-images-amazon.com/images/I/411rdurQRkL._AC_SX466_.jpg',
        photo2: 'https://www.bhphotovideo.com/images/images2500x2500/asus_xonar_ae_7_1_channel_1376513.jpg'
    });
    const networkCard = new Item("Network card", 3500, "RUB", {
        photo1: 'https://go3.imgsmail.ru/imgpreview?key=71b9a24bcb870424&mb=storage&w=540',
        photo2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR221m9d-VDV9yeksoJU_8p642vDfN7n0zNnQ&usqp=CAU'
    });

    //Show item
    // console.log(keyboard.show());
    // console.log(audioCard.show());
    // console.log(networkCard.show());

    //All items
    itemsFull.addItems(keyboard);
    itemsFull.addItems(mouse);
    itemsFull.addItems(monitor);
    itemsFull.addItems(cover);
    itemsFull.addItems(table);
    itemsFull.addItems(bucket);
    itemsFull.addItems(speakers);
    itemsFull.addItems(videoCard);
    itemsFull.addItems(processor);
    itemsFull.addItems(audioCard);
    itemsFull.addItems(networkCard);


    //console.log(itemsFull);

    // Add items in Shopping Cart
    // shoppingCart.addItems(keyboard);
    // shoppingCart.addItems(keyboard);
    // shoppingCart.addItems(keyboard);
    // shoppingCart.addItems(keyboard);
    // shoppingCart.addItems(monitor);
    // shoppingCart.addItems(monitor);
    // shoppingCart.addItems(table);
    // shoppingCart.addItems(table);
    // shoppingCart.addItems(table);
    // shoppingCart.addItems(bucket);
    // shoppingCart.addItems(processor);
    // shoppingCart.deleteItems(processor);
    // shoppingCart.deleteItems(table);
    // shoppingCart.deleteItems(table);
    // shoppingCart.deleteItems(table);

    function showAllItems(itemsFull) { //3* task

        const itemsDiv = document.querySelector('.items'); // items div

        const itemsHeader = document.createElement('h2');
        itemsHeader.classList.add("itemsH2"); // h2
        itemsHeader.textContent = 'Products';
        itemsDiv.appendChild(itemsHeader);

        for (let i = 0; i < itemsFull.items.length; i++) { // add all items from itemsFull

            const addItemDiv = document.createElement('div');
            addItemDiv.classList.add("itemDiv"); // div for one Item
            itemsDiv.appendChild(addItemDiv);
            const addItemP = document.createElement('p');
            addItemP.classList.add("itemP"); // p for one Item
            addItemP.textContent = `${itemsFull.items[i].type} ${itemsFull.items[i].price} ${itemsFull.items[i].currency}`;
            addItemDiv.appendChild(addItemP);
            const addItemDivImg = document.createElement('img');//div img for Item
            addItemDivImg.classList.add('itemImg');
            //console.log(itemsFull.items[i].photo.photo1)
            addItemDivImg.setAttribute('src', `${itemsFull.items[i].photo.photo1}`);
            addItemDiv.appendChild(addItemDivImg);
            const addItemDivModalDiv = document.createElement('div'); //Modal window
            addItemDivModalDiv.classList.add('itemModal');
            addItemDivModalDiv.style.display = 'none';
            addItemDiv.appendChild(addItemDivModalDiv);
            const addItemDivModalParent = document.createElement('div'); //Modal window
            addItemDivModalParent.classList.add('itemModalParent');
            addItemDivModalDiv.appendChild(addItemDivModalParent);
            const addItemDivImgFull = document.createElement('img');//div img for Item
            addItemDivImgFull.classList.add('itemImgFull');
            //console.log(itemsFull.items[i].photo.photo1)
            addItemDivImgFull.setAttribute('src', `${itemsFull.items[i].photo.photo1}`);
            addItemDivModalParent.appendChild(addItemDivImgFull);
            //addItemDivModalDiv.appendChild(addItemDivImg);
            const addItemDivModalClose = document.createElement('p');
            addItemDivModalClose.classList.add('itemModalClose');
            addItemDivModalClose.textContent = 'X';
            addItemDivModalParent.appendChild(addItemDivModalClose);
            const addItemButton = document.createElement('button');
            addItemButton.classList.add("itemButton"); // div for one Item
            addItemButton.setAttribute('id', `items-${i}`) // for add to shoppingCart
            addItemButton.textContent = 'Buy';
            addItemDiv.appendChild(addItemButton);
        }

    }

    function showShoppingCart(shoppingCart) { // Show Shopping Cart

        const shoppingCartDiv = document.querySelector('.shoppingCart'); // shoppingCart div

        const shoppingCartContainer = document.createElement('div');
        shoppingCartContainer.classList.add("shoppingCartContainer");
        shoppingCartDiv.appendChild(shoppingCartContainer);

        const shoppingCartH2 = document.createElement('h2');
        shoppingCartH2.classList.add("shoppingCarH2"); // h2
        shoppingCartH2.textContent = 'Shopping Cart';
        shoppingCartContainer.appendChild(shoppingCartH2);

        const shoppingCartItems = document.createElement('div');
        shoppingCartItems.classList.add("shoppingCartItems");
        shoppingCartContainer.appendChild(shoppingCartItems);

        const shoppingCartEmpty = document.createElement('h2');
        shoppingCartEmpty.classList.add('shoppingCartEmpty'); // info about Empty shopping Cart
        shoppingCartEmpty.textContent = 'Shopping Cart is empty!';
        shoppingCartItems.appendChild(shoppingCartEmpty);
        if (shoppingCart.items.length !== 0) { // when shopping Cart is empty hide h2 info
            shoppingCartEmpty.style.display = 'none';
        }

        for (let i = 0; i < shoppingCart.items.length; i++) { // show all items from shoppingCart.items

            const addShoppingCartDiv = document.createElement('div');
            addShoppingCartDiv.classList.add("shoppingCartDiv"); // div for one shoppingCart
            shoppingCartItems.appendChild(addShoppingCartDiv);
            const addShoppingCartP = document.createElement('p');
            addShoppingCartP.classList.add("shoppingCartP"); // p for one shoppingCart
            addShoppingCartP.textContent = shoppingCart.showItem(i);
            addShoppingCartDiv.appendChild(addShoppingCartP);
            const addShoppingCartButton = document.createElement('button');
            addShoppingCartButton.classList.add("shoppingCartButton"); // div for one shoppingCart
            //console.log(shoppingCart.items[i][0].type);
            addShoppingCartButton.setAttribute('id', `shoppingCarts-${itemsFull.searchItemsId(shoppingCart.items[i][0].type)}`); // for delete from shoppingCart
            addShoppingCartButton.textContent = 'Delete';
            addShoppingCartDiv.appendChild(addShoppingCartButton);
            const addShoppingCartButtonAll = document.createElement('button');
            addShoppingCartButtonAll.classList.add("shoppingCartButtonAll"); // div for one shoppingCart
            addShoppingCartButtonAll.setAttribute('id', `shoppingCartsAll-${itemsFull.searchItemsId(shoppingCart.items[i][0].type)}`); // for delete All from shoppingCart
            addShoppingCartButtonAll.textContent = 'Delete All';
            addShoppingCartDiv.appendChild(addShoppingCartButtonAll);
        }

        const amountPrice = document.createElement("p"); // total items + price
        amountPrice.textContent = `Total: ${shoppingCart.countQuantityItems()} items worth ${shoppingCart.countBasketPrice()} RUB`;
        amountPrice.classList.add('shoppingCartAmountPrice');
        shoppingCartItems.appendChild(amountPrice);
        const deleteAllItemsFromSC = document.createElement("button"); // clear shopping cart
        deleteAllItemsFromSC.classList.add("shoppingCartButtonDeleteAll");
        deleteAllItemsFromSC.textContent = 'Clear Shopping Cart';
        shoppingCartItems.appendChild(deleteAllItemsFromSC);
        const addShoppingCartNextButton = document.createElement('button');
        addShoppingCartNextButton.classList.add("addShoppingCartNextButton");
        addShoppingCartNextButton.textContent = 'Next';
        shoppingCartItems.appendChild(addShoppingCartNextButton);

        const deliveryAddress = document.createElement('div');
        deliveryAddress.classList.add('deliveryAddress');
        shoppingCartDiv.appendChild(deliveryAddress);
        const deliveryAddressH2 = document.createElement('h2');
        deliveryAddressH2.textContent = 'Delivery address';
        deliveryAddressH2.classList.add('deliveryAddressH2');
        deliveryAddress.appendChild(deliveryAddressH2);
        const deliveryAddressDiv = document.createElement('div');
        deliveryAddressDiv.classList.add('deliveryAddressDiv');
        deliveryAddressDiv.innerHTML = `<form action="#" class="deliveryAddressDivForm">
<label for="name">Имя
<input type="text" id="name" name="name" placeholder="Иванов Иван Иванович"><br>
<label for="address">Адрес доставки</label>
<textarea id="address" name="address" rows="2" required></textarea><br>
<label for="tel">Номер телефона
<input type="tel" name="tel" placeholder="+7 (900) 000 11 22"  required></label> 
</form><br>
<button class="deliveryAddressButtonNext">Next</button>`;
        deliveryAddress.appendChild(deliveryAddressDiv);


        const commentsOrder = document.createElement('div');
        commentsOrder.classList.add('commentsOrder');
        shoppingCartDiv.appendChild(commentsOrder);
        const commentsOrderH2 = document.createElement('h2');
        commentsOrderH2.textContent = 'Comments';
        commentsOrderH2.classList.add('commentsOrderH2');
        commentsOrder.appendChild(commentsOrderH2);
        const commentsOrderDiv = document.createElement('div');
        commentsOrderDiv.innerHTML = `<textarea class="commentsOrderDivTextArea" rows="5" required></textarea><br>
<button class="commentsOrderButtonNext">Next</button>`
        commentsOrderDiv.classList.add('commentsOrderDiv');
        commentsOrder.appendChild(commentsOrderDiv);

    }

    function deleteButton() {  // Delete Button
        const allButtonDelete = document.getElementsByClassName("shoppingCartButton"); //  get all button
        for (let i = 0; i < allButtonDelete.length; i++) {  // click on Delete
            allButtonDelete[i].addEventListener('click', function () {
                shoppingCart.deleteItems(itemsFull.items[allButtonDelete[i].getAttribute('id').replace('shoppingCarts-', '')]);// delete from Shopping Cart
                reloadShoppingCart(); // reload Shopping Cart //// i don't understand how this work, but i tried it, and this works // After 10 minutes I understood how it works
            })
        }
    }

    function buyButton() { // Buy Button
        const allButtonBuy = document.getElementsByClassName("itemButton"); //  get all button
        for (let i = 0; i < allButtonBuy.length; i++) {  // click  on Buy
            allButtonBuy[i].addEventListener('click', function () {
                shoppingCart.addItems(itemsFull.items[allButtonBuy[i].getAttribute('id').replace('items-', '')]); // тут можно было использовать просто i, но я подумал, что i может не совпадать с id товара, а класс явно указывает какой номер имеет товар внутри itemsFull.items
                reloadShoppingCart(); // reload
            })
        }

    }

    function deleteAllButton() { //Delete All Button
        const allDeleteAllButton = document.getElementsByClassName('shoppingCartButtonAll');
        for (let i = 0; i < allDeleteAllButton.length; i++) {  // click on Delete all
            allDeleteAllButton[i].addEventListener('click', function () {
                shoppingCart.deleteItemsAll(itemsFull.items[allDeleteAllButton[i].getAttribute('id').replace('shoppingCartsAll-', '')]);// delete from Shopping Cart
                reloadShoppingCart(); // reload
            })
        }

    }

    function nextToAddress() {
        const buttonAddShoppingCartNext = document.querySelector('.addShoppingCartNextButton');
        buttonAddShoppingCartNext.addEventListener('click', function () {
            const divDeliveryAddress = document.querySelector('.deliveryAddressDiv');
            const divshoppingCartContainer = document.querySelector('.shoppingCartItems');
            divDeliveryAddress.style.display =  'block';
            divshoppingCartContainer.style.display =  'none';
        })
    }

    function nextToComments() {
        const buttonDeliveryAddressNext = document.querySelector('.deliveryAddressButtonNext');
        buttonDeliveryAddressNext.addEventListener('click', function (event) {
            event.preventDefault();
            const divDeliveryAddress = document.querySelector('.deliveryAddressDiv');
            const divCommentsOrderDiv = document.querySelector('.commentsOrderDiv');
            divCommentsOrderDiv.style.display =  'block';
            divDeliveryAddress.style.display =  'none';

        })
    }


    function clearShoppingCart() {
        const clearShoppingCartButton = document.querySelector('.shoppingCartButtonDeleteAll'); // Button shoppingCartButtonDeleteAll
        clearShoppingCartButton.addEventListener('click', function () {
            const getAllShoppingCartDiv = document.getElementsByClassName('shoppingCartDiv'); // Get All Div Shopping Cart
            for (let i = 0; i < getAllShoppingCartDiv.length; i++) {
                const idItems = getAllShoppingCartDiv[i].childNodes[1].getAttribute('id').replace('shoppingCarts-', ''); // Get ID Items
                shoppingCart.deleteItemsAll(itemsFull.items[idItems]); // Delete All Items  from Shopping Cart

            }
            reloadShoppingCart(); // reload

        })


    }

    function modalWindowOpen() {
        const allPhotoItems = document.querySelectorAll('.itemImg');
        const allModalWindow = document.querySelectorAll('.itemModal');
        //console.log(allPhotoItems);
        //console.log(allModalWindow);
        for (let i = 0; i < allPhotoItems.length; i++) {
            allPhotoItems[i].addEventListener('click', function () {
                allModalWindow[i].style.display = 'flex';
            })
        }
    }

    function modalWindowClose() {
        const allModalWindowClose = document.querySelectorAll('.itemModalClose');
        const allModalWindow = document.querySelectorAll('.itemModal');
        for (let i = 0; i < allModalWindowClose.length; i++) {
            allModalWindowClose[i].addEventListener('click', function () {
                allModalWindow[i].style.display = 'none';
            })
        }
    }

    function modalWindowChangeImg() {
        const allModalItemImgFull = document.querySelectorAll('.itemImgFull');
        for (let i = 0; i < allModalItemImgFull.length; i++) {
            allModalItemImgFull[i].addEventListener('click', function () {
                allModalItemImgFull[i].setAttribute('src', allModalItemImgFull[i].getAttribute('src') === `${itemsFull.items[i].photo.photo1}` ? `${itemsFull.items[i].photo.photo2}` : `${itemsFull.items[i].photo.photo1}`)
            })
        }
    }

    function modalInit() {
        modalWindowChangeImg();
        modalWindowOpen();
        modalWindowClose();

    }

    function reloadShoppingCart() {
        const shoppingCartDelete = document.querySelector('.shoppingCart');
        const shoppingCartDeleted = document.querySelectorAll('.shoppingCart > *'); // delete all div Items in Shopping Cart
        for (let j = 0; j < shoppingCartDeleted.length; j++) { //  delete old Shopping Cart
            shoppingCartDelete.removeChild(shoppingCartDeleted[j]);
        }
        showShoppingCart(shoppingCart); // Shopping Cart
        // reload ended, but next code needed for work button "Delete" and "Delete all"

        deleteButton(); // i don't understand how this work, but i tried it, and this works // After 10 minutes I understood how it works
        deleteAllButton();
        nextToAddress();
        clearShoppingCart();
        nextToComments();
        modalInit();

    }

    showAllItems(itemsFull);
    reloadShoppingCart();
    buyButton();


}