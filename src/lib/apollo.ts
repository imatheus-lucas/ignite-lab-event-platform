import { ApolloClient, InMemoryCache } from "@apollo/client";
export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4od2s581v3901z7f20mgd6b/master",
  cache: new InMemoryCache(),
});
