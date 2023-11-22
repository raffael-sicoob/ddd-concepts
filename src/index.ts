import { Customer } from "./entity/customer.entity";
import { Address } from "./entity/value-objects/address";

const customer = new Customer(
  "1",
  "Raffa  ",
  new Address("Street", 23, "12345-678", "City"),
  true
);

console.log(customer.address);
