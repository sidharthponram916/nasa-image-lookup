import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [from, setFrom] = useState<number>(1920);
  const [to, setTo] = useState<number>(2024);

  const handleQuery = (e: any) => {
    setQuery(e.target.value);
  };

  const handleFrom = (e: any) => {
    setFrom(e.target.value);
  };

  const handleTo = (e: any) => {
    setTo(e.target.value);
  };

  const handleEvent = async () => {
    if (query?.trim() != "") {
      if (
        Number(from) >= 1920 &&
        Number(from) <= 2024 &&
        Number(to) >= 1920 &&
        Number(to) <= 2024 &&
        Number(from) <= Number(to)
      ) {
        try {
          const res = await fetch(
            `https://images-api.nasa.gov/search?q=${query}&media_type=image&year_start=${from}&year_end=${to}`
          );
          const data = await res.json();

          if (data.collection.items.length > 0) {
            navigate("/display", { state: { data } });
          } else {
            setErrorMessage("No results found.");
          }
        } catch (e) {
          console.log("There was an error!");
        }
      } else {
        setErrorMessage("Invalid input, please try again.");
      }
    } else {
      setErrorMessage("Invalid input, please try again.");
    }
  };

  return (
    <div className="w-2/3 my-48 mx-auto justify-items-center">
      <div className="mono p-2 text-4xl m-2 bg-[#FAECFD] rounded-[10px]">
        <h1>NASA Image Search</h1>
      </div>
      <input
        type="text"
        value={query}
        onChange={handleQuery}
        className="my-6 p-1 text-sm rounded w-64"
        placeholder="Enter in phrase"
      />
      <div className="text-sm">
        <span className="text-white text-sm">Select Year Range: </span>
        <input
          type="number"
          min="1920"
          max="2024"
          value={from}
          onChange={handleFrom}
          className="mr-2 rounded p-1"
        />
        <input
          type="number"
          min="1920"
          max="2024"
          value={to}
          onChange={handleTo}
          className="rounded p-1"
        />
      </div>

      <div>
        {errorMessage != "" ? (
          <div className="bg-red-500 p-2 text-white mt-5 text-sm rounded">
            {errorMessage}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="pt-5">
        <button
          onClick={handleEvent}
          className="mono bg-[#15418C] text-white p-2 text-xl rounded-[10px]"
        >
          Search!
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
