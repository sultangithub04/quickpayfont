import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaMoneyBillWave, FaPlusCircle, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import { useTransactionInfoQuery, useWaletInfoQuery } from "@/redux/features/user/user.api";
import { Link } from "react-router";
import LoadingSpinner from "@/utils/LoadingSpinner";

interface Transaction {
  id: string;
  type: "send" | "topup" | "withdraw";
  amount: number;
  date: string;
}

export default function Overview() {
  const { data } = useTransactionInfoQuery(undefined)
  const { data: balance, isLoading } = useWaletInfoQuery(undefined)
  if (isLoading) {
    return <LoadingSpinner />
  }
console.log(data?.data);

  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "send":
        return <MdSendToMobile className="text-blue-500 text-lg" />;
      case "cash_in":
        return <FaPlusCircle className="text-green-500 text-lg" />;
      case "add_money":
        return <FaPlusCircle className="text-green-500 text-lg" />;
      case "withdraw":
        return <FaArrowDown className="text-red-500 text-lg" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Wallet Balance */}
      <Card className="col-span-1 lg:col-span-3 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <FaMoneyBillWave className="text-green-600" />
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold text-gray-800">Tk. {balance?.balance ?? 0}.00 </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 flex-wrap">
          <Link type="button" to={"/user/sendmoney"} className="flex items-center gap-2">
            <MdSendToMobile /> Send Money
          </Link>
          <Button variant="secondary" className="flex items-center gap-2">
            <FaPlusCircle /> <Link to={"/user/deposit"}>Deposit</Link>
          </Button>
          <Button variant="destructive" className="flex items-center gap-2">
            <FaArrowDown /><Link to={"/user/withdrawmoney"}>withDraw</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="lg:col-span-2 shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data?.data.slice(-3).map((tx) => (
              <li
                key={tx.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  {getTypeIcon(tx.type)}
                  <span className="capitalize">{tx.type}</span>
                </div>
                <span className="font-medium">TK. {tx.amount}.00</span>
                <span className="text-sm text-gray-500">{new Date(tx.updatedAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
