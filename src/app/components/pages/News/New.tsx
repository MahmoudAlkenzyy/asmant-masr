import React from "react";
import { NewsTab } from "./NewsTab";

const New = () => {
  return (
    <div className="grid grid-cols-4  items-center gap-6 ">
      <div className="col-span-1 bg-primary">
        <NewsTab />
        <NewsTab />
        <NewsTab />
        <NewsTab />
        <NewsTab />
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default New;
