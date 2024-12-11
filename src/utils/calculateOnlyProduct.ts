import { IProduct } from "@/interfaces/product";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { Calculate } from "./calculate";

export class CalculateOnlyProduct extends Calculate {
  constructor(datasProduct: IProduct, currentPrice: number) {
    // Chama o construtor da classe base
    super(
      datasProduct,{
        id: 0,
    name: '',
    weight: 0,
    unit1: '',
    price: 0,
    quantity: 0,
    unit2: '',
    ingredient_cost: 0,
    id_product: '',
    quantity_in_stock: 0,
    total_cash_in_stock: 0,
    updated_at: ''
      }
      ,
      currentPrice
    );
  }

  public calculateOnlyProduct() {
    const pricePerUnit = this.calculateThePriceOfAProductPerBox();
    const feePerProduct = this.calculateTax();
    const freightProduct = this.calculateFreight();
    this.datasProduct.price_per_unit =
      pricePerUnit + feePerProduct + freightProduct;
    return this.datasProduct
  }

  private calculateThePriceOfAProductPerBox() {
    return this.currentPrice / this.datasProduct.qtd_box;
  }

  private calculateTax() {
    return this.datasProduct.tax / this.datasProduct.qtd_box;
  }

  private calculateFreight() {
    return this.datasProduct.freight / this.datasProduct.qtd_box;
  }
}
