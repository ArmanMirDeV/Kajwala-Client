import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";
import { BsApple, BsGooglePlay } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-12 pb-6 relative">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide">
            Contact
          </h3>
          <p>16516 / 88096780016516</p>
          <p className="mt-1">info@KajWala.xyz</p>
          <div className="mt-3 text-sm">
            <p className="font-medium">Corporate Address</p>
            <p>Bakkar Tower, Plot: 9, Road: 15, Block: P, Motijheel, Dhaka</p>
          </div>
          <div className="mt-3 text-sm">
            <p className="font-medium">Trade License No</p>
            <p>TRAD/DNCC/145647/2022</p>
          </div>
        </div>

        {/* OTHER PAGES */}
        <div>
          <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide">
            Other Pages
          </h3>
          <ul className="space-y-2">
            {[
              "Blog",
              "Help",
              "Terms of use",
              "Privacy Policy",
              "Refund & Return Policy",
              "Sitemap",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-indigo-600 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide">
            Company
          </h3>
          <ul className="space-y-2">
            {["sManager", "sBusiness", "sDelivery", "sBondhu"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-indigo-600 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* DOWNLOAD APP */}
        <div>
          <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide">
            Download Our App
          </h3>
          <p className="text-sm mb-3">
            Tackle your to-do list wherever you are with our mobile app & make
            your life easy.
          </p>
          <div className="flex space-x-3 mb-4">
            <a
              href="#"
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <BsApple size={22} /> <span>App Store</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <BsGooglePlay size={22} /> <span>Google Play</span>
            </a>
          </div>

          {/* Social icons */}
          <div className="flex space-x-4 text-gray-600">
            <a href="#">
              <FaFacebookF className="hover:text-indigo-600 transition" />
            </a>
            <a href="#">
              <FaLinkedinIn className="hover:text-indigo-600 transition" />
            </a>
            <a href="#">
              <FaInstagram className="hover:text-indigo-600 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-sm text-gray-600">
        <p>Copyright © 2025 Sheba Platform Limited | All Rights Reserved</p>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 px-4 py-2 rounded-full shadow hover:shadow-md flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition"
      >
        Scroll to top <FaArrowUp className="text-indigo-600" />
      </button>
    </footer>
  );
};

export default Footer;
