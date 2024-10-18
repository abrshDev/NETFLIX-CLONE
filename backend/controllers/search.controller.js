import User from "../models/user.model.js";
import { fetchfromtmdb } from "../services/tmdb.service.js";

export const personsearch = async (req, res) => {
  const { query } = req.params;
  const userid = req.user._id;

  try {
    const data = await fetchfromtmdb(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(userid, {
      $push: {
        searchhistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchtitle: "person",
          createdat: new Date(),
        },
      },
    });
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("error in person search", error.message);
    return res.status(500).json("internal server error");
  }
};
export const moviesearch = async (req, res) => {
  const { query } = req.params;
  const userid = req.user._id;

  try {
    const data = await fetchfromtmdb(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(userid, {
      $push: {
        searchhistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchtitle: "movie",
          createdat: new Date(),
        },
      },
    });
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("error in movie search", error.message);
    return res.status(500).json("internal server error");
  }
};
export const tvsearch = async (req, res) => {
  const { query } = req.params;
  const userid = req.user._id;

  try {
    const data = await fetchfromtmdb(
      `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=1`
    );
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(userid, {
      $push: {
        searchhistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchtitle: "tv",
          createdat: new Date(),
        },
      },
    });
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("error in tv search", error.message);
    return res.status(500).json("internal server error");
  }
};
export const getsearchhistory = async (req, res) => {
  const userid = req.user._id;
  const user = await User.findById(userid).select("-password");

  try {
    return res.status(200).json({ success: true, content: user.searchhistory });
  } catch (error) {
    console.log("error in searchhistory", error.message);
    return res.status(500).json("internal server error");
  }
};

export const deletesearchhistory = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { searchhistory: { id } },
    });
    return res
      .status(200)
      .json({ success: true, message: "history deleted successfully" });
  } catch (error) {
    console.log("error in deletehistory", error.message);
    return res.status(500).json("internal server error");
  }
};
