export class OrderItem {
  constructor(
    private _id: string,
    private _productId: string,
    private _name: string,
    private _price: number,
    private _quantity: number
  ) {}
  get price() {
    return this._price;
  }

  get quantity() {
    return this._quantity;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }
}
