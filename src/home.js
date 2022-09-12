import Categories from "./comps/categories";
import Footer from "./comps/footer";
import Products from "./comps/products";
import About from "./comps/about";
import Slider from "./comps/slider";

const Home = () => {
  return (
    <>
      <Slider />
      <Categories />
      <Products />
      <About />
      <Footer />
    </>
  );
}
 
export default Home;