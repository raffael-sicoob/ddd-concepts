import { Product } from "@/domain/product/entity/product";
import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { randomUUID } from "crypto";
import { prisma } from "../db/prisma/client";
import { ProductRepository } from "./product.repository";

describe("ProductRepository unit tests", () => {
	beforeEach(() => {
		prisma.$connect();
	});

	afterEach(async () => {
		await prisma.product.deleteMany({});
		prisma.$disconnect();
	});

	it("should create a product", async () => {
		const productRepository = new ProductRepository();
		const id = randomUUID();
		const product = new Product(id, "Product 1", 10);

		await productRepository.create(product);

		const productCreated = await prisma.product.findUnique({
			where: {
				id: id,
			},
		});

		expect(productCreated).toEqual({
			id: id,
			name: "Product 1",
			price: 10,
		});
	});

	it("should update a product", async () => {
		const productRepository = new ProductRepository();
		const id = randomUUID();
		const product = new Product(id, "Product 1", 10);

		await productRepository.create(product);

		const productCreated = await prisma.product.findUnique({
			where: {
				id: id,
			},
		});

		expect(productCreated).toEqual({
			id: id,
			name: "Product 1",
			price: 10,
		});

		product.changeName("Product 2");
		product.changePrice(20);

		await productRepository.update(product);

		const productUpdated = await prisma.product.findUnique({
			where: {
				id: id,
			},
		});

		expect(productUpdated).toEqual({
			id: id,
			name: "Product 2",
			price: 20,
		});
	});

	it("should find a product", async () => {
		const productRepository = new ProductRepository();
		const id = randomUUID();
		const product = new Product(id, "Product 1", 10);

		await productRepository.create(product);

		const productFound = await productRepository.find(id);
		expect(productFound).toEqual(product);
	});

	it("should find all products", async () => {
		const productRepository = new ProductRepository();

		const product1 = new Product(randomUUID(), "Product 1", 10);
		const product2 = new Product(randomUUID(), "Product 2", 20);
		const product3 = new Product(randomUUID(), "Product 3", 30);

		await productRepository.create(product1);
		await productRepository.create(product2);
		await productRepository.create(product3);

		const findProducts = await productRepository.findAll();
		const products = [product1, product2, product3];

		expect(products).toEqual(findProducts);
	});
});
