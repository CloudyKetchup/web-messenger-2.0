import SearchClient from "./SearchClient";

import { UserSearchResult } from "../../model/search/UserSearchResult";

const URL = "http://localhost:8080/account";

export class UserSearchClient extends SearchClient<UserSearchResult>
{
  private static client : UserSearchClient | null;

  private constructor()
  {
    super(URL);
  }

  static getInstance = () : SearchClient<UserSearchResult> =>
  {
    if (UserSearchClient.client)
    {
      return UserSearchClient.client;
    }
    return new UserSearchClient();
  }
}