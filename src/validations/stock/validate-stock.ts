export class VStock {
    static validateStateStock(numbersCurrent: number, quantityInStock: number): string | null {
        const states = ['noStock', 'insufficient', 'inStock']

        let state = null

        if (quantityInStock === 0) {
            state = states[0]
        } else if (numbersCurrent > quantityInStock) {
            state = states[1]
        } else if (numbersCurrent <= quantityInStock) {
            state = states[2]
        }
        return state
    }
}