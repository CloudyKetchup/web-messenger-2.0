import { AccountClient } from "../../api/AccountClient";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { Status } from "../../model/Status";

export const initExitListener = () =>
{
  window.addEventListener("beforeunload", () =>
  {
    if (Profile.profileContext)
    {
      AccountClient.setStatus(Profile.profileContext.profile.id, Status.OFFLINE);
    }
  });
}
