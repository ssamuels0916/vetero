require('dotenv').config();
const express = require('express');
const cors = require('cors'); // allow cross-origin request
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
