class Items  {
    constructor(listItems = [],shoppingCart = []) {
        this.listItems = listItems;
        this.shoppingCart = shoppingCart;
        this.init();
    }
    init(){
        this.show();
        this.addEventBuyButton();
    }

    _checkInItems(item) {
        let checkResult = false;
        if (this.listItems.length) {
            for (let i = 0; i < this.listItems.length; i++) {
                if (JSON.stringify(this.listItems[i]) === JSON.stringify(item)) {
                    return checkResult = i;//вернем индекс объекта
                }
            }
        }
        return checkResult;
    }
    addItem(item){
        if(this._checkInItems(item) === false) {
            this.listItems.push(item);
        }
    }
    deleteItem(item){
        let resultSearch = this._checkInItems(item);
        if(resultSearch !== false) {
            this.listItems.splice(resultSearch,1);
        }
    }
    show(){
        const itemsDiv = document.querySelector('.items');

        itemsDiv.appendChild(new BlockH2('itemsH2','Products').render());

        const allItemsDiv= new Block('allItemsDiv').render();
        itemsDiv.appendChild(allItemsDiv);

        for(let i = 0; i < this.listItems.length; i++) {
            const itemDiv= new Block('itemDiv', 'div',`items-${i}`).render();
            allItemsDiv.appendChild(itemDiv);
            itemDiv.appendChild(new BlockP('itemP', this.listItems[i].show()).render());
            itemDiv.appendChild(new BlockDivWithImg('itemDivImg', this.listItems[i].photo, 'itemImg').render());

            //TODO Modal Window
            const addItemDivModal= new Block('itemModal', 'div').render();
            addItemDivModal.style.display = 'none';
            itemDiv.appendChild(addItemDivModal);
            const addItemDivModalParent= new Block('itemModalParent', 'div').render();
            addItemDivModal.appendChild(addItemDivModalParent);
            addItemDivModalParent.appendChild(new BlockDivWithImg('itemDivImgFull', this.listItems[i].photo, 'itemImgModal').render());
            addItemDivModalParent.appendChild(new Block('itemModalClose', 'div').render());


            itemDiv.appendChild(new BlockButton('itemButton',  'Buy', `itemsButton-${i}`).render());

        }
        const modal =  new Modal();

        // addButtonsClickListeners(document.querySelectorAll('.itemButton'), function () {
        //
        // })
    }
    addEventBuyButton() {
        const allButtonBuy = document.getElementsByClassName("itemButton"); //  get all button
        for (let i = 0; i < allButtonBuy.length; i++) {  // click  on Buy
            allButtonBuy[i].addEventListener('click', (function () {
                let idItems = allButtonBuy[i].getAttribute('id').replace('itemsButton-','');
                this.shoppingCart.addItems(this.listItems[idItems]);
                this.shoppingCart.reloadShoppingCart(); // reload
            }).bind(this))
        }
    }

}


