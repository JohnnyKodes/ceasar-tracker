import { useState } from "react";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import NewsCard from "./NewsCard";
import NewsSelector from "./NewsSelector";
import { motion } from "framer-motion";
import Loader from "../Loader";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 21,
  });
  if (!cryptoNews?.value) return <Loader />;

  if (simplified) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-full grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-4 overflow-y-visible p-2 ">
          {cryptoNews.value.map((news, index) => (
            <NewsCard key={index} news={news} simplified />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="w-[300px] mt-4">
          <NewsSelector
            newsCategory={newsCategory}
            setNewsCategory={setNewsCategory}
            coins={data?.data?.coins}
          />
        </div>
        <motion.div
          initial={{ y: 500 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-1 gap-4 overflow-y-visible p-5"
        >
          {cryptoNews.value.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </motion.div>
      </div>
    );
  }
};

export default News;
