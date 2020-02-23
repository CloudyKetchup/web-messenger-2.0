import axios from "axios";

import { Image } from "../model/media/Image";

import { GLOBAL_URL } from "./ApiConfig";

export class MediaClient
{
  static saveProfileImage = (id : string, image : File) : Promise<Image | undefined> =>
  {
    const formData = new FormData();

    formData.append("file", image);

    return axios({
      method  : "POST",
      url     : `${GLOBAL_URL}/image/save/profile?id=${id}`,
      data    : formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => response.data)
    .catch(console.log)
  };
}