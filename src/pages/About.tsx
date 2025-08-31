

import type { FC } from 'react'
import { FaWallet, FaUsers, FaRocket } from 'react-icons/fa'

interface TeamMember {
  name: string
  role: string
  photo: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Alice Rahman',
    role: 'CEO',
    photo: '/src/assets/images/md.jpg',
  },
  {
    name: 'John Karim',
    role: 'CTO',
    photo: '/src/assets/images/ceo.jpeg',
  },
  {
    name: 'Sara Ahmed',
    role: 'Product Manager',
    photo: '/src/assets/images/cto.jpg',
  },
]

const About: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-red-500 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">About QuickPay</h1>
        <p className="text-lg">Your trusted digital wallet for fast, secure, and convenient transactions.</p>
      </header>

      {/* Service Story */}
      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <FaWallet size={60} className="text-red-500" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <p>
              QuickPay started with a vision to make digital payments simple and accessible for everyone. 
              From paying bills to sending money to friends, we streamline your financial life with security 
              and convenience at the core of our services.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6 md:px-16 bg-gray-100 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:flex-row-reverse">
          <FaRocket size={60} className="text-red-500" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p>
              Our mission is to empower individuals and businesses to manage their money effortlessly. 
              We aim to deliver fast, secure, and innovative digital financial solutions that everyone can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <FaUsers size={50} className="mx-auto text-red-500" />
          <h2 className="text-3xl font-semibold mt-4">Meet Our Team</h2>
          <p className="mt-2 text-gray-600">A group of passionate professionals driving QuickPay forward.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white shadow-lg rounded-xl p-6 text-center">
              <img
                src={member.photo}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
