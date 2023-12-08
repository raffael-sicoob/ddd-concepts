import { Customer } from "@/domain/entity/customer";
import { Address } from "@/domain/value-objects/address";
import { PrismaClient } from "@prisma/client";
import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { randomUUID } from "crypto";
import { prisma } from "../db/prisma/client";
import { CustomerRepository } from "./customer.repository";

const address = new Address("Street 1", 1, "123-234", "City 1");
describe("Customer repository unit tests", () => {
  beforeEach(() => {
    const prisma = new PrismaClient({
      datasourceUrl: Bun.env.DATABASE_URL,
    });

    prisma.$connect();
  });

  afterEach(async () => {
    await prisma.customer.deleteMany({});

    prisma.$disconnect();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const id = randomUUID();
    const customer = new Customer(id, "John", address, true);

    await customerRepository.create(customer);

    const customerCreated = await prisma.customer.findUnique({
      where: {
        id: id,
      },
    });

    expect(customerCreated).toEqual({
      id: id,
      name: "John",
      address: address.toString(),
      active: true,
    });
  });
});
