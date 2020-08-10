const listProductsForCatalog = [];


//1.Запрос через xmlHttpRequest
function getProductsXml() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/products'); //Настройка запроса

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status !== 200) {
                return;
            }


            const products = JSON.parse(xhr.responseText); //Данные


            products.forEach(function (product) {
                listProductsForCatalog.push(new Product(product.name, product.price, product.images));

            });

        }
    };

    xhr.send();
}
getProductsXml()

function Show() {

    const listProductsInBasket = [];




    const webModal = new WebModal();

    const basket = new Basket(listProductsInBasket);

    const webBasket = new WebBasket(basket);
    webBasket.Show();
    const catalog = new WebСatalog(listProductsForCatalog, webBasket, webModal);
    catalog.Show();
}




//2. реализация запроса через async await

// async function getProducts() {
//     let response = await fetch("http://localhost:3000/products");

//     if (response.ok) {
//         {
//             products = await response.json();
//             products.forEach(function (product) {
//                 listProductsForCatalog.push(new Product(product.name, product.price, product.images));
//             });
//         }
//     }
//     else {
//         console.log(`error HTTP: ${response.status}`);
//     }
// }



// async function Show() {

//     const listProductsInBasket = [];

//     await getProducts();


//     const webModal = new WebModal();

//     const basket = new Basket(listProductsInBasket);

//     const webBasket = new WebBasket(basket);
//     webBasket.Show();

//     const catalog = new WebСatalog(listProductsForCatalog, webBasket, webModal);
//     catalog.Show();
// }


