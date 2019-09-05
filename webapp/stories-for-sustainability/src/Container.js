import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import App from "./App";
import Register from "./Register";
import Login from "./Login";

function Container() {
  return (
    <Wrapper>
        <Switch>
          <Route exact path="/" exact component={App} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>
    </Wrapper>
  );
}

const Wrapper = styled.div`
`;

export default Container;