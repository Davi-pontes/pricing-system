import { MySqlEntryStockRepository } from "@/repository/stock/entry-stock";
import { MySqlUpdateStockRepository } from "@/repository/stock/update-stock";
import { StockEntryService } from "@/service/stock/entry-stock";

test('Add product entry to stock', async () => {
    const entryStockRepository = {
        addEntry: jest.fn(),
        registerStockEntry: jest.fn(), // Método da interface IEntryStockRepository
    };

    const stockRepository = {
        updateStock: jest.fn(), // Método da interface IUpdateStockRepository
    };

    // Instancia a classe com os mocks
    const update = new StockEntryService(
        entryStockRepository as unknown as MySqlEntryStockRepository,
        stockRepository as unknown as MySqlUpdateStockRepository
    );

    // Dados de entrada para o teste
    const entryData = { quantity: 2, id_stock: 3 };

    // Chama o método
    await update.addEntry(entryData);

    // Verifica se os métodos esperados foram chamados com os argumentos corretos
    expect(entryStockRepository.addEntry).toHaveBeenCalledWith(entryData);
    expect(stockRepository.updateStock).toHaveBeenCalled();
});
