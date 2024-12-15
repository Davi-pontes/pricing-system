import { IProduct, ISingleProduct } from "@/interfaces/product";

export class FormatedDatas {
  static formatedDatasToProduct(datas: ISingleProduct): IProduct {
    const newData = {
      id_product: "",
      name: datas.nameProduct,
      income: datas.qtdInBox,
      recipe_time: 0,
      profit_percentage: datas.profitPecentage,
      revenue_cost: datas.costProduct,
      fixed_cost: datas.fixedCost,
      labor: 0,
      profit: datas.profit,
      final_recipe_price: datas.priceProduct,
      price_per_unit: datas.pricePerUnit,
      cost_of_all_ingredients: 0,
      operacional_cost: 0,
      description: datas.descriptionProduct,
      id_category: datas.idCategory,
      tax: datas.tax,
      freight: datas.freigth,
      workforce: datas.workforce,
      qtd_box: datas.qtdInBox,
      only: datas.only
    };
    return newData;
  }
}
