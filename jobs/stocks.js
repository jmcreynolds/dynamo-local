exports.handler = function(event, context, callback) {
    main
}

const { stockModel } = require("../backend/models/stock.model.js");
const yahooStockAPI  = require('yahoo-stock-api');
const { v4: uuidv4 } = require('uuid');

async function main()  {
    console.log('Getting Data');
	const startDate = new Date('06/21/2022');
	const endDate = new Date('08/26/2022');
	const results = await yahooStockAPI.getHistoricalPrices(startDate, endDate, 'AAPL', '1d');

	Object.entries(results.response).forEach(entry => {
		entry.forEach(stockInsert);
	})

	

}

main();

stockInsert = async (item) => {

	if (typeof item === 'object'){
		let date = new Date(item.date * 1000);
		console.log(date);

		const insert = {
			id: uuidv4(),
			symbol: 'AAPL',
			reading_date: String(item.date),
			open: item.open,
			high: item.high,
			low: item.low,
			close: item.close,
			adj_close: item.adjclose
		}
	
		try {
		  await stockModel.create(insert);
		  console.log(insert);
		} catch (error) {
		  console.log(error);
		  console.log("Could not create stock entry" );
		}
	}
}