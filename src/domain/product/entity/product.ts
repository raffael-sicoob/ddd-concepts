export class Product {
	constructor(
		private _id: string,
		private _name: string,
		private _price: number,
	) {
		this.validate();
	}

	private validate() {
		if (this._id.length === 0) throw new Error("Id is required");
		if (this._name.length === 0) throw new Error("Name is required");
		if (this._price <= 0) throw new Error("Price must be greater than zero");
	}

	changeName(name: string) {
		this._name = name;
		this.validate();
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	changePrice(price: number) {
		this._price = price;
		this.validate();
	}

	get price() {
		return this._price;
	}
}
