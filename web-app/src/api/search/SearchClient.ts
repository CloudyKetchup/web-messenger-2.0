import axios from "axios";

export default abstract class SearchClient<T>
{
  private cancelToken  = axios.CancelToken;
  private source  = this.cancelToken.source();
  private running = false;
  private baseURL : string;

  constructor(baseURL : string)
  {
    this.baseURL = baseURL;
  }

  search = async (query : string, accId: string) : Promise<T[]> =>
  {
    this.running && this.source.cancel();

    this.running = true;

    return axios.get(`${this.baseURL}/search?query=${query}&acc=${accId}`, { cancelToken : this.source.token })
      .then(response => { this.running = false; return response.data; })
      .catch(e => {console.log(e); return []; });
  };
}