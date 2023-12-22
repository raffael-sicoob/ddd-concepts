import { describe, expect, it } from "bun:test";
import { Order } from "./order";
import { OrderItem } from "./orderItem";

describe("Order unit tests", () => {
	it("should throw error when id is empty", () => {
		expect(() => {
			const order = new Order("", "123", []);
		}).toThrow("Id is required");
	});

	it("should throw error when customerId is empty", () => {
		expect(() => {
			const order = new Order("123", "", []);
		}).toThrow("CustomerId is required");
	});

	it("should throw error when order items is empty", () => {
		expect(() => {
			const order = new Order("123", "123", []);
		}).toThrow("Order items are required");
	});

	it("should calculate total", () => {
		const item = new OrderItem("1", "prod1", "item 1", 10, 2);
		const item2 = new OrderItem("2", "prod2", "item 2", 20, 1);
		const order = new Order("123", "123", [item, item2]);

		expect(order.total()).toBe(40);
	});

	it("should throw error when quantity is less or equal zero", () => {
		expect(() => {
			const item = new OrderItem("1", "prod1", "item 1", 10, 0);
			const order = new Order("123", "123", [item]);
		}).toThrow("Quantity must be greater than 0");
	});
});
