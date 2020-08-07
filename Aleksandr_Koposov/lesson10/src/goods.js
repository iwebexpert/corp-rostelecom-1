// Каталог
class GoodsList {
    async fetchGoods(callback) {
        const data = await ajax.GET('catalogData.json');
        this._goods = data || [];
        if (callback && typeof callback === 'function') {
            callback();
        }
    }
    render(domId) {
        const el = document.getElementById(domId);
        el.innerHTML = '';
        this._goods.forEach(good => {
            const goodItem = new GoodsItem(
                good.product_id,
                good.product_name,
                good.price
            );
            el.appendChild(goodItem.dom());
        });
    }
}
