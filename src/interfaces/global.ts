import { HttpRequest, HttpResponse } from "./http";

export interface IController {
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}