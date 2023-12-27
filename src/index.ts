import { Product } from "./domain/product/entity/product";
import { ProductRepository } from "./infrastructure/repositories/product.repository";

import { randomUUID as uuid } from "crypto";

const productRepository = new ProductRepository();
const product = new Product(uuid(), "Product 1", 10);

productRepository.create(product);

const id = uuid();
console.log(id);
