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
    rocket: { type: RocketType }
  })
});

// Rocket Type

const RockerType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// Details Type

const DetailsType = new GraphQLObjectType({
  name: "Details",
  fields: () => ({
    details: { type: GraphQLString }
  })
});

// Links Type

const LinksType = new GraphQLObjectType({
  name: "Links",
  fields: () => ({
    links: {
      article_link: { type: GraphQLString },
      wikipedia: { type: GraphQLString },
      video_link: { type: GraphQLString }
    }
  })
});

// Images Type

const ImagesType = new GraphQLObjectType({
  name: "Images",
  fields: () => ({
    links: {
      flickr_images: {
        type: new GraphQLList(GraphQLString)
      }
    }
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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
