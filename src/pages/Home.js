// COMPONENTS
import Jumbotron from "../components/cards/Jumbotron"
import BestSellers from "../components/home/BestSellers"
import NewArrivals from "../components/home/NewArrivals"
import CategoryList from "../components/category/CategoryList"
import SubList from "../components/sub/SubList"

// STYLE
import { Box } from "@chakra-ui/react"

const Home = () => {
  return (
    <Box overflowX="hidden">
      <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      <BestSellers />
      <NewArrivals />
      <CategoryList />
      <SubList />
    </Box>
  )
}

export default Home
