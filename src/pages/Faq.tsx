import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is QuickPay Digital Wallet?",
    answer:
      "QuickPay is a secure and fast digital wallet that allows you to send, receive, and store money anytime, anywhere.",
  },
  {
    question: "Is QuickPay safe to use?",
    answer:
      "Yes. QuickPay uses advanced encryption, secure authentication, and fraud detection to ensure your money and data are protected.",
  },
  {
    question: "Does QuickPay charge fees?",
    answer:
      "Sending money to QuickPay users is free. Service fees may apply for cash-in, cash-out, or bank transfers.",
  },
  {
    question: "How can I add money to my wallet?",
    answer:
      "You can add money via linked bank accounts, mobile banking, or authorized QuickPay agents.",
  },
  {
    question: "Can I use QuickPay internationally?",
    answer:
      "Currently, QuickPay supports local transfers. International transfers will be available soon.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us through the Contact page or email us at support@quickpay.com.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <FaQuestionCircle className="text-red-600 text-5xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h1>
        <p className="text-gray-600 mt-2">
          Find answers to the most common questions about QuickPay Digital Wallet.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-sm bg-white p-4 cursor-pointer transition hover:shadow-md"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">{faq.question}</h2>
              {openIndex === index ? (
                <FaChevronUp className="text-red-600" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-600 text-left">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
