import { Flex, Input, Button, FormLabel } from "@chakra-ui/react"

const CategoryForm = ({ handleSubmit, name, setName, loading, label }) => {
  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit}>
      <FormLabel>{label}</FormLabel>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        w="30%"
        mb={2}
      />

      <Button
        type="submit"
        width="60px"
        height="40px"
        isDisabled={!name}
        isLoading={loading}
        colorScheme="blue"
        my={2}
      >
        Save
      </Button>
    </Flex>
  )
}

export default CategoryForm
