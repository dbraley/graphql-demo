const { GraphQLServer } = require('graphql-yoga')

let idCount = links.length;
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => {
            return links.find(l => {
                return l.id === args.id;
            })
        },
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            };
            links.push(link);
            return link
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
    typeDefs: '/src/schema.graphql',
    resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));