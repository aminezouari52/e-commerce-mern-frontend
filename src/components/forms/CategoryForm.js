import { Flex, Input, Button, FormLabel } from '@chakra-ui/react'

const CategoryForm = ({ handleSubmit, name, setName, loading, label }) => {
  return (
    <Flex
      as="form"
      direction="column"
      w="100%"
      maxW="350px"
      minWidth="250px"
      onSubmit={handleSubmit}
    >
      <FormLabel color="gray">{label}</FormLabel>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        mb={2}
      />

      <Button
        type="submit"
        w="30%"
        isDisabled={!name}
        isLoading={loading}
        variant="outline"
        colorScheme="blue"
        my={2}
      >
        Save
      </Button>
    </Flex>
  )
}

export default CategoryForm
