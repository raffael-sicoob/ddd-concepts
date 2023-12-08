import { CustomerRepositoryInterface } from "@/domain/repository/customer-repository-interface";
import { prisma } from "../db/prisma/client";
import { Customer } from "./../../domain/entity/customer";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await prisma.customer.create({
      data: {
        id: entity.id,
        name: entity.name,
        address: entity.address,
        active: entity.isActive,
      },
    });
  }
  update(entity: Customer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }
}
