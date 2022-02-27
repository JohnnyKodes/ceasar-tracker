import { motion } from "framer-motion";
import millify from "millify";
import { Link } from "react-router-dom";

const CryptoCard = ({ key, crypto, simplified }) => {
  return (
    <Link key={key} to={`/crypto/${crypto.uuid}`}>
      <motion.div
        key={crypto.name}
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2, type: "tween" }}
        className="h-[150px] w-[300px] bg-zinc-900 rounded-lg p-1 flex cursor-pointer m-auto"
      >
        <div className="flex items-center px-2 mr-4">
          <div className="flex flex-col items-center gap-2 justify-center flex-1 h-full">
            <img src={crypto.iconUrl} alt="" className="h-20 w-20" />
            <p
              className={`text-white font-bold w-20 text-center ${
                crypto.name.length > 10 && "text-sm"
              }`}
            >
              {crypto.name}
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-around p-2">
          <p className="text-md text-white">{`Rank: ${crypto.rank}`}</p>
          <p className="text-md text-white">
            Price: <strong className="golden">${millify(crypto?.price)}</strong>
          </p>
          <p className="text-md text-white">
            Market Cap: ${millify(crypto?.marketCap)}
          </p>
          <p className="text-md text-white">
            Daily Change:{" "}
            <strong
              className={`${
                crypto?.change < 0 ? "text-red-600" : "text-green-500"
              }`}
            >
              {millify(crypto?.change)}%
            </strong>
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default CryptoCard;
