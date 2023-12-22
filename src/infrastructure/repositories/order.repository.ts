import { Order } from "@/domain/entity/order";
import { OrderItem } from "@/domain/entity/orderItem";
import { OrderRepositoryInterface } from "@/domain/repository/order-repository-interface";
import { prisma } from "../db/prisma/client";

export class OrderRepository implements OrderRepositoryInterface {
	async update(entity: Order): Promise<void> {
		await prisma.order.update({
			where: { id: entity.id },

			data: {
				id: entity.id,
				customerId: entity.customerId,
				total: entity.total(),
				items: {
					deleteMany: {},
					create: entity.items.map((item) => ({
						id: item.id,
						productId: item.productId,
						name: item.name,
						price: item.price,
						quantity: item.quantity,
					})),
				},
			},
		});
	}
	async find(id: string): Promise<Order> {
		const orderModel = await prisma.order.findUnique({
			where: {
				id,
			},
			include: {
				items: true,
			},
		});

		if (!orderModel) {
			throw new Error("Order not found");
		}

		const orderItems = orderModel.items.map((item) => {
			return new OrderItem(
				item.id,
				item.productId,
				item.name,
				item.price,
				item.quantity,
			);
		});

		return new Order(orderModel.id, orderModel.customerId, orderItems);
	}
	async create(entity: Omit<Order, "itemsId">): Promise<void> {
		await prisma.order.create({
			data: {
				id: entity.id,
				customerId: entity.customerId,
				total: entity.total(),
				items: {
					create: entity.items.map((item) => ({
						id: item.id,
						productId: item.productId,
						name: item.name,
						price: item.price,
						quantity: item.quantity,
					})),
				},
			},
		});
	}
}
