import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import gql from "graphql-tag";

import ErrorLoadingHandler from "../errorLoadingHandler";

const AccountConfirmation = () => {
  const [email, setEmail] = useState("");

  const [addTodo, { loading, error, data }] = useMutation(CONFIRMATION_CODE, {
    onError: err => {}
  });

  if (loading || error) {
    return <ErrorLoadingHandler {...{ loading, error }} />;
  }

  if (data?.my.accountConfirmation) {
    return (
      <Redirect
        to={{
          pathname: `/user`,
          state: data.my.accountConfirmation
        }}
      />
    );
  }

  return (
    <form
      onSubmit={e => {
        addTodo({
          variables: { email }
        });
        e.preventDefault();
      }}
    >
      <input
        type="text"
        placeholder={"Enter code"}
        required
        onChange={({ target: { value } }) => setEmail(value)}
        value={email}
      />
      <button type="submit" className="signUpbutton">
        {"Change Email"}
      </button>
    </form>
  );
};

const CONFIRMATION_CODE = gql`
  mutation($email: Email!) {
    my {
      newEmail(email: $email)
    }
  }
`;
export default AccountConfirmation;
