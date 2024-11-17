import { IProduct, ISingleProduct } from "@/interfaces/product";

export class FormatedDatas {
  static formatedDatasToProduct(datas: ISingleProduct): IProduct {
    const newData = {
      id_product: "",
      name: datas.nameProduct,
      income: 0,
      recipe_time: 0,
      profit_percentage: 0,
      revenue_cost: 0,
      fixed_cost: 0,
      labor: 0,
      profit: 0,
      final_recipe_price: 0,
      price_per_unit: datas.priceProduct,
      cost_of_all_ingredients: 0,
      operacional_cost: 0,
      description: datas.descriptionProduct,
      id_category: datas.idCategory,
    };
    return newData;
  }
}
