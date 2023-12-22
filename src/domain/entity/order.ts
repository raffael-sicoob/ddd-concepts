import { OrderItem } from "./orderItem";

export class Order {
	private _id: string;
	private _customerId: string;
	private _items: OrderItem[];
	private _total: number;

	constructor(id: string, customerId: string, items: OrderItem[]) {
		this._id = id;
		this._customerId = customerId;
		this._items = items;
		this._total = this.total();
		this.validate();
	}

	get id(): string {
		return this._id;
	}

	get customerId(): string {
		return this._customerId;
	}

	get items(): OrderItem[] {
		return this._items;
	}

	private validate() {
		if (this._id.length === 0) throw new Error("Id is required");

		if (this._customerId.length === 0)
			throw new Error("CustomerId is required");

		if (this._items.length === 0) throw new Error("Order items are required");

		if (this._items.some((item) => item.quantity <= 0))
			throw new Error("Quantity must be greater than 0");

		return true;
	}

	addItem(item: OrderItem) {
		this._items.push(item);
	}

	removeItem(id: string) {
		const item = this._items.find((item) => item.id === id);
		if (!item) throw new Error("Item not found");
		this._items.splice(this._items.indexOf(item), 1);
	}

	total(): number {
		return this._items.reduce(
			(total, item) => total + item.orderItemTotal(),
			0,
		);
	}
}
