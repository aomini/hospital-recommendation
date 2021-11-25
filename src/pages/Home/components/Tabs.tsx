import React from "react";

const tabData = ["auto-draft", "draft", "published"];

const Tabs = ({ activeTabName, handleClick }) => {
  return (
    <ul className="flex gap-2">
      {tabData.map((tab, index) => (
        <React.Fragment>
          <li
            key={tab}
            onClick={() => handleClick(tab)}
            className={`${
              activeTabName === tab ? "text-blue-600" : "text-gray-500"
            } text-sm cursor-pointer`}
          >
            {tab}
          </li>
          {index < tabData.length - 1 && "/"}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Tabs;
