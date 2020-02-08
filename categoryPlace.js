import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Header from "../header";
import PlaceList from "../placeList";
import ErrorLoadingHandler from "../errorLoadingHandler";

const CategoryPlace = () => {
  const { placeName } = useParams();

  const { loading, error, data } = useQuery(CategoryPlace.query, {
    variables: { inputData: placeName.toUpperCase() },
    errorPolicy: "all"
  });

  if (loading || error) {
    return <ErrorLoadingHandler {...{ loading, error }} />;
  }
  if (data.my === null) {
    data.stateUser = false;
    data.active = false;
    data.email = null;
  } else {
    data.stateUser = true;
    data.active = data.my.profile.active;
    data.email = data.my.profile.email;
  }

  console.log(loading, error, data, "CategoryPlace");

  return (
    <div>
      <Header
        stateUser={data.stateUser}
        active={data.active}
        email={data.email}
      />
      <PlaceList {...{ data }} />
    </div>
  );
};
CategoryPlace.query = gql`
  query($inputData: Category!) {
    stateUser: userStatus
    viewer {
      ...PlaceList
    }
    my {
      profile {
        active
        email
      }
    }
  }
  ${PlaceList.fragment}
`;
export default CategoryPlace;
