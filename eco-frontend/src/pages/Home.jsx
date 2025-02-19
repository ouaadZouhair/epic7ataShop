import Container from "../components/Container/Container.jsx";
import {HeroContainer, PrimaryHero, SecondaryHero, CatHero, TopSellsSlider, FeaturedProducts, PrintingS, Footer} from "../components/imports.jsx";


const Home = (props) => {

    
    return (
        <>
            <HeroContainer>
                <PrimaryHero />
                <SecondaryHero />
                <CatHero/>
            </HeroContainer>

           

            <Container>
                <PrintingS/>
                <TopSellsSlider products={props.Products}/>
                <FeaturedProducts products={props.Products}/>
            </Container>
            <Footer/>


        </>
    );
}

export default Home;
