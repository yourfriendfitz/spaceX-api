const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_date: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_succes: { type: GraphQLBoolean },
    rocket: { type: RocketType },
    details: { type: GraphQLString },
    links: { type: LinksType },
    flickr_images: {
      type: new GraphQLList(GraphQLString)
    }
  })
});

// Rocket Type

const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// Links Type

const LinksType = new GraphQLObjectType({
  name: "Links",
  fields: () => ({
    article_link: { type: GraphQLString },
    wikipedia: { type: GraphQLString },
    video_link: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      async resolve(parent, args) {
        const response = await axios.get(
          "https://api.spacexdata.com/v3/launches"
        );
        return response.data;
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const response = await axios.get(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        );
        return response.data;
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      async resolve(parent, args) {
        const response = await axios.get(
          "https://api.spacexdata.com/v3/rockets"
        );
        return response.data;
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const response = await axios.get(
          `https://api.spacexdata.com/v3/rockets/${args.id}`
        );
        return response.data;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
