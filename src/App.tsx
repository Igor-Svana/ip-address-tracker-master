import { useEffect, useRef, useState } from "react";
import InfoBox from "./components/infoBox/infoBox";
import arrow from "./assets/icon-arrow.svg";
import "./App.css";
import axios from "axios";
import MapBox from "./components/mapBox/mapBox";
import Spinner from "./components/spinner/spinner";
import errorSVG from "./assets/exploring-looking-out.svg";

interface IAddressData {
  ip: string;
  isp: string;
  location: {
    city: string;
    country: string;
    timezone: string;
    lat: number;
    lng: number;
  };
}

function App() {
  const [ipAddressData, setIpAddressData] = useState<IAddressData>();
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const keyFunction = (event: { key: string }) => {
    if (event.key === "Enter") {
      fetchDomain();
    }
  };

  useEffect(() => {
    fetchDomain()
    window.addEventListener("keydown", keyFunction);
    return () => {
      window.removeEventListener("keydown", keyFunction);
    };
  }, []);

  const fetchDomain = async () => {
    setLoading(true);
    if (ref.current) {
      try {
        const domain = ref.current.value.replace(/^https?:\/\//, "");
        const res = await axios.get(
          `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${
            import.meta.env.VITE_API_KEY
          }&domain=${domain.replace(/\/*$/, "")}`
        );
        ref.current.value = "";
        setIpAddressData(res.data);
        setErrorMsg("");
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setErrorMsg(err.message);
        }
        setLoading(false);
      }
    }
  };

  return (
    <main className="main-container">
      <section className="header-section">
        <div className="input-box">
          <h1>IP Address Tracker</h1>
          <div className="input-container">
            <input
              type="text"
              id="input"
              ref={ref}
              placeholder="Search for any IP address of domain"
            />
            <button type="submit" onClick={fetchDomain}>
              <img src={arrow} alt="arrow" />
            </button>
          </div>
        </div>

        <div className="info-container">
          <div className="info-box">
            <InfoBox label="IP ADDRESS" info={ipAddressData?.ip} />
            <hr />
            <InfoBox
              label="LOCATION"
              info={ipAddressData?.location.city}
              country={ipAddressData?.location.country}
            />
            <hr />
            <InfoBox label="TIMEZONE" info={ipAddressData?.location.timezone} />
            <hr />
            <InfoBox label="ISP" info={ipAddressData?.isp} />
          </div>
        </div>
      </section>
      <div className="map-container">
        {loading === false && ipAddressData?.location.lat && (
          <MapBox
            lat={ipAddressData?.location.lat ? ipAddressData?.location.lat : 0}
            lng={ipAddressData?.location.lng ? ipAddressData?.location.lng : 0}
          />
        )}
        {errorMsg.length > 0 && (
          <div className="error-overlay-container">
            <span>{errorMsg}</span>
            <p>Please try to enter correct domain.</p>
            <img src={errorSVG} alt="error-svg" />
          </div>
        )}
        {loading === true && (
          <div className="spinner-container">
            <Spinner />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
