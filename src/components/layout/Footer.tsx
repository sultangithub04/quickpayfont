import Logo from "@/assets/icons/Logo";
import { FaFacebookF, FaYoutube, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router"

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-10 pb-6">
      <div className="container mx-auto px-6">

        {/* Top Section */}
        <div className="mb-8">
    <div className="bg-white w-10 rounded-3xl">
        <Logo />
    </div>
          <br />
          <p className="text-sm max-w-2xl">
            QuickPay provides fast, secure and convenient money transfer and payment services
            via mobile phone to the people of Bangladesh
          </p>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div>
            <h4 className="font-semibold mb-3">Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#">Campaigns</Link></li>
              <li><Link to="#">Customer Support</Link></li>
              <li><Link to="#">Complaint Cell</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#">About</Link></li>
              <li><Link to="#">Contact Us</Link></li>
              <li><Link to="#">Career</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Business</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#">Be a QuickPay Supplier</Link></li>
              <li><Link to="#">Be a QuickPay Merchant</Link></li>
              <li><Link to="#">Digital Payroll</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Others</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#">Terms</Link></li>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Security Tips</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Certificates of Security & Compliances</h4>
            <div className="flex gap-2">
              <img src="/src/assets/images/intertek.webp" alt="Certificate 1" className="h-10" />
              <img src="/src/assets/images/pci-dss.webp" alt="Certificate 2" className="h-10" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>© 2025 QuickPay, All Rights Reserved</p>
          <div className="flex gap-4 mt-3 md:mt-0 text-lg">
            <Link to="#"><FaFacebookF /></Link>
            <Link to="#"><FaYoutube /></Link>
            <Link to="#"><FaTwitter /></Link>
            <Link to="#"><FaLinkedinIn /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
