import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../services/cryptoApi";
import Loader from "../Loader";
import HTMLReactParser from "html-react-parser";
import {
  AiOutlineDollarCircle,
  AiOutlineThunderbolt,
  AiOutlineTrophy,
  AiOutlineNumber,
  AiOutlinePieChart,
} from "react-icons/ai";
import millify from "millify";
import LineChart from "./LineChart";
import TimeSelector from "./TimeSelector";

const CoinDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  const cryptoDetails = data?.data?.coin;

  const time = ["3h", "24h", "7d", "30d", "1y", "3M", "3y", "5y"];

  if (isFetching) return <Loader />;

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${
        cryptoDetails?.price &&
        millify(parseFloat(cryptoDetails?.price), {
          precision: 2,
          lowercase: true,
        })
      }`,
      icon: <AiOutlineDollarCircle />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <AiOutlineNumber /> },
    {
      title: "Circulating Supply",
      value: `${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating, {
          precision: 3,
        })
      } ${cryptoDetails?.symbol && cryptoDetails?.symbol}`,
      icon: <AiOutlinePieChart />,
    },
    {
      title: "Total Supply",
      value: `${
        cryptoDetails?.supply.total &&
        millify(cryptoDetails?.supply?.total, {
          precision: 3,
        })
      } ${cryptoDetails?.symbol && cryptoDetails?.symbol}`,
      icon: <AiOutlineThunderbolt />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap &&
        millify(parseFloat(cryptoDetails?.marketCap), {
          precision: 2,
        })
      }`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails?.allTimeHigh.price, {
        precision: 2,
      })}`,
      icon: <AiOutlineTrophy />,
    },
  ];

  return (
    <div className="flex flex-col items-center w-full h-auto sm:px-20">
      <div className="flex flex-col items-center my-2 gap-1">
        <h1 className="text-3xl golden font-extrabold">
          {cryptoDetails.name} {cryptoDetails.symbol} Price
        </h1>
        <p className="px-4 text-center">
          {cryptoDetails.name} live price in US dollars. View value statistice,
          market cap and supply.
        </p>
      </div>
      <div className="w-full flex justify-start pl-5">
        <div className="w-[100px]">
          <TimeSelector
            time={time}
            timePeriod={timePeriod}
            setTimePeriod={setTimePeriod}
          />
        </div>
      </div>
      <div className="flex xl:flex-row flex-col justify-between items-center w-full pb-5 gap-5">
        <div className="w-full">
          {coinHistory && (
            <LineChart
              coinHistory={coinHistory}
              currentPrice={millify(cryptoDetails.price)}
              coinName={cryptoDetails.name}
              timePeriod={timePeriod}
            />
          )}
        </div>
        <div className="flex flex-col items-center border border-zinc-700 sm:w-[550px] w-full rounded-lg p-4 h-fit">
          <div className="text-center">
            <h3 className="text-2xl golden font-bold">
              {cryptoDetails.name} Value Statistics
            </h3>
            <p className="text-sm">
              An overview showing the stats of {cryptoDetails.name}
            </p>
          </div>
          <div className="w-full h-full flex flex-col justify-around gap-5 mt-5">
            {stats.map(({ icon, title, value }) => (
              <div
                key={title + value}
                className="flex justify-between border-b border-zinc-700 pb-4"
              >
                <div className="flex gap-2 items-center">
                  <p className="text-yellow-500 text-3xl">{icon}</p>
                  <p className="text-white font-bold text-lg">{title}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-extrabold golden text-xl">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex xl:flex-row flex-col items-center">
        {cryptoDetails.description && (
          <div className="p-4">
            <p className="text-3xl pb-1 font-bold golden">
              What is {cryptoDetails.name}?
            </p>
            <div className="description">
              {HTMLReactParser(cryptoDetails.description)}
            </div>
          </div>
        )}

        <div className="flex flex-col items-center border border-zinc-700 w-full rounded-lg p-4 mb-5 h-fit">
          <h2 className="text-3xl pb-3 border-b w-full text-center mb-6 font-bold golden">
            {cryptoDetails.name} Links
          </h2>
          {cryptoDetails.links.map((link, index) => (
            <div key={index} className="flex justify-between w-full">
              <p>{link.type}</p>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-white text-lg linkHover"
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
