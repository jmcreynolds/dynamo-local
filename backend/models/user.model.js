const dynamoose = require('dynamoose');

if (process.env.IS_OFFLINE) {
  dynamoose.aws.ddb.local();   
}

const table_name = process.env.USERS_TABLE;

const schema = new dynamoose.Schema(
  {
    userId: {
      type: String,
      hashKey: true,
    },
    validated: {
      type: Number,
      index: {
        global: true,
        rangeKey: 'userId',
        name: 'validateIndex',
      }
    },
    name: String,
    alerts: Number,
  },
  {
    timestamps: true,
  }
);

exports.usersModel = dynamoose.model(table_name, schema, {
  create: true,
  throughput: {
    read: 5,
    write: 5,
  },
});

//module.exports = { usersModel };