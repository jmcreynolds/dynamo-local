const dynamoose = require('dynamoose');

const table_name = process.env.USERS_TABLE;



if (process.env.IS_OFFLINE) {
    dynamoose.aws.ddb.local();   
}

const schema = new dynamoose.Schema(
  {
    userId: {
      type: String,
      hashKey: true,
    },
    name: String,
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