import angular from "../public/images/angular.png";
import reactjs from "../public/images/react.png";
import vuejs from "../public/images/vue.png";
import angleDown from "../public/images/angle-down-solid.svg";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState("");

  const placeholder = "Select your news";

  const onSelectItem =
    (item: string): MouseEventHandler =>
    (event) => {
      console.log("lelelel");
      setItem(item);
      setOpen(false);
    };

  return (
    <div style={{ margin: "20px 0px 20px 122px" }}>
      <div className="relative w-[30rem]">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300"
        >
          <span>{item == "" ? placeholder : item}</span>
          <span className="text-2xl w-4 h-4 grid place-content-center">
            <Image src={angleDown} alt="angle down" />
          </span>
        </button>

        {open && (
          <ul className="z-2 absolute mt-1 w-full rounded bg-gray-50 ring-1 ring-gray-300">
            <li
              className="cursor-pointer select-none p-2 hover:bg-gray-200 flex gap-2"
              onClick={onSelectItem("angular")}
            >
              <Image src={angular} alt="angular" /> Angular
            </li>
            <li
              className="cursor-pointer select-none p-2 hover:bg-gray-200  flex gap-2"
              onClick={onSelectItem("reactjs")}
            >
              <Image src={reactjs} alt="reactjs" />
              React
            </li>
            <li
              className="cursor-pointer select-none p-2 hover:bg-gray-200  flex gap-2"
              onClick={onSelectItem("vuejs")}
            >
              <Image src={vuejs} alt="vuejs" /> Vuejs
            </li>
          </ul>
        )}
      </div>
      <style jsx>{``}</style>
    </div>
  );
};
