import { Customer } from "@/domain/customer/entity/customer";
import { Address } from "@/domain/customer/value-objects/address";
import { describe, expect, it, jest } from "bun:test";
import { ListCustomerUseCase } from "./list.customer.usecase";

const customer1 = new Customer(
  Bun.randomUUIDv7(),
  "John Doe",
  new Address("Street 1", 1, "123-456", "City 1"),
  true
);

const customer2 = new Customer(
  Bun.randomUUIDv7(),
  "Jane Doe",
  new Address("Street 2", 2, "123-457", "City 2"),
  true
);

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
});

describe("Unit test list customer use case", () => {
  it("should list all customers", async () => {
    const listCustomerUseCase = new ListCustomerUseCase(MockRepository());

    const { customers } = await listCustomerUseCase.execute();

    expect(customers).toBeArray();
    expect(customers).toHaveLength(2);

    expect(customers[0]).toEqual({
      id: customer1.id,
      name: customer1.name,
      address: {
        street: customer1.Address.streetName,
        number: customer1.Address.streetNumber,
        zip: customer1.Address.zipCode,
        city: customer1.Address.cityName,
      },
    });

    expect(customers[1]).toEqual({
      id: customer2.id,
      name: customer2.name,
      address: {
        street: customer2.Address.streetName,
        number: customer2.Address.streetNumber,
        zip: customer2.Address.zipCode,
        city: customer2.Address.cityName,
      },
    });
  });
});
