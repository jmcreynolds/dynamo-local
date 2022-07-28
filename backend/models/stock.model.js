const dynamoose = require('dynamoose');

if (process.env.IS_OFFLINE || process.env.IS_LOCAL) {
  console.log("We Are Offline")
  dynamoose.aws.ddb.local();   
}

const table_name = process.env.STOCK_TABLE;
console.log("Table Name:", table_name)
console.log("ENV:", process.env)

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    symbol: String,
    reading_date: String,
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