import React, { Component, CSSProperties } from "react";

import { Room } from "../../model/Room";
import { UserSearchResult } from "../../model/search/UserSearchResult";

import { UserSearchClient } from "../../api/search/UserSearchClient";

import { SearchFriendsTab } from "./Tabs/SearchFriendsTab";
import { ReactComponent as AddFriendIcon } from  "../../assets/add-friend.svg";
import { ReactComponent as GroupsIcon } from "../../assets/group.svg";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import "./search-component.css";

type IProps = {
  defaultTab? : TAB
};

type IState = {
  choosenTab  : TAB,
  result      : UserSearchResult[] | Room[]
};

export enum TAB
{
  FRIENDS = "friends",
  GROUPS = "groups"
};

export default class SearchComponent extends Component<IProps, IState>
{
  state : IState = {
    choosenTab : this.props.defaultTab || TAB.FRIENDS,
    result : []
  };

  chooseSeparatorStyle : CSSProperties = {
    background: "#565555",
    marginTop : "1%",
    width     : 2,
    height    : "70%"
  };

  purpleIcon = (tab : TAB) => {};

  whiteIcon = (tab : TAB) => {};

  selectFriendsTab = () =>
  {
    this.setState({
      choosenTab : TAB.FRIENDS,
      result : []
    });
  };

  selectGroupsTab = () =>
  {
    this.setState({
      choosenTab : TAB.GROUPS,
      result : []
    });
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
    switch (this.state.choosenTab)
    {
      case TAB.FRIENDS:
        if (Profile.profileContext)
        {
          this.setState({ result: await UserSearchClient.getInstance().search(query, Profile.profileContext.profile.id) });
        }
        break;
      case TAB.GROUPS: console.log(query); break;
      default: break;
    }
  };

  render = () =>
  (
    <div className="search-component">
      <div className="search-header">
        <input id="search-input" placeholder="Search..." onChange={this.searchAction}/>
      </div>
      <div className="search-result">
        {
          this.state.choosenTab === TAB.FRIENDS
          &&
          <SearchFriendsTab result={this.state.result as UserSearchResult[]}/>
        }
      </div>
      <div className="search-choose">
        <div className="search-choose-button" onClick={this.selectFriendsTab}>
          <div>
            <AddFriendIcon id="friends-icon"/>
          </div>
          <div id="search-friends-tab-text">
            Friends
          </div>
        </div>
        <div style={this.chooseSeparatorStyle}/>
        <div className="search-choose-button" onClick={this.selectGroupsTab}>
          <div>
            <GroupsIcon id="groups-icon"/>
          </div>
          <div id="search-groups-tab-text">
            Groups
          </div>
        </div>
      </div>
    </div>
  );
}