export interface INecessaryStock {
    name: string,
    quantityCurrent: number,
    necessaryAmount: number,
    state: string | null
    quantityToBuy: number
}