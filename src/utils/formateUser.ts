import { IUser } from "@/interfaces/user";
import { CustomDateUtils } from "./date";

export class FormatePropsUser {
  static formatPropertiesForGetUser(requestedData: Array<any>): Array<IUser> {
    return requestedData.map((user) => ({
      ...user,
      is_admin: user.is_admin === 1 ? true : false,
      active: user.active === 1 ? true : false,
      first_access: CustomDateUtils.formatToTableFrontEnd(user.first_access),
      last_access: CustomDateUtils.formatToTableFrontEnd(user.last_access),
      product_count: Number(user.product_count),
    })) as IUser[];
  }
}
