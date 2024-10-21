import { cacheExchange, createClient, fetchExchange } from "urql";

const urqlClient = createClient({
  url: "https://beta.pokeapi.co/graphql/v1beta",
  exchanges: [cacheExchange, fetchExchange],
});
export default urqlClient;
