interface NASAInfo {
  imageURL: string;
  title: string;
  dateCreated: string;
  description: string;
}

interface NASAProps {
  info: NASAInfo;
}

const GalleryCard: React.FC<NASAProps> = ({ info }) => {
  return (
    <div className="mono flex bg-[#FAECFD] p-2 m-2 rounded-[10px]">
      <div className="w-1/2 p-4 text-center mb-5">
        <h1 className=" mb-5 text-2xl w-3/4 m-auto">{info.title}</h1>
        <img src={info.imageURL} className="w-64 h-64 m-auto" />
        <h6 className="mt-5 text-xl">{info.dateCreated}</h6>
      </div>
      <div className="h-72 bg-gray-200 border-[1px] border-black mt-16 mr-10"></div>
      <div className="w-1/2 border-black mb-10">
        <div className="mt-5 mr-10 h-96 overflow-y-scroll">
          {info.description}
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
