import axios from "axios";

import { Image } from "../model/media/Image";

const URL = "http://localhost:8080";

export class MediaClient
{
  static saveProfileImage = (id : string, image : File) : Promise<Image> =>
  {
    const formData = new FormData();

    formData.append("file", image);

    return axios({
      method  : "POST",
      url     : `${URL}/image/save/profile?id=${id}`,
      data    : formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => response.data)
    .catch(console.log)
  };
}