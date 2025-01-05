import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import GalleryCard from "../components/GalleryCard.tsx";

const DisplayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data } = location.state;

  const [pageNumber, setPageNumber] = useState(0);

  const incrementPage = () => {
    setPageNumber((i) => (i == data.collection.items.length - 1 ? i : i + 1));
  };

  const decrementPage = () => {
    setPageNumber((i) => (i == 0 ? i : i - 1));
  };

  const redirect = () => {
    navigate("/");
  };

  let item = data.collection.items[pageNumber];

  let info = {
    imageURL:
      item?.links[0]?.href ||
      "https://as2.ftcdn.net/v2/jpg/04/99/93/31/1000_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg",
    title: item.data[0].title,
    dateCreated: moment(item.data[0].date_created).format("MMMM Do YYYY"),
    description: item.data[0].description,
  };

  return (
    <div>
      <div className="relative w-2/3 my-10 mx-auto">
        <button
          onClick={redirect}
          className="mono py-2 px-8 m-2 bg-[#15418C] text-white rounded-[10px]"
        >
          Back
        </button>
        <button
          onClick={decrementPage}
          className="text-6xl absolute text-[#FAECFD] left-[-80px] top-1/2 p-3"
        >
          ◀
        </button>
        <GalleryCard info={info} />
        <button
          onClick={incrementPage}
          className="text-6xl absolute right-[-80px] text-[#FAECFD] top-1/2 p-3"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default DisplayPage;
