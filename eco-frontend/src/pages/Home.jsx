import Container from "../components/Container.jsx";
import Categories from "../components/Categories/Categories.jsx";
import CatHero from "../components/Hero/CatHero.jsx";
import HeroContainer from "../components/Hero/HeroContainer.jsx";
import PrimaryHero from "../components/Hero/PrimaryHero.jsx";

import TopSellsSlider from "../components/TopSellsSlider/TopSellsSlider.jsx";
import FeaturedProducts from "../components/FeaturedProducts/featuredProducts.jsx";
import PrintingS from "../components/PrintingSection/PrintingS.jsx";
import Footer from "../components/footer/Footer.jsx";
import SecondaryHero from "../components/Hero/SecondaryHero.jsx";

const Home = (props) => {

    
    return (
        <>
            <HeroContainer>
                <PrimaryHero />
                <SecondaryHero />
                <CatHero/>
            </HeroContainer>

           

            <Container>
                {/* <Categories /> */}
                <PrintingS/>
                <TopSellsSlider products={props.Products}/>
                <FeaturedProducts products={props.Products}/>
            </Container>
            <Footer/>


        </>
    );
}

export default Home;
