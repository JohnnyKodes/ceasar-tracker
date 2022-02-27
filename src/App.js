import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Cryptocurrencies from "./components/Cryptocurrencies";
import News from "./components/News";
import CoinDetails from "./components/CoinDetails";

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-neutral-400">
      <Navbar />
      <div className="min-h-[calc(100vh-70px)]">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/news" element={<News />} />
          <Route exact path="/crypto/:coinId" element={<CoinDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
