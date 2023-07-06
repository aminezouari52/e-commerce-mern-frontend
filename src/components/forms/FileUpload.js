import { useSelector } from 'react-redux'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'

// STYLE
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Spinner,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'

const FileUpload = ({ values, setValues, setLoading, loading }) => {
  const user = useSelector((state) => state.user.loggedInUser)

  const fileUploadAndResize = (e) => {
    let files = e.target.files // 3
    let allUploadedFiles = values.images

    console.log(e.target.files)
    // resize
    if (files) {
      setLoading(true)
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          async (uri) => {
            console.log(uri)
            try {
              const res = await axios.post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                { headers: { authtoken: user ? user.token : '' } }
              )
              console.log('IMAGE UPLOAD RES DATA', res)
              setLoading(false)
              allUploadedFiles.push(res.data)

              setValues({ ...values, images: allUploadedFiles })
            } catch (err) {
              setLoading(false)
              console.log('CLOUDINARY UPLOAD ERR', err)
            }
          },
          'base64'
        )
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  }

  const handleImageRemove = async (public_id) => {
    setLoading(true)
    // console.log("remove image", public_id);
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      )

      setLoading(false)
      const { images } = values
      let filteredImages = images.filter((item) => {
        return item.public_id !== public_id
      })
      setValues({ ...values, images: filteredImages })
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <>
      <Flex my={2}>
        {values.images &&
          values.images.map((image) => (
            <Box key={image.public_id} position="relative" mr={2}>
              <Avatar src={image.url} borderRadius="0px" size="xl" />
              <SmallCloseIcon
                position="absolute"
                top={-1}
                right={-1}
                boxSize={5}
                bg="red"
                color="white"
                borderRadius="50%"
                cursor="pointer"
                onClick={() => handleImageRemove(image.public_id)}
              />
            </Box>
          ))}
      </Flex>

      <FormControl>
        {loading ? (
          <Spinner color="blue" />
        ) : (
          <FormLabel
            w="120px"
            bg="gray.200"
            color="blue"
            fontWeight="bold"
            cursor="pointer"
            borderRadius="4px"
            _hover={{ opacity: '0.7' }}
            py={2}
            px={4}
          >
            Choose File
            <Input
              type="file"
              multiple
              accept="images/*"
              onChange={fileUploadAndResize}
              display="none"
            />
          </FormLabel>
        )}
      </FormControl>
    </>
  )
}

export default FileUpload