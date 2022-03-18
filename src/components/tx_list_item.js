import React from "react";
import { ethers } from "ethers";

const TransactionListItem = ({ tx }) => {
  return (
    <div className="py-4 grid grid-cols-3 gap-4">
      <div className="">
        <div className="max-w-sm mx-auto flex items-center space-x-4">
          <div className="shrink-0 h-12 w-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full relative">
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2	">
              <p className="text-white">Tx</p>
            </div>
          </div>
          <div>
            <div className="text-xl font-medium text-blue-500">
              {(+ethers.utils.formatEther(tx.value)).toFixed(4)} Eth
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="max-w-sm mx-auto items-center">
          <div className="text-xl text-black">
            Hash:{" "}
            <span className="max-w-xs inline-block align-bottom	truncate text-blue-500">
              {tx.hash}
            </span>
          </div>
          <div className="text-black">
            Block Number:{" "}
            <span className="text-blue-400">{tx.blockNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionListItem;
