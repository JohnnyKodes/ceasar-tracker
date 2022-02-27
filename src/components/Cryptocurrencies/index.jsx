import millify from "millify";
import { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { motion } from "framer-motion";
import CryptoCard from "./CryptoCard";
import Loader from "../Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  if (simplified) {
    return (
      <>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-4">
          {cryptos?.map((crypto) => (
            <CryptoCard crypto={crypto} simplified />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-full">
        <div className="m-4">
          <input
            type="text"
            placeholder="Search Cryptocurrency"
            className="p-3 w-[300px] rounded-full text-black border-[3px] border-yellow-600"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <motion.div
          initial={{ y: 500 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-4 mb-4 w-full"
        >
          {cryptos?.map((crypto, index) => (
            <CryptoCard crypto={crypto} />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Cryptocurrencies;
