import { Customer } from "@/domain/customer/entity/customer";
import { Address } from "@/domain/customer/value-objects/address";
import { randomUUIDv7 } from "bun";
import { describe, expect, it, jest } from "bun:test";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = new Customer(
  randomUUIDv7(),
  "John Doe",
  new Address("Street 1", 1, "123-456", "City 1"),
  true
);

const input = {
  id: customer.id,
  name: "John Doe 2",
  address: {
    street: "Street 2",
    number: 1,
    zip: "123-457",
    city: "City 2",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  };
};

describe("Unit test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();

    const updatedCustomerUseCase = new UpdateCustomerUseCase(
      customerRepository
    );

    const output = await updatedCustomerUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
