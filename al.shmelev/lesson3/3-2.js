        const basket = [
            ["Notebook", 25000, "RUB", 1],
            ["Gamepad", 5000, "RUB", 0],
            ["Smartphone", 14000, "RUB", 1],
            ["Lightspot", 1500, "RUB", 3]
        ];

        let price = 0;
        for (let i = 0; i < basket.length; i++) {
            price += basket[i][1] * (basket[i][3]);
        }
        console.log(price);
