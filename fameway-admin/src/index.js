import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { configureStore } from "./redux/Store";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
import Spinner from "./pages/spinner/Spinner";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const hasuraUri = "https://fameway.hasura.app/v1/graphql";

const AuthorizedApolloProvider = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const httpLink = createHttpLink({
    uri: hasuraUri,
  });

  const authLink = setContext(async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      return {};
    }
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
  // }
};

ReactDOM.render(
  <Auth0Provider
    domain="auth.fameway.co"
    clientId="fvFanDY5XxF2Op7kITivNKSox5mv6e6M"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
    audience={"fameway-admin"}
    error={console.log}
  >
    <AuthorizedApolloProvider>
      <Provider store={configureStore()}>
        <Suspense fallback={<Spinner />}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </Provider>
    </AuthorizedApolloProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
reportWebVitals();
