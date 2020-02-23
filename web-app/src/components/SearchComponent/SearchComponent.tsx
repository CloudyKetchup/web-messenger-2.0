import React, { Component } from "react";

import { UserSearchResult } from "../../model/search/UserSearchResult";

import { UserSearchClient } from "../../api/search/UserSearchClient";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { SearchFriendsTab } from "./Tabs/SearchFriendsTab";

import "./search-component.css";

type IState = {
  result : UserSearchResult[]
};

export default class SearchComponent extends Component<{}, IState>
{
  state : IState = {
    result : []
  };

  searchAction = () =>
  {
    const input = document.getElementById("search-input") as HTMLInputElement;

    if (input)
    {
      input.value.length > 4
      ?
      this.sendSearchQuery(input.value)
      :
      this.state.result.length !== 0 && this.setState({ result : [] });
    }
  };

  sendSearchQuery = async (query : string) =>
  {
    if (Profile.profileContext)
    {
      const result = UserSearchClient.getInstance().search(query, Profile.profileContext.profile.id);

      this.setState({ result: await result });
    }
  };

  render = () =>
  (
    <div className="search-component">
      <div className="search-header">
        <input
          autoComplete="off"
          id="search-input"
          placeholder="Search..."
          type="text"
          onChange={this.searchAction}
        />
      </div>
      <div className="search-result">
        <SearchFriendsTab result={this.state.result as UserSearchResult[]}/>
      </div>
    </div>
  );
}
