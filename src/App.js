import React, { useEffect, useState, useCallback } from "react";
// import logo from './logo.svg';
import "./App.css";
import BlockList from "./components/block_list";
import TransactionList from "./components/tx_list";
import useIsWindowVisible from "./hooks/useIsWindowVisible";
import { ethers } from "ethers";

// put the infura id in the .env file.
const provider = new ethers.getDefaultProvider("homestead", {
  infura: "0e69be76c2574b23bcbb0203958b09aa",
});

function App() {
  const [isPlaying, setPlaying] = useState(true);

  const [lastBlockNumber, setBlockNumber] = React.useState(null);

  const blockNumberCallback = useCallback(
    (blockNumber) => {
      setBlockNumber((currentblockNumber) => {
        return Math.max(blockNumber, currentblockNumber);
      });
    },
    [setBlockNumber]
  );

  const windowVisible = useIsWindowVisible();

  useEffect(() => {
    if (!provider || !windowVisible) return undefined;

    if (isPlaying) {
      provider
        .getBlockNumber()
        .then(blockNumberCallback)
        .catch((error) =>
          console.error(`Failed to get block number for chainId: ${1}`, error)
        );

      provider.on("block", blockNumberCallback);
    } else {
      provider.off("block", blockNumberCallback);
    }
    return () => {
      provider.off("block", blockNumberCallback);
    };
  }, [blockNumberCallback, windowVisible, isPlaying]);

  const togglePlay = () => {
    setPlaying(!isPlaying);
  };

  const [blocks, setBlocks] = useState({});
  useEffect(() => {
    (async () => {
      if (lastBlockNumber) {
        const data = await provider.getBlockWithTransactions(lastBlockNumber);
        setBlocks((blocks) => ({ ...blocks, [data.number]: data }));
      }
    })();
  }, [lastBlockNumber, setBlocks]);

  return (
    <div className="h-screen w-screen	bg-sky-100">
      <div className="max-w-screen-xl	m-auto">
        <h1 className="text-center text-3xl font-bold pt-8">
          Ethereum Latest Blocks and Transactions - D. S.
        </h1>

        <div className="py-8 text-center">
          <button
            onClick={togglePlay}
            className="content-center bg-sky-600 hover:bg-sky-700 text-white rounded-lg px-[32px] py-[12px]"
          >
            <b>{isPlaying ? "Pause" : "Resume"}</b>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="shadow-md border border-grey-500 rounded-md bg-white">
            <div className="p-4 border-b border-grey-500 bg-slate-300">
              <h5 className="text-1xl font-bold">Ethereum Latest Blocks</h5>
            </div>
            <div
              className="px-4 overflow-auto bg-slate-100"
              style={{ height: "70vh" }}
            >
              <BlockList
                blocks={Object.keys(blocks)
                  .sort((a, b) => b - a)
                  .map((blockNum) => blocks[blockNum])}
              />
            </div>
          </div>

          <div className="shadow-md border border-grey-500 rounded-md bg-white">
            <div className="p-4 border-b border-grey-500 bg-slate-300">
              <h5 className="text-1xl font-bold">
                Ethereum Latest Transactions
              </h5>
            </div>
            <div
              className="px-4 overflow-auto bg-slate-100"
              style={{ height: "70vh" }}
            >
              <TransactionList
                transactions={blocks[lastBlockNumber]?.transactions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
