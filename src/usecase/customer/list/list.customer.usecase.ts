import { CustomerRepositoryInterface } from "@/domain/customer/repository/customer-repository-interface";
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./list.cutomer.dto";

export class ListCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input?: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    const customersMap = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.streetName,
        number: customer.Address.streetNumber,
        zip: customer.Address.zipCode,
        city: customer.Address.cityName,
      },
    }));
    return {
      customers: customersMap,
    };
  }
}
