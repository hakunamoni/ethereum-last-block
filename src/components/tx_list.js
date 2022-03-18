import React from "react";
import TransactionListItem from "./tx_list_item";

const TransactionList = ({ transactions }) => {
  return (
    <div className="divide-y">
      {transactions ? (
        transactions
          .sort((a, b) => {
            if (a.value.gt(b.value)) return -1;
            if (a.value.lt(b.value)) return 1;
            return 0;
          })
          .map((tx) => <TransactionListItem key={tx.hash} tx={tx} />)
      ) : (
        <h6 className="py-4">Loading...</h6>
      )}
    </div>
  );
};

export default TransactionList;
