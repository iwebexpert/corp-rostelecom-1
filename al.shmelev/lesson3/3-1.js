        let i = 1;
        while (i < 100) {
            i++;
            for (let j = 2; j <= i; j++) {
                if (i % j == 0 & j < i) break;
                if (i == j) {
                    console.log(i, " ")
                }
            }
        }
