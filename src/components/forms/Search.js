import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchText } from "../../reducers/searchReducer";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  IconButton,
  InputRightAddon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.searchText);
  const { text } = search;
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch(
      setSearchText({
        text: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup borderRadius={5} size="xs">
        <Input
          type="text"
          placeholder="Search..."
          border="1px solid #949494"
          onChange={handleChange}
          value={text}
          size="xs"
        />

        <InputRightAddon p={0} border="none">
          <IconButton
            type="submit"
            size="xs"
            borderLeftRadius={0}
            borderRightRadius={3.3}
            border="1px solid #949494"
            icon={
              <Search2Icon
                color="gray.600"
                style={{ height: "10px", width: "10px" }}
              />
            }
          />
        </InputRightAddon>
      </InputGroup>
    </form>
  );
};

export default Search;
