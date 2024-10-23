import { useEffect, useState } from "react";
import { usecontentstore } from "../store/content";
import axios from "axios";

const Usegettrendingcontent = () => {
  const [gettrending, setgettrending] = useState(null);
  const { contenttype } = usecontentstore();

  useEffect(() => {
    const gettrendings = async () => {
      const response = await axios.get(`/api/v1/${contenttype}/trending/`);
      setgettrending(response.data.content);
    };

    gettrendings();
  }, [contenttype]);

  return { gettrending };
};
export default Usegettrendingcontent;
