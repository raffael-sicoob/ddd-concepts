import { Address } from "@/value-objects/address";
import { describe, expect, it } from "bun:test";
import { Customer } from "./customer";

let address = new Address("Rua dos Bobos", 12, "88117013", "São Paulo");

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John", address, true);
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("133", "", address, true);
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    // Arrange
    let customer = new Customer("133", "John", address, true);
    // Act
    customer.changeName("John Doe");
    // Assert
    expect(customer.name).toBe("John Doe");
  });

  it("should activate customer", () => {
    // Arrange
    let customer = new Customer("133", "John", address, false);
    // Act
    customer.activate();
    // Assert
    expect(customer.isActive).toBe(true);
  });
});
