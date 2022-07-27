// exports.handler = function(event, context, callback) {
//     getStock
// }

const yahooStockAPI  = require('yahoo-stock-api');

async function main()  {
    console.log('Getting Data');
	const startDate = new Date('08/21/2020');
	const endDate = new Date('08/26/2022');
	console.log(await yahooStockAPI.getHistoricalPrices(startDate, endDate, 'AAPL', '1d'));
}
main();