import { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import { setSearchText } from "../reducers/searchReducer";
import ProductCard from "../components/cards/ProductCard";
import {
  Heading,
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([1000, 3500]);
  const [ok, setOk] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  const dispatch = useDispatch();

  const search = useSelector((state) => state.search.searchText);
  const { text } = search;

  // 1. load products by default on page load
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    console.log("true");
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    if (!text) {
      loadAllProducts();
    } else {
      const delayed = setTimeout(() => {
        fetchProducts({ query: text });
      }, 300);
      return () => clearTimeout(delayed);
    }
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch(
      setSearchText({
        text: "",
      })
    );
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <>
      {loading && (
        <Center
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.2)"
        >
          <Spinner size="xl" color="blue" />
        </Center>
      )}
      <Flex direction={{ lg: "row", md: "row", sm: "column", base: "column" }}>
        <Accordion
          defaultIndex={[0]}
          allowMultiple
          maxWidth={{ lg: "50%", md: "50%", sm: "50%", base: "100%" }}
          minWidth={{ lg: "30%", md: "30%", sm: "30%", base: "100%" }}
        >
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex flex="1" textAlign="left" alignItems="center">
                  <Icon as={AiOutlineDollarCircle} mr={2} />
                  <Text>Price</Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Tooltip
                label={`$${price[0]} - $${price[1]}`}
                placement="top"
                isOpen={tooltip}
              >
                <div />
              </Tooltip>
              <RangeSlider
                value={price}
                onInput={handleSlider}
                onThumbDragStart={() => setTooltip(true)}
                onThumbDragEnd={() => setTooltip(false)}
                max={4999}
              />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Section 2 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box px={4}>
          <Heading color="red.700">Products</Heading>
          {products.length < 1 && (
            <Text textAlign="center">No products found</Text>
          )}
          <Flex wrap="wrap" justifyContent="space-between">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Shop;
