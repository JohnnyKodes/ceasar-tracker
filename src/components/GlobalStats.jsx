import millify from "millify";

const GlobalStats = ({ globalStats }) => {
  const stats = [
    {
      title: "Total Cryptocurrencies",
      value: millify(globalStats?.total),
    },
    {
      title: "Total Exchanges",
      value: globalStats?.totalExchanges,
    },
    {
      title: "Total Market Cap",
      value: millify(globalStats?.totalMarketCap, {
        precision: 2,
      }),
    },
    {
      title: "Total 24h Volume",
      value: millify(globalStats?.total24hVolume, {
        precision: 2,
      }),
    },
    {
      title: "Total Markets",
      value: millify(globalStats?.totalMarkets, {
        precision: 2,
      }),
    },
  ];

  return (
    <div className="flex flex-col xl:mb-0 mb-4">
      <h1 className="text-3xl font-bold text-white">Global Stats</h1>
      <div className="flex w-full items-center justify-center">
        <div className="grid sm:grid-cols-3 grid-cols-2 mt-5 gap-4">
          {stats.map(({ title, value }) => (
            <div key={title + value} className="m-auto text-center">
              <p className="text-lg text-white">{title}</p>
              <p className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-yellow-500 text-2xl">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalStats;
