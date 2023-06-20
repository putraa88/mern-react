import { useEffect, useState } from "react";
import { CREATEPRODUCT, GETALLCATEGORIES, GETALLTAGS } from "../apis/product.api";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const navigate = useNavigate();

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
    })()
  },[]);


  // local function
  const createProduct = async (e) => {
    e.preventDefault();
    if (categoryId == '') {
      alert('please choose a category');
      return;
    }
    if (!tagIds.length) {
      alert('please choose at least 1 tag');
      return;
    }
    let payload = {
      name,
      description,
      stock,
      price,
      imageUrl,
      categoryId,
      tagIds,
    };
    try {
      await CREATEPRODUCT(payload);
    } catch (error) {
      alert(error.message ? error.message : error);
    } finally {
      navigate('/products');
    }
  }
  return(
    <div className="container">
      <form onSubmit={createProduct}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Name</label>
          <input required value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Description</label>
          <input required value={description} onChange={e => setDescription(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Price</label>
          <input required value={price} onChange={e => setPrice(e.target.value)} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Stock</label>
          <input required value={stock} onChange={e => setStock(e.target.value)} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Image URL</label>
          <input required value={imageUrl} onChange={e => setImageUrl(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <select required className="form-select" aria-label="Default select example" onChange={e => setCategoryId(e.target.value)}>
          <option selected>Category</option>
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
        <button type="submit" className="btn btn-primary mt-5">Add Button</button>
      </form>
    </div>
  )
}

export default AddProductPage;