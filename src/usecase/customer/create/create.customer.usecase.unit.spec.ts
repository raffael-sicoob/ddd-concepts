import { describe, expect, it, jest } from "bun:test";
import { InputCreateCustomerDto } from "./create.customer.dto";
import CreateCustomerUseCase from "./create.customer.usecase";

const input: InputCreateCustomerDto = {
  name: "John Doe",
  address: {
    street: "Street 1",
    number: 1,
    zip: "123-456",
    city: "City 1",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();

    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: input.address,
    });
  });

  it("should throw an error when name is empty", async () => {
    const customerRepository = MockRepository();

    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    expect(
      Promise.resolve(customerCreateUseCase.execute(input))
    ).rejects.toThrow("Name is required");
  });

  it("should throw an error when street is empty", async () => {
    const customerRepository = MockRepository();

    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    expect(
      Promise.resolve(customerCreateUseCase.execute(input))
    ).rejects.toThrow("Address is not valid. All fields are required.");
  });
});
