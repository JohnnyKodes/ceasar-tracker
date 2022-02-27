import React from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import GlobalStats from "./GlobalStats";
import Loader from "./Loader";
import News from "./News";

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="min-h-[calc(100vh-70px)] w-full flex flex-col p-5 overflow-hidden">
        <div className="flex justify-between xl:flex-row flex-col">
          <GlobalStats globalStats={globalStats} />
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">News</h1>
              <Link to="/news" className="linkHover">
                Show more
              </Link>
            </div>
            <div className="w-full">
              <News simplified />
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="w-full h-fit flex items-center justify-between my-5">
            <h1 className="text-3xl font-bold text-white">
              Top 10 Cryptos In The World
            </h1>
            <Link to="/cryptocurrencies" className="linkHover">
              Show more
            </Link>
          </div>
          <div className=" m-auto">
            <Cryptocurrencies simplified />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
