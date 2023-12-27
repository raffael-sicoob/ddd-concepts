import { Product } from "@/domain/product/entity/product";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ProductService {
	static increasePrice(products: Product[], percentage: number): void {
		// biome-ignore lint/complexity/noForEach: <explanation>
		products.forEach((product) => {
			product.changePrice(product.price * (1 + percentage / 100));
		});
	}
}
