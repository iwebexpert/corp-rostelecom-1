class WebModal {
    constructor() {
    }

    getModal() {
        return document.getElementById('modal');
    }

    Close() {
        if (this.getModal() != null) {
            this.getModal().classList.remove("open");
            document.onkeydown = null;
        }
    }

    Open() {
        if (this.getModal() != null) {
            this.getModal().classList.add("open");

            document.onkeydown = this.pressKeyHandler.bind(this);

            let button_prev = document.getElementById('modal-button_prev');
            if (button_prev != null)
                button_prev.onclick = this.button_prev_onclick.bind(this);

            let button_next = document.getElementById('modal-button_next');
            if (button_next != null)
                button_next.onclick = this.button_next_onclick.bind(this);
        }
    }

    //Обработка нажатия клавиш
    pressKeyHandler(event) {
        switch (event.key) {
            case 'ArrowLeft':
                this.GetPreviousImg();
                this.SetCurrentImg();
                this.SetCurrentImgMini();
                break;
            case 'ArrowRight':

                this.GetNextImg();
                this.SetCurrentImg();
                this.SetCurrentImgMini();
                break;
            case 'Escape':
                this.Close();
                break;
        }
    }


    productImgMini_onclick(i) {
        this._currentImgIndex = i;
        this.SetCurrentImgMini(i);
        this.SetCurrentImg();
    }

    button_prev_onclick() {
        this.GetPreviousImg();
        this.SetCurrentImg();
        this.SetCurrentImgMini();
    }

    button_next_onclick() {
        this.GetNextImg();
        this.SetCurrentImg();
        this.SetCurrentImgMini();
    }

    Prepare(images, currentImgIndex) {
        this._images = images;
        this._currentImgIndex = currentImgIndex;
        let modal_productListImg = document.getElementById("modal_productListImg");

        modal_productListImg.innerHTML = "";
        for (let i = 0; i < images.length; i++) {
            let productImgMini = document.createElement('img');
            productImgMini.className = "productImg";
            productImgMini.src = images[i];
            productImgMini.alt = "img";
            productImgMini.onclick = this.productImgMini_onclick.bind(this, i);

            _AppendChild(modal_productListImg, productImgMini);
        }

        this.SetCurrentImg();
        this.SetCurrentImgMini();
    }

    GetNextImg() {
        let i = this._currentImgIndex + 1 > this._images.length - 1 ? 0 : this._currentImgIndex + 1;
        this._currentImgIndex = i;
    }

    GetPreviousImg() {
        let i = this._currentImgIndex - 1 < 0 ? this._images.length - 1 : this._currentImgIndex - 1;
        this._currentImgIndex = i;
    }

    SetCurrentImg() {
        let img_productFullImg = document.getElementById("img_productFullImg");
        if (img_productFullImg != null) {
            img_productFullImg.src = this._images[this._currentImgIndex];
        }
    }

    SetCurrentImgMini() {
        let current = document.getElementsByClassName("productImg-current");
        for (let i = 0; i < current.length; i++)
            current[i].classList.remove("productImg-current");

        let productImg = document.getElementsByClassName("productImg");
        for (let i = 0; i < productImg.length; i++) {
            if (i == this._currentImgIndex) {
                productImg[i].classList.add("productImg-current");
                break;
            }
        }
    }
} 