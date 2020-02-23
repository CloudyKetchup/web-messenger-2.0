import React, { FC } from "react";

import { UserSearchResultComponent } from "../UserSearchResultComponent";

import { UserSearchResult } from "../../../model/search/UserSearchResult";

export const SearchFriendsTab : FC<{ result : UserSearchResult[] }> = props =>
(
  <div className="search-tab">
    {props.result.map(result => <UserSearchResultComponent key={result.user.id} data={result}/>)}
  </div>
);