// Товар в каталоге
class GoodsItem {
    constructor(id, name, price) {
        this._id = id;
        this._name = name;
        this._price = price;
    }
    get id() { return this._id; }
    get name() { return this._name; }
    get price() { return this._price; }
    dom() {
        const product = document.createElement('div');
        product.className = 'card';
        product.innerHTML = `<div class="product">
                <div class="product__name">${this.name}</div>
                <div class="product__price">
                    <div class="price__text">${this.price}</div>
                    <div class="price__currency">руб.</div>
                </div>
            </div>`;
        const actions = document.createElement('div');
        actions.className = 'card__actions';
        const toCartBtn = document.createElement('a');
        toCartBtn.className = 'btn btn-accent btn-block';
        toCartBtn.innerHTML = 'В корзину';
        toCartBtn.addEventListener('click', this.addToCart);
        actions.appendChild(toCartBtn);
        product.appendChild(actions);
        return product;
    }
    async addToCart() {
        await ajax.POST('addToBasket.json', this.id);
    }
}

// Товар в корзине
class CartGoodsItem extends GoodsItem {
    constructor(id, name, price, count) {
        super(id, name, price);
        this._count = count || 1;
    }
    get count() { return this._count; }
    dom() {
        const product = document.createElement('div');
        product.className = 'row';
        product.innerHTML = `<div class="product">
                <div class="product__name">${this.name}</div>
                <div class="product__count text--primary">x<b>${this.count}</b></div>
                <div class="product__price">
                    <div class="price__text">${this.price}</div>
                    <div class="price__currency">руб.</div>
                </div>
            </div>`;
        const actions = document.createElement('div');
        actions.className = 'row__actions';
        const toCartBtn = document.createElement('a');
        toCartBtn.className = 'btn btn-circle btn-red';
        toCartBtn.innerHTML = '&ndash;';
        toCartBtn.addEventListener('click', this.removeFromCart);
        actions.appendChild(toCartBtn);
        product.appendChild(actions);
        return product;
    }
    addTocart() { return null; }
    async removeFromCart() {
        await ajax.POST('deleteFromBasket.json', this.id);
    }
}