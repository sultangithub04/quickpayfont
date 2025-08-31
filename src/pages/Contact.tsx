import { useSendMailMutation } from '@/redux/features/user/user.api'
import {  useState, type FC } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { toast } from 'sonner'

const Contact: FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sendMail]= useSendMailMutation()

  const handleSubmit =async (e: React.FormEvent) => {
  const toasId = toast.loading("Sending Mail")
    e.preventDefault()
    // Simulate form submission
    const data= { name, email, message }
    console.log({ name, email, message })
    await sendMail(data)
    toast.success("Thanking you for your Query", {id: toasId})
    setSubmitted(true)
    setName('')
    setEmail('')
    setMessage('')
    setTimeout(() => setSubmitted(false), 5000) // hide message after 5s
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-red-500 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Contact QuickPay</h1>
        <p className="text-lg">Have questions? Reach out to us and we’ll get back to you promptly.</p>
      </header>

      {/* Contact Info */}
      <section className="py-12 px-6 md:px-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6">
          <FaMapMarkerAlt size={30} className="text-red-500 mb-2" />
          <h3 className="font-semibold text-lg">Address</h3>
          <p>123 QuickPay Street, Dhaka, Bangladesh</p>
        </div>
        <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6">
          <FaPhone size={30} className="text-red-500 mb-2" />
          <h3 className="font-semibold text-lg">Phone</h3>
          <p>+880 1700 000 000</p>
        </div>
        <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6">
          <FaEnvelope size={30} className="text-red-500 mb-2" />
          <h3 className="font-semibold text-lg">Email</h3>
          <p>support@quickpay.com</p>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16 px-6 md:px-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Send Us a Message</h2>
        {submitted && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            Your message has been sent! We will contact you shortly.
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  )
}

export default Contact
