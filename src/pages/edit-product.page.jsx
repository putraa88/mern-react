import { useEffect, useState } from "react";
import { CREATEPRODUCT, EDITPRODUCT, GETALLCATEGORIES, GETALLTAGS, GETPRODUCT } from "../apis/product.api";
import { useLocation, useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state;

  // local state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tagIds, setTagIds] = useState([]);

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // hooks
  useEffect(() => {
    (async () => {
      setCategories(await GETALLCATEGORIES());
      setTags(await GETALLTAGS());
      const product = await GETPRODUCT(id)
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setImageUrl(product.imageUrl);
      setCategoryId(product.category._id);
    })()
  },[]);


  // local function
  const editProduct = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      description,
      stock,
      price,
      imageUrl,
      category: categoryId,
      tags: tagIds,
    };
    try {
      await EDITPRODUCT(id, payload);
      alert('product edited');
    } catch (error) {
      alert(error.message ? error.message : error);
    } finally {
      navigate('/products');
    }
  }
  return(
    <div className="container">
      <h1>Edit Product Page</h1>
      <form onSubmit={editProduct}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
          <input value={description} onChange={e => setDescription(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
          <input value={price} onChange={e => setPrice(e.target.value)} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Stock</label>
          <input value={stock} onChange={e => setStock(e.target.value)} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Image URL</label>
          <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <select className="form-select" aria-label="Default select example" onChange={e => setCategoryId(e.target.value)}>
          <option selected>{categoryId ? `${categories.find(i => i._id == categoryId).name}` : '-'}</option>
          {
            categories.map(i =>
              <option value={i._id}>{i.name}</option>
            )
          }
        </select>
        <div className="btn-group mt-3" role="group" aria-label="Basic checkbox toggle button group">
          {
            tags.map(i =>
              <>
                <input type="checkbox" className="btn-check" id={i._id} autocomplete="off" onChange={e => {
                  if(e.target.checked) {
                    setTagIds([...tagIds, i._id]);
                  } else {
                    setTagIds(tagIds.filter(x => x != i._id))
                  }
                }}/>
                <label className="btn btn-outline-primary" for={i._id}>{i.name}</label>
              </>
            )
          }
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary mt-5">Save</button>
        <button type="button" onClick={() => navigate('/products')} className="btn btn-danger mt-5">Cancel</button>
      </form>
    </div>
  )
}

export default EditProductPage;