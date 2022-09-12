import logo from "../assets/logo.jpg"
import youtube from "../assets/youtube.png"
import instagram from "../assets/instagram.png"
import linkedin from "../assets/linkedin.png"
import twitter from "../assets/twitter.png"
import whatsapp from "../assets/whatsapp.png"
import facebook from "../assets/facebook.png"

const Footer = () => {
  return (
    <footer className="w-full h-[20rem] flex flex-col justify-between items-center text-white bg-red-400 px-4">
      <div className="m-auto flex items-center">
        {/* Logo */}
        <img className="w-32 h-32 rounded-full mr-16" src={logo} alt="" />

        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 text-center text-lg mb-8">
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
          
          <div className="flex items-center pt-8">
            <div className="flex flex-col items-center mr-16">
              <h1 className="text-3xl font-bold">Follow our socials</h1>
              <a href="https://www.flaticon.com/free-icons/">Icons by - Flaticon</a>
            </div>
            
            {/* Icons */}
            <div className="grid grid-cols-6 gap-8">
              <img className="w-12 h-12 mx-auto" src={youtube} alt="" />
              <img className="w-12 h-12 mx-auto" src={instagram} alt="" />
              <img className="w-12 h-12 mx-auto" src={linkedin} alt="" />
              <img className="w-12 h-12 mx-auto" src={twitter} alt="" />
              <img className="w-12 h-12 mx-auto" src={whatsapp} alt="" />
              <img className="w-12 h-12 mx-auto" src={facebook} alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;