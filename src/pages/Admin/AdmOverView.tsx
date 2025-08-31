import { useGetOverViewQuery } from "@/redux/features/admin/admin.api";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { FaUsers, FaUserTie, FaExchangeAlt, FaMoneyBillWave } from "react-icons/fa";

export default function Overview() {
     const { data, isLoading } = useGetOverViewQuery(undefined)
      if (isLoading) {
             return <LoadingSpinner />
         }
         console.log(data?.data?.totalAgent);


  const stats = [
    {
      title: "Total Users",
      value: data?.data?.totalUser,
      icon: <FaUsers className="text-blue-500 text-3xl" />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Agents",
      value: data?.data?.totalAgent,
      icon: <FaUserTie className="text-green-500 text-3xl" />,
      bg: "bg-green-100",
    },
    {
      title: "Transactions",
      value: data?.data?.totaltransaction,
      icon: <FaExchangeAlt className="text-purple-500 text-3xl" />,
      bg: "bg-purple-100",
    },
    {
      title: "Total Volume",
      value: `৳${data?.data?.totalVolume.toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-yellow-500 text-3xl" />,
      bg: "bg-yellow-100",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-bold mb-6">Quick Pay Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-5 rounded-2xl shadow-md ${stat.bg}`}
          >
            <div className="p-3 rounded-full bg-white shadow">{stat.icon}</div>
            <div>
              <p className="text-gray-600 font-medium">{stat.title}</p>
              <h2 className="text-xl font-bold">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
