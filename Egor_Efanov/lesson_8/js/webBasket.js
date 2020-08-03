class WebBasket {
    constructor(basket) {
        this.basket = basket || new Basket();
    }

    get Basket() {
        return this.basket;
    }

    getBasket() {
        return document.getElementById('basket');
    }

    getBasket_Contents() {
        return document.getElementById('basket-contents');
    }

    getBasket_Contents_Caption() {
        return document.getElementById('basket-contents-caption');
    }

    getBasket_Address() {
        return document.getElementById('basket-address');
    }

    getBasket_Comment() {
        return document.getElementById('basket-comment');
    }

    getBasket_Contents_Container() {
        return document.getElementById('basket-contents-container');
    }

    getBasket_Menu() {
        return document.getElementById('basket-menu');
    }



    createBasket() {

        let basket_menu = document.createElement('div');
        basket_menu.textContent = "";
        basket_menu.className = "basket-menu";
        basket_menu.id = "basket-menu";
        _AppendChild(this.getBasket(), basket_menu);

        let aContents = document.createElement('a');
        aContents.href = "#basket-contents";
        aContents.textContent = "Состав корзины";
        aContents.className = "basket-contents-header basket-menu-item";
        aContents.id = "basket-contents-header";
        aContents.onclick = this.a_onclick.bind(this, "basket-contents");
        _AppendChild(this.getBasket_Menu(), aContents);

        let aAddress = document.createElement('a');
        aAddress.href = "#basket-address";
        aAddress.textContent = "Адрес доставки";
        aAddress.className = "basket-address-header basket-menu-item";
        aAddress.id = "basket-address-header";
        aAddress.onclick = this.a_onclick.bind(this, "basket-address");
        _AppendChild(this.getBasket_Menu(), aAddress);

        let aComment = document.createElement('a');
        aComment.href = "#basket-comment";
        aComment.textContent = "Комментарий";
        aComment.className = "basket-comment-header basket-menu-item";
        aComment.id = "basket-comment-header";
        aComment.onclick = this.a_onclick.bind(this, "basket-comment");
        _AppendChild(this.getBasket_Menu(), aComment);


        let basket_contents = document.createElement('div');
        basket_contents.textContent = "";
        basket_contents.className = "basket-contents";
        basket_contents.id = "basket-contents";
        _AppendChild(this.getBasket(), basket_contents);



        let caption = document.createElement('div');
        caption.textContent = "";
        caption.className = "basket-contents-caption";
        caption.id = "basket-contents-caption";
        _AppendChild(this.getBasket_Contents(), caption);


        let contentsContainer = document.createElement('div');
        contentsContainer.textContent = "";
        contentsContainer.className = "basket-contents-container";
        contentsContainer.id = "basket-contents-container";
        _AppendChild(this.getBasket_Contents(), contentsContainer);


        let btnClearAll = document.createElement('button');
        btnClearAll.textContent = "Очистить корзину";
        btnClearAll.className = "basket-contents-button-сlear-all";
        btnClearAll.id = "basket-contents-button-сlear-all";
        btnClearAll.onclick = this.btnClearAll_onclick.bind(this);
        _AppendChild(this.getBasket_Contents(), btnClearAll);

        let btnContentsNext = document.createElement('button');
        btnContentsNext.textContent = "Далее";
        btnContentsNext.className = "basket-contents-button-next";
        btnContentsNext.id = "basket-contents-button-next";
        btnContentsNext.onclick = this.btnNext_onclick.bind(this, "basket-address");
        _AppendChild(this.getBasket_Contents(), btnContentsNext);


        let basket_address = document.createElement('div');
        basket_address.textContent = "";
        basket_address.className = "basket-address";
        basket_address.id = "basket-address";
        _AppendChild(this.getBasket(), basket_address);

        let basket_address_h3 = document.createElement('h4');
        basket_address_h3.textContent = "Адрес доставки";
        basket_address_h3.className = "basket-address-h3";
        basket_address_h3.id = "basket-address-h3";
        _AppendChild(this.getBasket_Address(), basket_address_h3);

        let basket_address_memo = document.createElement('textarea');
        basket_address_memo.className = "basket-address-memo";
        basket_address_memo.id = "basket-address-memo";
        basket_address_memo.cols = 30;
        basket_address_memo.rows = 10;
        basket_address_memo.placeholder = "Введите адрес доставки"
        _AppendChild(this.getBasket_Address(), basket_address_memo);


        let btnAddressNext = document.createElement('button');
        btnAddressNext.textContent = "Далее";
        btnAddressNext.className = "basket-address-button-next";
        btnAddressNext.id = "basket-address-button-next";
        btnAddressNext.onclick = this.btnNext_onclick.bind(this, "basket-comment");
        _AppendChild(this.getBasket_Address(), btnAddressNext);


        let basket_comment = document.createElement('div');
        basket_comment.textContent = "";
        basket_comment.className = "basket-comment";
        basket_comment.id = "basket-comment";
        _AppendChild(this.getBasket(), basket_comment);

        let basket_comment_h3 = document.createElement('h4');
        basket_comment_h3.textContent = "Комментарий";
        basket_comment_h3.className = "basket-comment-h3";
        basket_comment_h3.id = "basket-comment-h3";
        _AppendChild(this.getBasket_Comment(), basket_comment_h3);

        let basket_comment_memo = document.createElement('textarea');
        basket_comment_memo.className = "basket-comment-memo";
        basket_comment_memo.id = "basket-comment-memo";
        basket_comment_memo.cols = 30;
        basket_comment_memo.rows = 10;
        basket_comment_memo.placeholder = "Введите комментарий"
        _AppendChild(this.getBasket_Comment(), basket_comment_memo);



        let btnCommentNext = document.createElement('button');
        btnCommentNext.textContent = "Далее";
        btnCommentNext.className = "basket-comment-button-next";
        btnCommentNext.id = "basket-comment-button-next";

        _AppendChild(this.getBasket_Comment(), btnCommentNext);
    }


    a_onclick(div) {
        let div_ = ["basket-contents", "basket-address", "basket-comment"];
        for (let i = 0; i < div_.length; i++) {
            let el_ = document.getElementById(div_[i]);
            if (el_ != null) {
                if (div_[i] == div)
                    el_.style.display = (el_.style.display == 'flex') ? 'none' : 'flex';
                else
                    el_.style.display = 'none';
            }
        }
        return false;
    }

    btnNext_onclick(div) {
        this.a_onclick(div);
    }


    btnClear_onclick(name) {
        let span = document.getElementById("span-" + name);
        if (span != null)
            span.classList.remove("visible");

        this.basket.clearProduct(name);

        this.Refresh();
    }


    btnClearAll_onclick() {
        let span = document.getElementsByClassName("span");
        for (let i = 0; i < span.length; i++)
            span[i].classList.remove("visible");

        this.basket.clearAll(name);

        this.Refresh();
    }

    createBasketContents() {
        if (this.getBasket_Contents_Container() != null)
            this.getBasket_Contents_Container().innerHTML = "";

        for (let i = 0; i < this.basket.ListProducts.length; i++) {
            let content = document.createElement('div');
            content.textContent = this.basket.ListProducts[i].Name + " - " + this.basket.ListProducts[i].Count;
            content.className = "basket-contents-container-product";
            content.id = "basket-contents-container-product-" + this.basket.ListProducts[i].Name;
            _AppendChild(this.getBasket_Contents_Container(), content);

            let btnClear = document.createElement('button');
            btnClear.textContent = "Убрать из корзины";
            btnClear.className = "basket-contents-container-product-button-сlear";
            btnClear.onclick = this.btnClear_onclick.bind(this, this.basket.ListProducts[i].Name);
            _AppendChild(document.getElementById("basket-contents-container-product-" + this.basket.ListProducts[i].Name), btnClear);
        }
    }

    ShowEmpty() {
        this.getBasket_Contents_Caption().classList.add("basket-empty");
        this.getBasket_Contents_Caption().textContent = "Корзина пуста";
    }

    ShowNoEmpty() {
        this.getBasket_Contents_Caption().textContent = this.basket.getText();
        this.getBasket_Contents_Caption().classList.remove("basket-empty");
    }


    Show() {
        this.createBasket();
    }

    Refresh() {
        this.createBasketContents();

        if (this.basket.Count == 0)
            this.ShowEmpty();
        else
            this.ShowNoEmpty();
    }

} 