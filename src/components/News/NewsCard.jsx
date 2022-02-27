import { motion } from "framer-motion";

const demoImageUrl =
  "https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const NewsCard = ({ news, simplified }) => {
  return (
    <motion.a
      href={news.url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, type: "tween" }}
      className={`${simplified ? "w-[300px]" : "sm:w-[370px] w-full"}  ${
        simplified ? "h-[125px]" : "h-[280px] "
      } bg-zinc-900 p-3 rounded-lg flex flex-col justify-between m-auto`}
    >
      <div className="flex gap-3">
        <img
          src={news?.image?.thumbnail?.contentUrl || demoImageUrl}
          alt="news"
          className="rounded-lg h-[100px] w-[100px]"
        />
        <div className="flex flex-col justify-between">
          <p className={`text-white font-bold ${simplified && "text-sm"}`}>
            {news.name.length > 75
              ? news.name.substring(0, 65) + "..."
              : news.name}
          </p>
          {simplified && (
            <div className="flex gap-2 mt-2 items-center">
              <img
                src={
                  news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl
                }
                alt=""
                className="h-5 w-5 rounded-full"
              />
              <p className="golden text-xs">{news.provider[0]?.name}</p>
            </div>
          )}
        </div>
      </div>
      {!simplified && (
        <div className="mt-1">
          <p className="text-sm">
            {news.description > 100
              ? `${news.description.substring(0, 100)}...`
              : news.description}
          </p>
        </div>
      )}

      {!simplified && (
        <div className="flex gap-2 mt-2 items-center">
          <img
            src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl}
            alt=""
            className="max-h-8 max-w-8 rounded-full"
          />
          <p className="golden">{news.provider[0]?.name}</p>
        </div>
      )}
    </motion.a>
  );
};

export default NewsCard;
