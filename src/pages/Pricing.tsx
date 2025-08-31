
import type { FC, JSX } from 'react'
import { FaMoneyBillWave, FaRocket, FaLock } from 'react-icons/fa'

interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  icon: JSX.Element
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'For casual users who need essential wallet services.',
    features: [
      'Send and receive money',
      'Bill payments',
      'Secure transactions',
    ],
    icon: <FaMoneyBillWave size={40} className="text-red-500" />,
  },
  {
    name: 'Pro',
    price: 'Tk 10 / 1000',
    description: 'For power users with enhanced features.',
    features: [
      'Instant transfers',
      'Higher transaction limits',
      'Priority support',
      'Advanced analytics',
    ],
    icon: <FaRocket size={40} className="text-red-500" />,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    description: 'For businesses and high-volume users.',
    features: [
      'Custom integrations',
      'Dedicated account manager',
      'Advanced security options',
      'Bulk transactions',
    ],
    icon: <FaLock size={40} className="text-red-500" />,
  },
]

const Pricing: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-red-500 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">QuickPay Pricing</h1>
        <p className="text-lg">Choose a plan that fits your needs and start using QuickPay today.</p>
      </header>

      {/* Pricing Tiers */}
      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            {tier.icon}
            <h3 className="text-2xl font-semibold mt-4">{tier.name}</h3>
            <p className="text-red-500 text-xl font-bold mt-2">{tier.price}</p>
            <p className="mt-2 text-gray-600">{tier.description}</p>
            <ul className="mt-4 space-y-2 text-gray-700">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-red-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Select Plan
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Pricing
