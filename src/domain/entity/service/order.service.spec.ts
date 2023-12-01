import { Address } from "@/domain/value-objects/address";
import { describe, expect, it } from "bun:test";
import { Customer } from "../customer";
import { Order } from "../order";
import { OrderItem } from "../orderItem";
import { OrderService } from "./order.service";

describe("Order Service unit tests", () => {
  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "prod1", "Item 1", 100, 1);
    const item2 = new OrderItem("1", "prod2", "Item 2", 20, 5);

    const order1 = new Order("123", "customer1", [item1]);
    const order2 = new Order("124", "customer2", [item2]);

    const total = OrderService.totalAmount([order1, order2]);

    expect(total).toBe(200);
  });

  it("should place on order", () => {
    const address = new Address("Rua dos Bobos", 12, "88117013", "São Paulo");
    const customer = new Customer("123", "John", address, true);

    const item1 = new OrderItem("1", "prod1", "Item 1", 100, 1);
    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(50);
    expect(order.total()).toBe(100);
  });
});
