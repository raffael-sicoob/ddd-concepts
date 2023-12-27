import { Address } from "@/domain/customer/value-objects/address";
import { describe, expect, it } from "bun:test";
import { Customer } from "./customer";

const address = new Address("Rua dos Bobos", 12, "88117013", "São Paulo");

describe("Customer unit tests", () => {
	it("should throw error when id is empty", () => {
		expect(() => {
			const customer = new Customer("", "John", address, true);
		}).toThrow("Id is required");
	});

	it("should throw error when name is empty", () => {
		expect(() => {
			const customer = new Customer("133", "", address, true);
		}).toThrow("Name is required");
	});

	it("should change name", () => {
		// Arrange
		const customer = new Customer("133", "John", address, true);
		// Act
		customer.changeName("John Doe");
		// Assert
		expect(customer.name).toBe("John Doe");
	});

	it("should activate  and deactivate a customer", () => {
		// Arrange
		const customer = new Customer("133", "John", address, false);
		// Act
		customer.activate();
		// Assert
		expect(customer.isActive).toBe(true);

		customer.deactivate();
		expect(customer.isActive).toBe(false);
	});

	it("should add reward points", () => {
		const customer = new Customer("133", "John", address, true);
		expect(customer.rewardPoints).toBe(0);

		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(10);

		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(20);
	});
});
