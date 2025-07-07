import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";
import{
  Card,
  CardContent,
  CardHeader,
  CardTitle,
}from "@/components/ui/card";

function Transactions({
  transactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
}) {
  const balance = transactions.reduce((acc, item) => {
return item.type === "expense" 
? acc -Number (item.amount)
: acc + Number(item.amount);
  }, 0);
  return (
    <div>
      <Card className="card2">
        <CardHeader>current balance:</CardHeader>
        <CardContent>{balance}</CardContent>
      </Card>
      
      <TransactionForm addTransaction={addTransaction} />
      <TransactionsList transactions={transactions}
      deleteTransaction={deleteTransaction}
      editTransaction={editTransaction}
       />
      
      </div>
     
      
  );
}
export default Transactions;