import axios from "axios";

export const fetchShow = (show = "the expanse") => {
  return axios
    .get(`https://api.tvmaze.com/singlesearch/shows?q=${show}&embed=episodes`)
    .then((res) => {
      // console.log("FETCHED DATA", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export default fetchShow;
