import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      new Date(
        coinHistory.data.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: "rgb(234, 179, 8)",
        borderColor: "rgb(234, 179, 8, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="mt-2 mb-2 flex justify-between w-full items-center">
        <h1 className="text-xl">{coinName} Price Chart</h1>
        <div className="flex gap-4">
          <p className="text-sm">
            Change over {timePeriod}:{" "}
            <strong
              className={`${
                coinHistory?.data?.change < 0
                  ? "text-red-600"
                  : "text-green-500"
              }`}
            >
              {coinHistory?.data?.change}%
            </strong>
          </p>
          <p className="text-sm">
            Current Price:{" "}
            <strong className="text-white">${currentPrice}</strong>
          </p>
        </div>
      </div>

      <div className="w-full h-auto">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
