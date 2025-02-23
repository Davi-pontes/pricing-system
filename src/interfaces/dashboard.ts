export interface IDashboard{
    averageProfit: number
    totalProduct: number
}

export interface IDashboardService{
    assembleDatasToDashboard(idUser:string): Promise<IDashboard>
}