var listProductsForCatalog = [];

async function getProducts() {
    let response = await fetch("http://localhost:3000/products");

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        {
            products = await response.json();
            products.forEach(function (product) {
                listProductsForCatalog.push(new Product(product.name, product.price, product.images));
            });
        }
    }
    else {
        alert("Ошибка HTTP: " + response.status);
    }
}

async function Show() {

    const listProductsInBasket = [];

    await getProducts();

    const webModal = new WebModal();

    const basket = new Basket(listProductsInBasket);

    const webBasket = new WebBasket(basket);
    webBasket.Show();

    const catalog = new WebСatalog(listProductsForCatalog, webBasket, webModal);
    catalog.Show();
}