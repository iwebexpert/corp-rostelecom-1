class classProduct {
    constructor(id = -1, name = '', description = '', price = 0.0, currency = 'RUB') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = currency;
        this.imgUrls = [];
    };
    renderProduct() {
        let productView = document.createElement('div');
        productView.classList.add('product');
        let productThumbContainer = document.createElement('div');
        productThumbContainer.classList.add('thumbnail');
        productThumbContainer.setAttribute('product_id', this.id);
        let productThumb = document.createElement('img');
        productThumb.alt = 'product image';

        productThumb.src = this.imgUrls[0] ? this.imgUrls[0] : '';
        productThumbContainer.appendChild(productThumb);

        let productHeader = document.createElement('h4');
        productHeader.textContent = this.name;
        productHeader.classList.add('product_name');
        let productDesc = document.createElement('p');
        productDesc.textContent = this.description;
        let productPrice = document.createElement('h5');
        productPrice.textContent = `Цена ${this.price}  ${this.currency}`;

        productView.appendChild(productThumbContainer);
        productView.appendChild(productHeader);
        productView.appendChild(productDesc);
        productView.appendChild(productPrice);

        return productView
    };
};
