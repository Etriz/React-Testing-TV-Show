import axios from "axios";

export const fetchShow = (show) => {
  return axios
    .get(`https://api.tvmaze.com/singlesearch/shows?q=${show}&embed=episodes`)
    .then((res) => {
      return res.data;

      //   setShow(res.data);
      //   setSeasons(formatSeasons(res.data._embedded.episodes]));
    });
};
export default fetchShow;
