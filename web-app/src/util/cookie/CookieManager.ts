import Cookies from "universal-cookie";

import { AccountClient } from "../../api/AccountClient";

import { ProfileContextHelpers } from "../../helpers/ProfileContextHelpers";

type Credentials = {
  email : string
  password : string
};

const cookies = new Cookies();

export const loadProfile = async () =>
{
  const credentials = cookies.get("credentials") as Credentials;

  if (credentials)
  {
    const result = await AccountClient.login(credentials.email, credentials.password);

    await ProfileContextHelpers.createBasedOnAuth(result);
  }
};

export const saveCredentials = (email : string, password : string) =>
{
  cookies.set("credentials", { email : email, password : password });
};

export const deleteProfile = () => cookies.remove("credentials");