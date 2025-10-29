import React from "react";
import { NewsTab } from "./NewsTab";

const New = () => {
  return (
    <div className="grid grid-cols-4  items-center gap-6 ">
      <div className="col-span-1 bg-primary">
        <NewsTab id="bab5588e-d381-41a4-e65f-08de14638c7a" />
        <NewsTab id="bab5588e-d381-41a4-e65f-08de14638c7a" />
        <NewsTab id="bab5588e-d381-41a4-e65f-08de14638c7a" />
        <NewsTab id="bab5588e-d381-41a4-e65f-08de14638c7a" />
        <NewsTab id="bab5588e-d381-41a4-e65f-08de14638c7a" />
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default New;
