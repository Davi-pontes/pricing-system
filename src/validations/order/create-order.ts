import { ICreateOrderParams } from "@/interfaces/order";
import { z } from "zod";

export class VCreateOrder {
  static async validateOrderParams(params: ICreateOrderParams): Promise<any> {
    const orderSchema = z.object({
      discount: z.number(),
      type_payment_method: z.string({
        message: "Selecione uma forma de pagamento.",
      }).min(1, {message:"Selecione uma forma de pagamento."}),
      tax: z.number(),
      sub_total: z.number(),
      total: z.number(),
      id_user: z.string(),
    });
    const result = orderSchema.safeParse(params);

    if (result.success) {
      return { status: "success", data: result.data };
    } else {
      const errorMessages = result.error.errors[0].message;
      return { error: "error", message: errorMessages };
    }
  }
}
