// Корзина товаров
class GoodsCart {
    async fetchGoods(callback) {
        const data = await ajax.GET('getBasket.json');
        this._amount = (data || {}).amount || 0;
        this._goods = (data || {}).contents || [];
        this._count = (data || {}).countGoods || 0;
        if (callback && typeof callback === 'function') {
            callback();
        }
    }
    render(domId) {
        const el = document.getElementById(domId);
        el.innerHTML = '';
        this._goods.forEach(good => {
            const goodItem = new CartGoodsItem(
                good.product_id,
                good.product_name,
                good.price,
                good.quantity
            );
            el.appendChild(goodItem.dom());
        });
        const summary = document.createElement('div');
        summary.className = 'cart__summary';
        summary.innerHTML = `В корзине: ${this._count} товаров на сумму <b>${this._amount} руб.</b>`;
        el.appendChild(summary);
    }
}
