import React from "react";
import SectionHeaderText from "../SectionHeaderText";
import CopyCreatorsLink from "../CopyCreatorsLink";
import EmptyPlaceholder from "../EmptyPlaceholder";
const Collections = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row items-center justify-between">
        <SectionHeaderText label={"Collection"} />

        <CopyCreatorsLink />
      </div>

      <div className="w-full">
        <EmptyPlaceholder />
      </div>
    </div>
  );
};

export default Collections;
