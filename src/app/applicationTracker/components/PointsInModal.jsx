import editIcon from "@/app/assets/icons/plus-icon.svg";
import Image from "next/image";
const PointsInModal = () => {
  return (
    <div className=" border-4 border-black rounded-xl text-xs flex flex-col items-center gap-2 ">
      <div className="w-full px-2 py-1 flex items-center justify-between">
        <p className="text-base underline">Points to remember</p>
        <Image
          src={editIcon}
          alt="edit icon"
          onClick={() => {}}
          className="w-6 bg-white rounded-full p-1"
        />
      </div>
      <ul className="list-disc p-1">
        <li className="text-wrap max-w-full break-words">
          Lorem ipsum dolor sit amet.
        </li>
        <li className="text-wrap max-w-full break-words">
          Lorem ipsum dolor sit amet.
        </li>
        <li className="text-wrap max-w-full break-words">
          Lorem ipsum dolor sit amet.
        </li>

        <li className="text-wrap max-w-full break-words">
          Lorem ipsum dolor sit amet.
        </li>
      </ul>
    </div>
  );
};

export default PointsInModal;
