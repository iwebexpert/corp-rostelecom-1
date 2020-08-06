class Burger {
  constructor(baseStuffing = null) {
    this._stuffings = baseStuffing ? [baseStuffing] : [];
    this._price = 0;
    this._calories = 0;
    this._isSmall = true;
    this._src = 'https://krolikbro.ru/source/catalogUnit/miniatures/bulka.png';
    this.resize(true);
  }
  get src() { return this._src; }
  get stuffings() { return this._stuffings || []; }
  get size() {
    return this._isSmall
      ? 'Маленький бургер'
      : 'Большой бургер';
  }
  get cost() {
    return this._price + this._stuffings.reduce((sum, item) => sum + item.price, 0);
  }
  get calories() {
    return this._calories + this._stuffings.reduce((sum, item) => sum + item.calories, 0);
  }
  addStuffing(stuffing) {
    this.stuffings.push(stuffing);
  }
  removeStuffing(stuffing) {
    const stuffingIndex = this.stuffings.findIndex(i => i instanceof stuffing.constructor);
    if (stuffingIndex >= 0 && this.stuffings.length < 1) {
      throw new Error("Обязательно должна быть хотя бы одна начинка");
    }
    if (stuffingIndex < 0) {
      throw new Error("Такой начинки нет в гамбургере");
    }
    return this.stuffings.splice(stuffingIndex, 1);
  }
  hasStuffing(stuffing) {
    return this.stuffings.some(i => i instanceof stuffing.constructor)
  }
  resize(isSmall) {
    this._isSmall = isSmall;
    if (isSmall) {
      this._price = 50;
      this._calories = 20;
    } else {
      this._price = 100;
      this._calories = 40;
    }
  }
}
