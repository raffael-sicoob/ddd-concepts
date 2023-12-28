import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { randomUUID } from "crypto";
import { Customer } from "@/domain/customer/entity/customer";
import { Address } from "@/domain/customer/value-objects/address";
import { prisma } from "../db/prisma/client";
import { CustomerRepository } from "./customer.repository";

const address = new Address("Street 1", 1, "123-234", "City 1");
describe("Customer repository unit tests", () => {
	beforeEach(() => {
		prisma.$connect();
	});

	afterEach(async () => {
		await prisma.customer.deleteMany({});
		await prisma.address.deleteMany({});
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
			include: {
				address: true,
			},
		});
		expect(customerCreated).toMatchObject({
			id: customer.id,
			name: customer.name,
			address: {
				street: customer.Address.streetName,
				number: customer.Address.streetNumber,
				zip: customer.Address.zipCode,
				city: customer.Address.cityName,
			},
			active: customer.isActive,
		});
	});

	it("should update a customer", async () => {
		const customerRepository = new CustomerRepository();
		const id = randomUUID();
		const customer = new Customer(id, "John", address, true);

		await customerRepository.create(customer);

		const customerCreated = await prisma.customer.findUnique({
			where: {
				id: id,
			},
			include: {
				address: true,
			},
		});

		expect(customerCreated).toMatchObject({
			id: id,
			name: "John",
			address: {
				street: "Street 1",
				number: 1,
				zip: "123-234",
				city: "City 1",
			},
			active: true,
		});

		customer.changeName("John Doe");
		customer.deactivate();
		customer.changeAddress(new Address("Street 2", 2, "123-234", "City 2"));

		await customerRepository.update(customer);

		const customerUpdated = await prisma.customer.findUnique({
			where: {
				id: id,
			},
			include: {
				address: true,
			},
		});

		expect(customerUpdated).toMatchObject({
			id: id,
			name: "John Doe",
			address: {
				street: "Street 2",
				number: 2,
				zip: "123-234",
				city: "City 2",
			},
			active: false,
		});
	});

	it("should find a customer", async () => {
		const customerRepository = new CustomerRepository();
		const id = randomUUID();
		const customer = new Customer(id, "John", address, true);

		await customerRepository.create(customer);

		const customerFound = await customerRepository.find(id);

		expect(customerFound).toEqual(customer);
	});

	it("should find all customers", async () => {
		const customerRepository = new CustomerRepository();
		const customer1 = new Customer(randomUUID(), "John", address, true);
		const customer2 = new Customer(randomUUID(), "Jane", address, true);
		const customer3 = new Customer(randomUUID(), "Mary", address, true);

		await customerRepository.create(customer1);
		await customerRepository.create(customer2);
		await customerRepository.create(customer3);

		const customersFound = await customerRepository.findAll();
		const customers = [customer1, customer2, customer3];

		expect(customersFound).toEqual(customers);
	});
});
