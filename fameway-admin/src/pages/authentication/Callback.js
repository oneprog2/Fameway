import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { auth } from "../../services/auth0.service";

const Callback = () => {
  const location = useLocation();

  const processHash = (hash: string) => {
    auth.parseHash({ hash }, (err, authResult) => {
      if (err) {
        console.log(err);
        return;
      }

      if (authResult) {
        const { accessToken, expiresIn, idToken, scope } = authResult;
        if (accessToken)
          auth.client.userInfo(accessToken, (error, user) => {
            if (error) console.log(error);
            else
              auth.client.userInfo(accessToken, (err, user) => {
                if (error) console.log(error);
                else {
                  auth.setSession({
                    accessToken,
                    expiresIn,
                    idToken,
                    scope,
                    user,
                  });
                }
              });
          });
      }
    });
  };

  useEffect(() => {
    if (location.hash) processHash(location.hash);
  }, [location]);

  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default Callback;
