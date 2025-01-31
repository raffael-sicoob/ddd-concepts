import { Customer } from "@/domain/customer/entity/customer";
import { Address } from "@/domain/customer/value-objects/address";
import { describe, expect, it, jest, mock } from "bun:test";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer(
  "1",
  "John",
  new Address("Street 1", 1, "123-234", "City 1"),
  true
);

const MockCustomerRepository = () => ({
  create: jest.fn(),
  find: mock(() => Promise.resolve(customer)),
  update: jest.fn(),
  findAll: jest.fn(),
});

describe("Find customer use case unit tests", () => {
  it("should find a customer", async () => {
    const useCase = new FindCustomerUseCase(MockCustomerRepository());

    const input = { id: "1" };

    const output = await useCase.execute(input);

    const resultOutput = {
      id: "1",
      name: "John",
      address: {
        street: "Street 1",
        number: 1,
        zip: "123-234",
        city: "City 1",
      },
    };
    expect(output).toEqual(resultOutput);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockCustomerRepository();

    customerRepository.find.mockRejectedValue(new Error("Customer not found"));

    const usecase = new FindCustomerUseCase(customerRepository);

    const input = { id: "123" };

    expect(Promise.resolve(usecase.execute(input))).rejects.toThrow(
      "Customer not found"
    );
  });
});
