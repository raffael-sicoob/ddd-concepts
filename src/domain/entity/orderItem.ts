export class OrderItem {
  constructor(
    private _id: string,
    private _productId: string,
    private _name: string,
    private _price: number,
    private _quantity: number
  ) {}

  get id() {
    return this._id;
  }

  get productId() {
    return this._productId;
  }

  get name() {
    return this._name;
  }
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
