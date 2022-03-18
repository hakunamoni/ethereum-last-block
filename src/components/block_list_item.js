import React from "react";

const BlockListItem = ({ block }) => {
  return (
    <div className="py-4 grid grid-cols-3 gap-4">
      <div className="">
        <div className="max-w-sm mx-auto flex items-center space-x-4">
          <div className="shrink-0 h-12 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg relative">
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2	">
              <p className="text-white">Bk</p>
            </div>
          </div>
          <div>
            <div className="text-xl font-medium text-blue-500">
              {block.number}
            </div>
            <p className="text-gray-500">{block.transactions.length} txns</p>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="max-w-sm mx-auto items-center">
          <div className="text-xl text-black">
            Miner:{" "}
            <span className="max-w-xs inline-block align-bottom	truncate text-blue-500">
              {block.miner}
            </span>
          </div>
          <div className="text-black">
            Total Difficulty:{" "}
            <span className="text-blue-400">
              {block._difficulty.toString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockListItem;
