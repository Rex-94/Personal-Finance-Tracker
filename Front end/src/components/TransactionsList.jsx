import {Button} from "@/components/ui/button";
const TransactionList = ({
  transactions,
  deleteTransaction,
  editTransaction,
}) =>{
  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem 
          key={transaction._id}
          transaction={transaction}
          deleteTransaction={deleteTransaction}
          editTransaction={editTransaction}
          />
        ))}
      </ul>
    </div>
  );

};

const TransactionItem = ({
  transaction,
  deleteTransaction,
  editTransaction,
  })=>{
    return(
          <li>
            <h2>{transaction.description}</h2>
            <p>{transaction.type}</p>
            <p>{transaction.amount}</p>
            <div className="button-group">
  <Button className="button-custom">Edit</Button>
  <Button
    onClick={() => deleteTransaction(transaction._id)}
    className="button-custom"
  >
    Delete
  </Button>
</div>

           </li>
    );
  };
export default TransactionList;