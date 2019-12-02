const axios = require('axios');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
} = graphql;


const MainDetailsType = new GraphQLObjectType({
  name: 'main',
  fields: () => ({
    temp: { type: GraphQLFloat },
    humidity: { type: GraphQLInt },
    pressure: { type: GraphQLInt },
    temp_min: { type: GraphQLFloat },
    temp_max: { type: GraphQLFloat },
  })
});

const WeatherDescriptionType = new GraphQLObjectType({
  name: 'description',
  fields: () => ({
    id: { type: GraphQLInt },
    description: { type: GraphQLString },
    main: { type: GraphQLString },

  })
});

const GeneralWeatherType = new GraphQLObjectType({
  name: 'general',
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLInt },
    cod: { type: GraphQLInt },
    visibility: { type: GraphQLInt },
    timezone: { type: GraphQLInt },
    main: { type: MainDetailsType },
    weather: { type: new GraphQLList(WeatherDescriptionType)}
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    temperature: {
      type: GeneralWeatherType,
      args: {
        city: { type: GraphQLString },
      },
      resolve(parent, args) {
        // code to get data from db/ other source
        return axios
        // .get(`api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c2b12d2f3b4cbccb0cf73a14c7fc01f1`)
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${args.city}&APPID=${process.env.OPENWEATHER}&units=metric`)
        .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
