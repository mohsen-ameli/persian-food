import Categories from "./comps/categories";
import Footer from "./comps/footer";
import Products from "./comps/products";
import QNA from "./comps/q&a";
import Slider from "./comps/slider";

const Home = () => {
  return (
    <>
      <Slider />
      <QNA />
      <Categories />
      <Products />
      <Footer />
    </>
  );
}
 
export default Home;