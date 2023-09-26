import StarRating from "react-star-ratings"
import { Box } from "@chakra-ui/react"

export const showAverage = (product) => {
  if (product && product.ratings) {
    let ratingsArray = product && product.ratings
    let total = []
    let length = ratingsArray.length
    ratingsArray.map((r) => total.push(r.star))
    let totalReduced = total.reduce((p, n) => p + n, 0)
    let highest = length * 5
    let result = (totalReduced * 5) / highest

    return (
      <Box textAlign="center" pt={4}>
        <StarRating
          starDimension="20px"
          starSpacing="2px"
          starRatedColor="red"
          rating={result}
          editing={false}
        />
        ({product.ratings.length})
      </Box>
    )
  }
}
