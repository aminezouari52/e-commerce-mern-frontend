// REACT
import React from 'react'
import { useDisclosure } from '@chakra-ui/react'

// COMPONENTS
import ProductCard from '../cards/ProductCard'

// STYLE
import { Flex, Box, Text, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const Products = ({ products, loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {products.length > 0 ? (
        <Flex w="100%" wrap="wrap" justifyContent="space-around">
          {products.map((product) => (
            <React.Fragment key={product._id}>
              {loading ? (
                <Box
                  padding="6"
                  boxShadow="lg"
                  bg="white"
                  mb={2}
                  w="30%"
                  mx={4}
                >
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
              ) : (
                <ProductCard
                  product={product}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                />
              )}
            </React.Fragment>
          ))}
        </Flex>
      ) : (
        <Text fontSize="xl" my={5} h="calc(100vh - 49px)">
          No products found
        </Text>
      )}
    </>
  )
}

export default Products
