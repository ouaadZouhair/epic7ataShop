import Container from "../../components/Container/Container.jsx";
import {HeroContainer, PrimaryHero, SecondaryHero, CatHero, TopSellsSlider, FeaturedProducts, PrintingS, Footer} from "../../components/imports.jsx";


const Home = () => {

    
    return (
        <>
            <HeroContainer>
                <PrimaryHero />
                <SecondaryHero />
                <CatHero/>
            </HeroContainer>

            <Container>
                <PrintingS/>
                <FeaturedProducts/>
                <TopSellsSlider/>
            </Container>
            {/* <Footer/> */}

        </>
    );
}

export default Home;
