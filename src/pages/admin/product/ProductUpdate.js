// REACT
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// FUNCTIONS
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getProduct, updateProduct } from "../../../functions/product";

// COMPONENTS
import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

// STYLE
import { Box, Heading, Card, CardBody } from "@chakra-ui/react";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
};
const ProductUpdate = () => {
  const slug = useParams().slug;
  const toast = useToast();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(false);

  // LOGGED IN USER
  const user = useSelector((state) => state.user.loggedInUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;
    try {
      const res = await updateProduct(slug, values, user.token);
      setLoading(false);

      toast({
        title: `"${res.data.title}" is updated`,
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    } catch (err) {
      console.log(err);
      setLoading(false);

      toast({
        title: err.response.data.err,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
  };
  const loadProduct = useCallback(async () => {
    try {
      const productResponse = await getProduct(slug);
      // 1 load single proudct
      setValues({ ...values, ...productResponse.data });
      // 2 load single product category subs
      const res = await getCategorySubs(productResponse.data.category._id);
      setSubOptions(res.data); // on first load, show default subs

      // // 3 prepare array of sub ids to show as default sub values in antd Select
      let arr = [];
      productResponse.data.subs.map((s) => {
        arr.push(s._id);
      });
      setArrayOfSubs((prev) => arr); // required for chakraUI checkbox to work
    } catch (err) {
      console.log(err);
    }
  }, [slug]);

  const loadCategories = useCallback(() => {
    getCategories().then((c) => setCategories(c.data));
  }, []);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, [loadProduct, loadCategories]);

  // PRICE & QUANTITY STEPPERS
  const incrementPrice = () => {
    const newPrice = Number(values.price) + 0.1;
    setValues({ ...values, price: newPrice.toFixed(1) });
  };
  const decrementPrice = () => {
    if (Number(values.price && Number(values.price) > 0)) {
      const newPrice = Number(values.price) - 0.1;
      setValues({ ...values, price: newPrice.toFixed(1) });
    }
  };
  const incrementQuantity = () => {
    const newQuantity = Number(values.quantity) + 1;
    setValues({ ...values, quantity: newQuantity.toFixed(0) });
  };
  const decrementQuantity = () => {
    if (Number(values.quantity && Number(values.quantity) > 1)) {
      const newQuantity = Number(values.quantity) - 1;
      setValues({ ...values, quantity: newQuantity.toFixed(0) });
    }
  };

  return (
    <Box overflowY="hidden">
      <Heading size="lg" color="#3182ce" my={5}>
        Update a product
      </Heading>
      <Card my={2}>
        <CardBody>
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
            loading={loading}
          />
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            categories={categories}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            setValues={setValues}
            setArrayOfSubs={setArrayOfSubs}
            arrayOfSubs={arrayOfSubs}
            incrementPrice={incrementPrice}
            decrementPrice={decrementPrice}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            selectedCategory={selectedCategory}
          />
        </CardBody>
      </Card>
    </Box>
  );
};

export default ProductUpdate;
