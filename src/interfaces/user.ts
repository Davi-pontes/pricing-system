export interface IUser {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  password: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}
export interface ICreateUserParams {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  password: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface IUpdateUserParams {
  id: string;
  name?: string;
  phone_number?: string;
  email?: string;
  password?: { oldPassword: string; newPassword: string };
  is_admin?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ICreateUserRepository {
  createUser(params: ICreateUserParams): Promise<number>;
}
export interface ICreateUserService {
  createUser(params: ICreateUserParams): Promise<IUser>;
}
export interface IGetUserService {
  getAllUser(): Promise<IUser[]>;
  getUserById(idUser: string): Promise<IUser>;
  validateUserPassword(idUser: string, oldPassword: string): Promise<boolean>;
}
export interface IGetUserRepository {
  getUser(): Promise<IUser[]>;
  getUserById(id_User: string): Promise<IUser>;
  getUserPassword(
    idUser: string,
  ): Promise<{ id: string; password: string }>;
}
export interface IUpdateUserRepository {
  updateUser(
    dataUserToUpdate: IUpdateUserParams,
    idUser: string
  ): Promise<number>;
}
export interface IUpdateUserService {
  updateUser(
    dataUserToUpdate: IUpdateUserParams,
    idUser: string
  ): Promise<IUser>;
}
