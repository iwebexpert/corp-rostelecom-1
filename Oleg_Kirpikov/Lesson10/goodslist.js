class GoodsList {
    constructor() { };

    makeGETRequest(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject();
                    };
                    resolve(JSON.parse(xhr.responseText));
                };
            };
            console.log(url);
            xhr.open('GET', url, true);
            xhr.send();
        });
    };

    fetchGoods(url) {
        return new Promise((resolve) => {
            this.makeGETRequest(url).then((goods) => {
                resolve(goods);
            });
        });
    };
};
