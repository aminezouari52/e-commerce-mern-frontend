import { useState, useEffect } from "react";

// FUNCTIONS
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import { setSearchText } from "../reducers/searchReducer";

// COMPONENTS
import ProductCard from "../components/cards/ProductCard";
import RangeSlider from "react-range-slider-input";

// STYLE
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
  CheckboxGroup,
  Stack,
  Checkbox,
  Badge,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import {
  AiOutlineDollarCircle,
  AiOutlineTag,
  AiOutlineBgColors,
} from "react-icons/ai";
import { BiShapeCircle } from "react-icons/bi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { GrCheckboxSelected } from "react-icons/gr";
import "react-range-slider-input/dist/style.css";

const Shop = () => {
  const dispatch = useDispatch();
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([1000, 3500]);
  const [tooltip, setTooltip] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  const search = useSelector((state) => state.search.searchText);
  const { text } = search;

  // 1. load products by default on page load
  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const loadAllProducts = () => {
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
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch(
      setSearchText({
        text: "",
      })
    );
    setCategoryIds([]);
    setPrice(value);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // handle check for categories
  const handleCheck = (e) => {
    dispatch(
      setSearchText({
        text: "",
      })
    );
    setPrice([0, 0]);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  const handleSub = (sub) => {
    setSub(sub);
    dispatch(
      setSearchText({
        text: "",
      })
    );
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };

  const handleBrand = (e) => {
    setSub("");
    dispatch(
      setSearchText({
        text: "",
      })
    );
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand(e.target.value);
    setColor("");
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };
  const handleColor = (e) => {
    setSub("");
    dispatch(
      setSearchText({
        text: "",
      })
    );
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  const handleShippingchange = (e) => {
    setSub("");
    dispatch(
      setSearchText({
        text: "",
      })
    );
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
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
                id="range-slider"
              />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex flex="1" textAlign="left" alignItems="center">
                  <Icon as={GrCheckboxSelected} mr={2} />
                  <Text>Category</Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <CheckboxGroup value={!categoryIds.length && []}>
                <Stack spacing={[1, 5]} direction="column">
                  {categories.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={handleCheck}
                      value={c._id}
                      name="category"
                      isChecked={categoryIds.includes(c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex flex="1" textAlign="left" alignItems="center">
                  <Icon as={AiOutlineTag} mr={2} />
                  <Text>Sub Categories</Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack direction="row">
                {subs.map((sub) => (
                  <Badge
                    key={sub._id}
                    cursor="pointer"
                    colorScheme="purple"
                    onClick={() => handleSub(sub)}
                  >
                    {sub.name}
                  </Badge>
                ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex flex="1" textAlign="left" alignItems="center">
                  <Icon as={BiShapeCircle} mr={2} />
                  <Text>Brand</Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <RadioGroup onChange={setBrand} value={brand}>
                <Stack>
                  {brands.map((b) => (
                    <Radio
                      key={b}
                      value={b}
                      isChecked={b === brand}
                      onChange={handleBrand}
                    >
                      {b}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex flex="1" textAlign="left" alignItems="center">
                  <Icon as={AiOutlineBgColors} mr={2} />
                  <Text>Color</Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <RadioGroup onChange={setColor} value={color}>
                <Stack>
                  {colors.map((c) => (
                    <Radio
                      key={c}
                      value={c}
                      isChecked={c === color}
                      onChange={handleColor}
                    >
                      {c}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex flex="1" textAlign="left" alignItems="center">
                  <Icon as={MdOutlineLocalShipping} mr={2} />
                  <Text>Shipping</Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack spacing={5} direction="row">
                <Checkbox
                  onChange={handleShippingchange}
                  value="Yes"
                  isChecked={shipping === "Yes"}
                >
                  Yes
                </Checkbox>
                <Checkbox
                  onChange={handleShippingchange}
                  value="No"
                  isChecked={shipping === "No"}
                >
                  No
                </Checkbox>
              </Stack>
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
