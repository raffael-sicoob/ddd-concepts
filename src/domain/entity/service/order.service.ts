import { Customer } from "../customer";
import { Order } from "../order";
import { OrderItem } from "../orderItem";

export class OrderService {
  static totalAmount(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0)
      throw new Error("Order must have at least one item");

    const order = new Order(crypto.randomUUID(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);

    return order;
  }
}
