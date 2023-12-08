import { Product } from "@/domain/entity/product";
import { ProductRepositoryInterface } from "@/domain/repository/product-repository-interface";
import { prisma } from "../db/prisma/client";

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await prisma.product.create({
      data: {
        id: entity.id,
        name: entity.name,
        price: entity.price,
      },
    });
  }
  async update(entity: Product): Promise<void> {
    await prisma.product.update({
      where: {
        id: entity.id,
      },
      data: {
        name: entity.name,
        price: entity.price,
      },
    });
  }
  async find(id: string): Promise<Product> {
    const productModel = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productModel) {
      throw new Error("Product not found");
    }

    return new Product(productModel.id, productModel.name, productModel.price);
  }
  async findAll(): Promise<Product[]> {
    const productsModel = await prisma.product.findMany();
    if (!productsModel) {
      throw new Error("Products not found");
    }

    return productsModel.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    );
  }
}
