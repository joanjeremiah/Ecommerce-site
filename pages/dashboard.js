import {useState,useRef,useEffect} from 'react'

export default function Dashboard() {
  const [productImage,setProductImage] = useState(null);
  const [productDetails,setProductDetails] = useState({});
  const [previewImage,setPreviewImage] = useState(null);
  const [selectedFile,setSelectedFile] = useState(null);
  const [msg,setMsg] = useState('');
  const message = useRef(null);
  useEffect(() => {
    if(selectedFile == undefined){
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl)
  },[selectedFile])
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product',productImage)
    formData.append('details',JSON.stringify(productDetails))
    const response = await fetch('api/product/add',{
      method: 'POST',
      body: formData
    })
    const res = await response.json()
    console.log(response)
    console.log(res)
    if(res.msg){
      setMsg(res.msg)
      message.current.style.transform = 'translateX(0)';
      setTimeout(() => {
        message.current.style.transform = 'translateX(100%)';
      },3000)
    }
  }
  const onFileChange = async (e) => {
    console.log(1)
    setProductImage(e.target.files[0])
    if(!e.target.files || e.target.files.length == 0){
      console.log(2)
      setSelectedFile(undefined)
      return
    }
    console.log(3)
    setSelectedFile(e.target.files[0])
  }
  const onFieldInput = (e) => {
    setProductDetails({
        ...productDetails,
        [e.target.name] : e.target.value
    })
    // console.log(productDetails)
  }
  return (
    <form onSubmit={onFormSubmit} className="add-product-form">
      <p ref={message} className="message">{msg}</p>
      <input type="text" value={productDetails.name} onInput={onFieldInput} placeholder="Name" name="name" />
      <input type="text" value={productDetails.category} onInput={onFieldInput} placeholder="Category" name="category" />
      <input type="text" value={productDetails.price} onInput={onFieldInput} placeholder="Price" name="price" />
      <input type="text" value={productDetails.qty} onInput={onFieldInput} placeholder="Quantity" name="qty" />
      <textarea type="text" value={productDetails.description} onInput={onFieldInput} placeholder="Description" name="description" />
      <input type="file" className="custom-file-input" onChange={onFileChange} onClick={(e) => console.log(e)} />
      {previewImage && <img src={previewImage} alt="Preview" />}
      <input type="submit" value="Add product" />
    </form>
  )
}
