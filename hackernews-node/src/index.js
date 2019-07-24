const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
        link: (parent, args) => {
            return links.find(l => {
                return l.id === args.id;
            })
        },
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
        updateLink: (parent, args) => {
            const link = links.find(l => {
                return l.id === args.id;
            });
            if (args.url != null) {
                link.url = args.url;
            }
            if (args.description != null) {
                link.description = args.description;
            }
            return link
        },
        deleteLink: (parent, args) => {
            // TODO: Define this
        },
    },

};

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    context: { prisma },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));