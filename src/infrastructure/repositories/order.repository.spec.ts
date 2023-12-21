import { Customer } from "@/domain/entity/customer";
import { Order } from "@/domain/entity/order";
import { OrderItem } from "@/domain/entity/orderItem";
import { Product } from "@/domain/entity/product";
import { Address } from "@/domain/value-objects/address";
import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { randomUUID } from "crypto";
import { prisma } from "./../db/prisma/client";
import { CustomerRepository } from "./customer.repository";
import { OrderRepository } from "./order.repository";
import { ProductRepository } from "./product.repository";

const address = new Address("Street 1", 1, "123-234", "City 1");

describe("OrderRepository unit tests", () => {
  beforeEach(async () => {
    prisma.$connect();
  });

  afterEach(async () => {
    await prisma.order.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.customer.deleteMany({});
    await prisma.address.deleteMany({});
    await prisma.$disconnect();
  });

  it("should create a new  order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(randomUUID(), "John", address, true);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(randomUUID(), "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      randomUUID(),
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order(randomUUID(), customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel1 = await prisma.order.findUnique({
      where: {
        id: order.id,
      },

      include: { items: true },
    });

    expect(orderModel1).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          productId: orderItem.productId,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(randomUUID(), "John", address, true);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(randomUUID(), "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      randomUUID(),
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order(randomUUID(), customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const product2 = new Product(randomUUID(), "Product 2", 20);
    await productRepository.create(product2);

    // atualizar a ordem

    const orderItem2 = new OrderItem(
      randomUUID(),
      product2.id,
      product2.name,
      product2.price,
      3
    );

    order.addItem(orderItem2);

    await orderRepository.update(order);

    const orderModel2 = await prisma.order.findUnique({
      where: {
        id: order.id,
      },
      include: { items: true },
    });

    expect(orderModel2).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          productId: orderItem.productId,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
        },
        {
          id: orderItem2.id,
          productId: orderItem2.productId,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          orderId: order.id,
        },
      ],
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(randomUUID(), "John", address, true);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(randomUUID(), "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      randomUUID(),
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order(randomUUID(), customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await orderRepository.find(order.id);

    expect(orderModel).toStrictEqual(order);
  });
});
