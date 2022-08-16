const dynamoose = require('dynamoose');

if (process.env.IS_OFFLINE || process.env.IS_LOCAL) {
  console.log("We Are Offline")
  dynamoose.aws.ddb.local();   
}

const table_name = process.env.STOCK_TABLE;

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    symbol: {
      "type": String,
      "index": {
        "name": "symbolDateIndex",
        "rangeKey": "reading_date",
        "global": true,
      }
    },
    reading_date: {
      "type": String,
      "required": true,
      "rangeKey": true,
      // "index": {
      //   "name": "readingDateIndex",
      //   "rangeKey": "email",
      //   "global": true,
      // }
    },
    open: Number,
    high: Number,
    low: Number, 
    close: Number,
    adj_close: Number,
  },
  {
    timestamps: true,
  }
);

exports.stockModel = dynamoose.model(table_name, schema, {
  create: true,
  throughput: {
    read: 5,
    write: 5,
  },
});