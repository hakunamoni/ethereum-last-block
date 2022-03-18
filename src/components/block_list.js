import React from "react";
import BlockListItem from "./block_list_item";

const BlockList = ({ blocks }) => {
  return (
    <div className='divide-y'>
      {blocks.map((bk) => (
        <BlockListItem key={bk.hash} block={bk} />
      ))}
    </div>
  );
};

export default BlockList;
