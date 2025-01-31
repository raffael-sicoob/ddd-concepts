import { Customer } from "@/domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "@/domain/customer/repository/customer-repository-interface";
import { Address } from "@/domain/customer/value-objects/address";
import { randomUUIDv7 as uuid } from "bun";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./create.customer.dto";

export default class CreateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const customerID = uuid();

    const customer = new Customer(
      customerID,
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      ),
      true
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.Address.cityName,
        number: customer.Address.streetNumber,
        street: customer.Address.streetName,
        zip: customer.Address.zipCode,
      },
    };
  }
}
