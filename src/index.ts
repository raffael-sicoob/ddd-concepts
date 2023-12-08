import { Product } from "./domain/entity/product";
import { ProductRepository } from "./infrastructure/repositories/product.repository";

const productRepository = new ProductRepository();
const product = new Product(crypto.randomUUID(), "Product 1", 10);

productRepository.create(product);
