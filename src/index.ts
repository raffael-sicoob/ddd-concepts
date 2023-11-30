import { Customer } from "./entity/customer";
import { Order } from "./entity/order";
import { OrderItem } from "./entity/orderItem";
import { Address } from "./value-objects/address";

let address = new Address("Rua dos Bobos", 12, "88117013", "São Paulo");
let customer = new Customer("133", "John", address, true);

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 20);

const order = new Order("12334f", "133", [item1, item2]);

console.log(order);
