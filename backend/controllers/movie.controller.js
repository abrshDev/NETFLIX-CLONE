import { fetchfromtmdb } from "../services/tmdb.service.js";

export const gettrendingmovie = async (req, res) => {
  try {
    const data = await fetchfromtmdb(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randommovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    return res.json({ success: true, content: randommovie });
  } catch (error) {
    console.log("error in trending movie", error.message);
    return res.status(500).json("internal server error");
  }
};
export const gettrailermovie = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchfromtmdb(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );

    return res.json({ success: true, trailer: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log("error in trailer movie", error.message);
    return res.status(500).json("internal server error");
  }
};
export const getmoviedetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchfromtmdb(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    return res.json({ success: true, details: data });
  } catch (error) {
    console.log("error in  movie details", error.message);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res.status(500).json("internal server error");
  }
};
export const getsimilarmovies = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchfromtmdb(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );

    return res.json({ success: true, similar: data.results });
  } catch (error) {
    console.log("error in simmilar movies", error.message);

    return res.status(500).json("internal server error");
  }
};
export const getmoviesbycategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchfromtmdb(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );

    return res.json({ success: true, category: data.results });
  } catch (error) {
    console.log("error in category movie", error.message);

    return res.status(500).json("internal server error");
  }
};
