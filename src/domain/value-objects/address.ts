export class Address {
  constructor(
    private street: string,
    private number: number,
    private zip: string,
    private city: string
  ) {
    this.validate();
  }

  private validate() {
    if (
      this.street.length === 0 ||
      this.number === 0 ||
      this.zip.length === 0 ||
      this.city.length === 0
    ) {
      throw new Error("Address is not valid. All fields are required.");
    }
  }

  get streetName(): string {
    return this.street;
  }

  get streetNumber() {
    return this.number;
  }

  get zipCode() {
    return this.zip;
  }

  get cityName() {
    return this.city;
  }

  toString() {
    return `${this.street}, ${this.number}, ${this.zip}, ${this.city}`;
  }
}
