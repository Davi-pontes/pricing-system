import {
  IPaymentMethod,
  IUpdatePaymentMethod,
  IUpdatePaymentMethodService,
} from "@/interfaces/paymentMethod";
import { MySqlGetPaymentMethodRepository } from "@/repository/paymentMthod/get-paymentMethod";
import { MySqlUpdatePaymentMethodRepository } from "@/repository/paymentMthod/update-paymentMethod";
import { GetPaymentMethodService } from "./get-paymentMethod";

export class UpdatePaymentMethodService implements IUpdatePaymentMethodService {
  constructor(
    private readonly updatePaymentMethodRepository: MySqlUpdatePaymentMethodRepository
  ) {}

  async update(
    paymentMethods: IUpdatePaymentMethod[],
    idUser: string
  ): Promise<IPaymentMethod[]> {
    try {
      for (let paymentMethod of paymentMethods) {
        await this.updatePaymentMethodRepository.updatePaymentMehod(
          paymentMethod,
          idUser
        );
      }
      const getPaymentMethodRepository = new MySqlGetPaymentMethodRepository();

      const getPaymentMethodService = new GetPaymentMethodService(
        getPaymentMethodRepository
      );

      const updatedPayment = await getPaymentMethodService.getByActiveUserId(
        idUser
      );

      return updatedPayment;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}
