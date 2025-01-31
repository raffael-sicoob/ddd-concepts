import { Customer } from "@/domain/customer/entity/customer";
import { Address } from "@/domain/customer/value-objects/address";
import { prisma } from "@/infrastructure/db/prisma/client";
import { CustomerRepository } from "@/infrastructure/repositories/customer.repository";
import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Find customer use case unit tests", () => {
  beforeEach(() => prisma.$connect());

  afterEach(async () => {
    await prisma.customer.deleteMany({});
    prisma.$disconnect();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();

    await customerRepository.create(
      new Customer(
        "1",
        "John",
        new Address("Street 1", 1, "123-234", "City 1"),
        true
      )
    );

    const useCase = new FindCustomerUseCase(customerRepository);

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
});
