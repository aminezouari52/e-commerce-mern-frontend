import { Flex, Input, Button, FormLabel } from "@chakra-ui/react";

const CategoryForm = ({ handleSubmit, name, setName, loading, label }) => {
  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit}>
      <FormLabel>{label}</FormLabel>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        mb={2}
      />
      <Flex justifyContent="flex-end">
        <Button
          type="submit"
          isDisabled={!name}
          isLoading={loading}
          colorScheme="blue"
          my={2}
          size="sm"
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default CategoryForm;
