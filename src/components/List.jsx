import React from "react";
import Card from "./Card";

const borderColorList = [
  "border-red-500",
  "border-blue-500",
  "border-green-500",
  "border-yellow-500",
];

const List = ({ data, yearsList }) => {
  return (
    <ul className="flex gap-x-3">
      {yearsList.map((year, index) => (
        <li
          key={year}
          className={`bg-white min-w-[25%] h-min px-3 py-4 rounded border-0 border-t-4 ${
            borderColorList[index % borderColorList.length]
          }`}
        >
          <div className="flex justify-between mb-3">
            <h3>{year}</h3>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </span>
          </div>

          <div className="flex flex-col gap-y-2">
            {data?.length &&
              data
                .filter(({ publish_year }) => publish_year.includes(year))
                .map((book, index) => <Card key={index} book={book} />)}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
