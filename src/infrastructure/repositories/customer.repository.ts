import { CustomerRepositoryInterface } from "@/domain/repository/customer-repository-interface";
import { Address } from "@/domain/value-objects/address";
import { prisma } from "../db/prisma/client";
import { Customer } from "./../../domain/entity/customer";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await prisma.customer.create({
      data: {
        id: entity.id,
        name: entity.name,
        address: {
          create: {
            street: entity.Address.streetName,
            number: entity.Address.streetNumber,
            zip: entity.Address.zipCode,
            city: entity.Address.cityName,
          },
        },
        active: entity.isActive,
        rewardPoints: entity.rewardPoints,
      },
    });
  }
  async update(entity: Customer): Promise<void> {
    await prisma.customer.update({
      where: {
        id: entity.id,
      },
      data: {
        name: entity.name,
        address: {
          update: {
            street: entity.Address.streetName,
            number: entity.Address.streetNumber,
            zip: entity.Address.zipCode,
            city: entity.Address.cityName,
          },
        },
        active: entity.isActive,
      },
    });
  }
  async find(id: string): Promise<Customer> {
    const customerFound = await prisma.customer.findUnique({
      where: {
        id: id,
      },
      include: {
        address: true,
      },
    });

    if (!customerFound) {
      throw new Error("Customer not found");
    }

    return new Customer(
      customerFound.id,
      customerFound.name,
      new Address(
        customerFound.address.street,
        customerFound.address.number,
        customerFound.address.zip,
        customerFound.address.city
      ),
      customerFound.active
    );
  }
  async findAll(): Promise<Customer[]> {
    const customersFound = await prisma.customer.findMany({
      include: {
        address: true,
      },
    });

    return customersFound.map(
      (customer) =>
        new Customer(
          customer.id,
          customer.name,
          new Address(
            customer.address.street,
            customer.address.number,
            customer.address.zip,
            customer.address.city
          ),
          customer.active
        )
    );
  }
}
