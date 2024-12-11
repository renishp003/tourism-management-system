import TourPackage from "../tourpackages/TourPackage"
import Bgimg from "./Bgimg"
import Carouselp from "./carousel/Carouselp"
import Service from "./service/Service"
import TravelArticles from "./TravelArticles"

const Home = () => {
  return (
    <>
       <Carouselp/>
       <Service/>
       <Bgimg/>
       <TourPackage/>
       <TravelArticles/>
    </>
  )
}

export default Home
