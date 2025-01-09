import { HttpResponse, HttpStatusCode } from "@/interfaces/http";

export const ok = <T>(body: any): HttpResponse<T> => ({
    statusCode: HttpStatusCode.OK,
    body,
  });
  
  export const created = <T>(body: any): HttpResponse<T> => ({
    statusCode: HttpStatusCode.CREATED,
    body,
  });
  
  export const badRequest = (message: string): HttpResponse<string> => {
    return {
      statusCode: HttpStatusCode.BAD_REQUEST,
      body: message,
    };
  };
  
  export const serverError = (): HttpResponse<string> => {
    return {
      statusCode: HttpStatusCode.SERVER_ERROR,
      body: "Something went wrong",
    };
  };

  export const unauthorized = (): HttpResponse<string> => {
    return {
      statusCode: HttpStatusCode.UNAUTHORIZED,
      body: "Unauthorized"
    }
  }
  export const unprocessableEntity = (message: string): HttpResponse<string> => {
    return {
      statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
      body: message
    }
  }
  export const noContent = (): HttpResponse<string> => {
    return {
      statusCode: HttpStatusCode.NO_CONTENT,
      body: ""
    }
  }