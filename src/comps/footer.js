import logo from "../assets/logo.jpg"
import youtube from "../assets/youtube.png"
import instagram from "../assets/instagram.png"
import linkedin from "../assets/linkedin.png"
import twitter from "../assets/twitter.png"
import whatsapp from "../assets/whatsapp.png"
import facebook from "../assets/facebook.png"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="w-full h-full py-4 flex flex-col justify-between items-center text-white bg-red-400 px-4">
      <div className="m-auto flex flex-col md:flex-row py-8 items-center">
        {/* Logo */}
        <Link to="">
          <img className="w-32 h-32 rounded-full md:mr-16 md:mb-0 mb-8" src={logo} alt="" />
        </Link>

        <div className="flex flex-col items-center">
          <div className="grid md:grid-cols-3 gap-y-6 text-center text-md md:text-lg mb-3 md:mb-8">
            <div className="flex flex-col">
              <h1>Address</h1>
              <p>342091 Finch Ave W, North York, ON, Canada</p>
            </div>
            <div className="flex flex-col">
              <h1>Number</h1>
              <p>+1 (647)-000-000</p>
            </div>
            <div className="flex flex-col">
              <h1>Opening Hours</h1>
              <p>All day everyday, 24/7, 365 days a year</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center pt-8">
            <div className="flex flex-col items-center md:mr-16 md:mb-0 mb-8">
              <h1 className="text-2xl font-semibold">Follow our socials</h1>
              <a href="https://www.flaticon.com/free-icons/">Icons by - Flaticon</a>
            </div>
            
            {/* Icons */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
              <Link to=""><img className="w-12 h-12 mx-auto" src={youtube} alt="" /></Link>
              <Link to=""><img className="w-12 h-12 mx-auto" src={instagram} alt="" /></Link>
              <Link to=""><img className="w-12 h-12 mx-auto" src={linkedin} alt="" /></Link>
              <Link to=""><img className="w-12 h-12 mx-auto" src={twitter} alt="" /></Link>
              <Link to=""><img className="w-12 h-12 mx-auto" src={whatsapp} alt="" /></Link>
              <Link to=""><img className="w-12 h-12 mx-auto" src={facebook} alt="" /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;