class Settings {
    init(params) {
        let defaultParams = {
            rowsCount: 20,
            colsCount: 20,
            speed: 2,
            winLenght: 5,
            isRing: false, //Ходить или нет сквозь стены
        };
        Object.assign(defaultParams, params);

        if (defaultParams.rowsCount < 10 || defaultParams.rowsCount > 40) {
            throw new Error('Значение rowsCount должно быть от 10 до 40.');
        }
        this.rowsCount = defaultParams.rowsCount;

        if (defaultParams.colsCount < 10 || defaultParams.colsCount > 40) {
            throw new Error('Значение colsCount должно быть от 10 до 40.');
        }
        this.colsCount = defaultParams.colsCount;

        if (defaultParams.speed < 1 || defaultParams.speed > 10) {
            throw new Error('Значение speed должно быть от 1 до 10.');
        }
        this.speed = defaultParams.speed;

        if (defaultParams.winLenght < 5 || defaultParams.winLenght > 50) {
            throw new Error('Значение winLenght должно быть от 5 до 50.');
        }
        this.winLenght = defaultParams.winLenght;

        this.isRing = defaultParams.isRing;


    }
}