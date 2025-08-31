import { FaMoneyBillWave, FaShoppingBag, FaHandHoldingUsd, FaWallet, FaBolt } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";

const services = [
  { icon: <GiTakeMyMoney className="text-pink-500 text-4xl" />, label: "Send Money" },
  { icon: <MdSendToMobile className="text-green-500 text-4xl" />, label: "Mobile Recharge" },
  { icon: <FaShoppingBag className="text-orange-500 text-4xl" />, label: "Payment" },
  { icon: <FaHandHoldingUsd className="text-teal-500 text-4xl" />, label: "Cash Out" },
  { icon: <FaMoneyBillWave className="text-green-600 text-4xl" />, label: "bKash Bundle" },
  { icon: <FaWallet className="text-purple-500 text-4xl" />, label: "Add Money" },
  { icon: <FaBolt className="text-gray-600 text-4xl" />, label: "Pay Bill" },
];

export default function Home() {
  return (
    <section className="bg-pink-50 py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-lg font-semibold mb-8">Learn More about bKash Services</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-white shadow-md rounded-full p-4 mb-3 hover:scale-105 transition-transform">
                {service.icon}
              </div>
              <p className="text-sm font-medium">{service.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
