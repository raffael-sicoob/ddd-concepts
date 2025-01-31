import { CustomerRepositoryInterface } from "@/domain/customer/repository/customer-repository-interface";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "./find.customer.dto";

export default class FindCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.streetName,
        number: customer.Address.streetNumber,
        zip: customer.Address.zipCode,
        city: customer.Address.cityName,
      },
    };
  }
}
