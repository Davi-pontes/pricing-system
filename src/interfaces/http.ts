import { NextFunction } from "express";

export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500,
    UNAUTHORIZED = 401,
    NO_CONTENT = 204,
    UNPROCESSABLE_ENTITY = 422
}

export interface HttpResponse<T> {
    statusCode: HttpStatusCode;
    body: T
}

export interface HttpRequest<B> {
    params?: any
    headers?: any
    body?: B
    file?: B
    cookies?: any
}

export interface HttpNext extends NextFunction{
}