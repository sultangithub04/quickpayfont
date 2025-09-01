import {  type FC, type JSX } from 'react'
import { FaMobileAlt, FaMoneyBillWave, FaExchangeAlt, FaLock, FaBolt, FaUsers } from 'react-icons/fa'

interface Feature {
  title: string
  description: string
  icon: JSX.Element
}

const features: Feature[] = [
  {
    title: 'Instant Money Transfer',
    description: 'Send money to anyone instantly, anywhere in the country, with zero hassle.',
    icon: <FaBolt size={40} className="text-red-500" />,
  },
  {
    title: 'Cash In / Cash Out',
    description: 'Easily load your wallet or withdraw cash at partnered agents.',
    icon: <FaMoneyBillWave size={40} className="text-red-500" />,
  },
  {
    title: 'Mobile Payments',
    description: 'Pay for bills, online purchases, and services directly from your wallet.',
    icon: <FaMobileAlt size={40} className="text-red-500" />,
  },
  {
    title: 'Secure Transactions',
    description: 'All your transactions are secured with state-of-the-art encryption.',
    icon: <FaLock size={40} className="text-red-500" />,
  },
  {
    title: 'Peer-to-Peer Transfers',
    description: 'Easily send and receive money between friends and family.',
    icon: <FaExchangeAlt size={40} className="text-red-500" />,
  },
  {
    title: 'Dedicated Support',
    description: 'Our team is always ready to assist you with any issues or queries.',
    icon: <FaUsers size={40} className="text-red-500" />,
  },
]

const Features: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-red-500 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">QuickPay Features</h1>
        <p className="text-lg">Discover all the powerful features of QuickPay Digital Wallet</p>
      </header>

      {/* Features List */}
      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Features
