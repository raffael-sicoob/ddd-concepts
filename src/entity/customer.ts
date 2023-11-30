import { Address } from "../value-objects/address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address: Address;
  private _active: boolean;

  constructor(id: string, name: string, address: Address, active: boolean) {
    this._id = id;
    this._name = name;
    this._address = address;
    this._active = active;
    this.validade();
  }

  private validade() {
    if (this._name.length === 0 || this._name.match(/^\s*$/))
      throw new Error("Name is required");

    if (this._id.length === 0) throw new Error("Id is required");

    this._name = this._name.trim();
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address.toString();
  }

  changeName(name: string) {
    this._name = name;
    this.validade();
  }

  activate() {
    if (!this._address)
      throw new Error("Address is mandatory to activate a customer");
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  get isActive() {
    return this._active;
  }
}
