class Items  {
    constructor(shoppingCart = [], listItems = []) {
        this.listItems = listItems;
        this.shoppingCart = shoppingCart;
        this.init();
    }
    init(){
        this._getListItem('/goods'); //вызываем обработчик Promise



    }
    renderItems(){
        const itemsDiv = document.querySelector('.items');
        itemsDiv.innerHTML = '';
        this.show();//Отрисовка товаров
        this.addEventBuyButton(); //Отрисовка товаров
    }
    filterItems(){
        const search = new Search(this.listItems);
        //const test = search.getValueFromSearchLine();
        const searchLine = document.querySelector('.search');
        searchLine.addEventListener('input',(function (event) {
            //console.log(event.target.value)
            console.log(search.filter(event.target.value))
            this.listItems = search.filter(event.target.value);
            console.log(this.listItems,'this.listItems');
            this.renderItems();

        }).bind(this));
    }
    _getListItemsPromise(url) { // Promise  на получение товаров
        return new Promise((resolve, reject) => {
            const httpReq = new XMLHttpRequest();

            httpReq.open('GET', url);

            httpReq.onreadystatechange = function () {
                if (httpReq.readyState === XMLHttpRequest.DONE) {
                    if (httpReq.status !== 200) {
                        reject();
                    }
                    //console.log(JSON.parse(httpReq.responseText));
                    resolve(JSON.parse(httpReq.responseText));
                }

            };

            httpReq.send();
        })
    }
        _getListItem(){ // Обработчик promise
        //console.log(this._getListItemsPromise('/goods'));
        this._getListItemsPromise('/goods').then((goods) => {
            Object.assign(this.listItems, goods);
            this.renderItems();
            this.filterItems();
        }, () => {

        })
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
            itemDiv.appendChild(new BlockP('itemP', this.listItems[i].type + '\t' + this.listItems[i].price + '\t' + this.listItems[i].currency).render());
            itemDiv.appendChild(new BlockDivWithImg('itemDivImg', this.listItems[i].photo, 'itemImg').render());

            //TODO Modal Window
            const addItemDivModal= new Block('itemModal', 'div').render();
            addItemDivModal.style.display = 'none';
            itemDiv.appendChild(addItemDivModal);
            const addItemDivModalParent= new Block('itemModalParent', 'div').render();
            addItemDivModal.appendChild(addItemDivModalParent);
            addItemDivModalParent.appendChild(new BlockDivWithImg('itemDivImgFull', this.listItems[i].photo, 'itemImgModal').render());
            addItemDivModalParent.appendChild(new Block('itemModalClose', 'div').render());
            addItemDivModalParent.appendChild(new BlockDivWithImg('itemModalRightDiv', ['../img/right_icon.png'],'itemModalRight').render());
            addItemDivModalParent.appendChild(new BlockDivWithImg('itemModalLeftDiv', ['../img/left_icon.png'],'itemModalLeft').render());

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


