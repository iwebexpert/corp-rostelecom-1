class ShoppingCart {
    constructor() {
        this.shoppingCartItems = [];
        this.init();
    }
    init() {
        this._restoreShoppingCartFromLocalStorage();
        this.renderShoppingCart();
    }

    _checkItemInShoppingCart(item) {
        let checkResult = false;
        if (this.shoppingCartItems.length) {
            for (let i = 0; i < this.shoppingCartItems.length; i++) {
                if (JSON.stringify(this.shoppingCartItems[i][0]) === JSON.stringify(item)) {
                    return checkResult = i;//вернем индекс объекта
                }
            }
        }
        return checkResult;
    }
    addItems(item) { // add
        let resultSearch = this._checkItemInShoppingCart(item);
        if (resultSearch !== false) {
            this.shoppingCartItems[resultSearch][1]++;
        } else {
            this.shoppingCartItems.push([item, 1]);
        }
    }
    deleteItems(item) { // delete
        let resultSearch = this._checkItemInShoppingCart(item);
        if (this.shoppingCartItems[resultSearch][1]) {
            if (this.shoppingCartItems[resultSearch][1] > 1) {
                this.shoppingCartItems[resultSearch][1]--;
            } else {
                this.shoppingCartItems.splice(resultSearch, 1);
            }
        }
    }
    deleteItemsById(id) {
        if(this.shoppingCartItems[id][1] > 1) {
            this.shoppingCartItems[id][1]--;
        }
        else {
            this.shoppingCartItems.splice(id, 1);
        }
    }
    deleteItemsAll(item) { // Delete All Quantity Item
        if (this._checkItemInShoppingCart(item) !== false) {
            this.shoppingCartItems.splice(this._checkItemInShoppingCart(item), 1);
        } else {
            return false;
        }
    }
    deleteItemsAllById(id) {
        //console.log(id);
        if(this.shoppingCartItems[id] !== undefined) {
            this.shoppingCartItems.splice(id, 1);
        } else {
            return false;
        }
    }
    getQuantity(item) { // get Quantity Item
        if (this._checkItemInShoppingCart(item) !== false) {
            return this.shoppingCartItems[this._checkItemInShoppingCart(item)][1];
        } else {
            return false;
        }
    }
    showItems() {
        for (let i = 0; i < this.shoppingCartItems.length; i++) {
            console.log(this.shoppingCartItems[i][0].show(), `\t|\tQuantity: ${this.shoppingCartItems[i][1]}`);
            //console.log(this.items[i][0].show(), `Quantity: ${shoppingCart.items[i][1]}`);
        }
    }
    showItem(id) { // show one item
        if (this.shoppingCartItems[id][0] instanceof Item) {
            return this.shoppingCartItems[id][0].show() + `\tQuantity: ${this.shoppingCartItems[id][1]}`;
        }
        return this.shoppingCartItems[id][0].type + '\t' + this.shoppingCartItems[id][0].price + '\t' + this.shoppingCartItems[id][0].currency + `\tQuantity: ${this.shoppingCartItems[id][1]}`;

    }
    countBasketPrice() { // count Price
        let amountPrice = 0;
        for (let i = 0; i < this.shoppingCartItems.length; i++) {
            amountPrice += this.shoppingCartItems[i][0].price * this.shoppingCartItems[i][1];
        }
        return amountPrice;
    }
    countQuantityItems() { // count all Quantity Items
        let amountQuantityItems = 0;
        for (let i = 0; i < this.shoppingCartItems.length; i++) {
            amountQuantityItems += this.shoppingCartItems[i][1];
        }
        return amountQuantityItems;
    }
    renderShoppingCart() {

        const shoppingCartDiv = document.querySelector('.shoppingCart');

        const shoppingCartContainer = new Block('shoppingCartContainer', 'div').render();
        shoppingCartDiv.appendChild(shoppingCartContainer);

        shoppingCartContainer.appendChild(new BlockH2('shoppingCarH2','Shopping Cart').render());

        const shoppingCartItemsDiv = new Block('shoppingCartItemsDiv', 'div').render();
        shoppingCartContainer.appendChild(shoppingCartItemsDiv);

        if (this.shoppingCartItems.length === 0) { // when shopping Cart is empty hide h2 info
            shoppingCartItemsDiv.appendChild(new BlockH2('shoppingCartEmpty', 'Shopping Cart is empty!').render());
        }

        for (let i = 0; i < this.shoppingCartItems.length; i++) {
            //console.log(this.shoppingCartItems)
            const addShoppingCartItemDiv= new Block('addShoppingCartItemDiv', 'div',`items-${i}`).render();
            shoppingCartItemsDiv.appendChild(addShoppingCartItemDiv);
            addShoppingCartItemDiv.appendChild(new BlockP('addShoppingCartItemP', this.showItem(i)).render());
            addShoppingCartItemDiv.appendChild(new BlockButton('shoppingCartButtonDelete',  'Delete', `shoppingCartsDelete-${i}`).render());
            addShoppingCartItemDiv.appendChild(new BlockButton('shoppingCartButtonDeleteAll',  'Delete All', `shoppingCartsDeleteAll-${i}`).render());
        }
        this.deleteButton();
        this.deleteAllButton();


        shoppingCartItemsDiv.appendChild(new BlockP('shoppingCartAmountPrice',`Total: ${this.countQuantityItems()} items worth ${this.countBasketPrice()} RUB`).render());
        shoppingCartItemsDiv.appendChild(new BlockButton('shoppingCartButtonDeleteAllItems',  'Clear Shopping Cart').render());
        this.clearShoppingCartButton();


        const linkToShoppingCartText = document.querySelector('.linkToShoppingCart');
        const priceShoppingCart = document.querySelector('.priceShoppingCart');
        linkToShoppingCartText.textContent = `${this.countQuantityItems()}`;
        priceShoppingCart.textContent = `${this.countBasketPrice()} RUB`;

        shoppingCartItemsDiv.appendChild(new BlockButton('addShoppingCartNextButton',  'Next').render());
        this.nextToAddress();

        const shoppingCartDeliveryAddress = new Block('shoppingCartDeliveryAddress', 'div').render();
        shoppingCartContainer.appendChild(shoppingCartDeliveryAddress);
        shoppingCartDeliveryAddress.appendChild(new BlockH2('deliveryAddressH2','Delivery address').render());
        const deliveryAddressDiv = new Block('deliveryAddressDiv', 'div').render();
        deliveryAddressDiv.innerHTML = `<form action="#" class="deliveryAddressDivForm">
<label for="name">Имя</label>
<input type="text" id="name" name="name" placeholder="Иванов Иван Иванович"><br>
<label for="address">Адрес доставки</label>
<textarea id="address" name="address" rows="2" required></textarea><br>
<label for="tel">Номер телефона</label>
<input type="tel" name="tel" placeholder="+7 (900) 000 11 22"  required> 
</form>
<button class="deliveryAddressButtonNext">Next</button>`;
        deliveryAddressDiv.classList.add('hideBlock');
        shoppingCartDeliveryAddress.appendChild(deliveryAddressDiv);
        this.nextToComments();

        const shoppingCartComments = new Block('shoppingCartComments', 'div').render();
        shoppingCartContainer.appendChild(shoppingCartComments);
        shoppingCartComments.appendChild(new BlockH2('commentsOrderH2','Comments').render());
        const commentsOrderDiv = new Block('commentsOrderDiv', 'div').render();
        commentsOrderDiv.innerHTML = `<textarea class="commentsOrderDivTextArea" rows="5" required></textarea><br>
<button class="commentsOrderButtonNext">Next</button>`;
        commentsOrderDiv.classList.add('hideBlock');
        shoppingCartComments.appendChild(commentsOrderDiv);

        this.clickToBlock();


    }
    nextToAddress() {
        const buttonAddShoppingCartNext = document.querySelector('.addShoppingCartNextButton');

        buttonAddShoppingCartNext.addEventListener('click', function () {
            const divDeliveryAddress = document.querySelector('.deliveryAddressDiv');
            divDeliveryAddress.classList.remove('hideBlock');
            const divshoppingCartContainer = document.querySelector('.shoppingCartItemsDiv');
            divshoppingCartContainer.classList.add('hideBlock');
        })
    }
    nextToComments() {
        const buttonDeliveryAddressNext = document.querySelector('.deliveryAddressButtonNext');

        buttonDeliveryAddressNext.addEventListener('click', function (event) {
            event.preventDefault();
            const divDeliveryAddress = document.querySelector('.deliveryAddressDiv');
            divDeliveryAddress.classList.add('hideBlock');
            const divCommentsOrderDiv = document.querySelector('.commentsOrderDiv');
            divCommentsOrderDiv.classList.remove('hideBlock');

        })
    }
    deleteButton() {  // Delete Button
        const allButtonDelete = document.getElementsByClassName("shoppingCartButtonDelete"); //  get all button
        for (let i = 0; i < allButtonDelete.length; i++) {  // click on Delete
            allButtonDelete[i].addEventListener('click', (function()  {
                this.deleteItemsById(i);// delete from Shopping Cart
                this.reloadShoppingCart(); // reload Shopping Cart //// i don't understand how this work, but i tried it, and this works // After 10 minutes I understood how it works
            }).bind(this));
        }
    }
    deleteAllButton() { //Delete All Button
        const allDeleteAllButton = document.getElementsByClassName('shoppingCartButtonDeleteAll');
        for (let i = 0; i < allDeleteAllButton.length; i++) {  // click on Delete all
            allDeleteAllButton[i].addEventListener('click', (function () {
                this.deleteItemsAllById(i);// delete from Shopping Cart
                this.reloadShoppingCart(); // reload
            }).bind(this));
        }

    }
    clickToBlock() {
        const allH2 = document.querySelectorAll('h2');
        //console.log(allH2);
        for (let j = 0; j < allH2.length; j++) {
            allH2[j].addEventListener('click', function (event) {
                //console.log(event.target.parentNode.parentNode);
                event.target.nextElementSibling.classList.contains('hideBlock') ? event.target.nextElementSibling.classList.remove('hideBlock') : event.target.nextElementSibling.classList.add('hideBlock');

            })
        }
    }
    clearShoppingCartButton() {
        const clearShoppingCartButton = document.querySelector('.shoppingCartButtonDeleteAllItems'); // Button shoppingCartButtonDeleteAll
        clearShoppingCartButton.addEventListener('click', (function () {
            this.shoppingCartItems = [];
            this.reloadShoppingCart();
        }).bind(this));
    }
    deleteShoppingCart() {
        const shoppingCartDelete = document.querySelector('.shoppingCart');
        const shoppingCartDeleted = document.querySelectorAll('.shoppingCart > *'); // delete all div Items in Shopping Cart
        for (let j = 0; j < shoppingCartDeleted.length; j++) { //  delete old Shopping Cart
            shoppingCartDelete.removeChild(shoppingCartDeleted[j]);
        }
    }
    _saveShoppingCartInLocalStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this));
    }
    _restoreShoppingCartFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem('shoppingCart'));
        //console.log(data);
        if(data) {
            for (let i = 0; i < data.shoppingCartItems.length; i++) {
                for (let j = 0; j < data.shoppingCartItems[i][1]; j++) {
                    this.addItems(data.shoppingCartItems[i][0]);
                }
            }
        }


    }

    reloadShoppingCart() {
        this.deleteShoppingCart();
        this.renderShoppingCart();
        this._saveShoppingCartInLocalStorage();


    }


}