import { useEffect, useState } from "react";
import CardComponent from "../components/card.component";
import { DELETEPRODUCT, GETALLCATEGORIES, GETALLPRODUCTS } from "../apis/product.api";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();

  // local state
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState([]);
  
  // query params
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);
  const [ctId, setctId] = useState(null);

  // hooks
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');
    (async () => {
      const response = await GETALLPRODUCTS({ limit, page, name: search, category: ctId });
      setCategory(await GETALLCATEGORIES());
      setProducts(response.results);
      setTotal(response.pagination.totalData);
      setTotalPages(response.pagination.totalPages);
    })()
  },[page]);

  // functions
  const deleteProduct = async (id) => {
    try {
      if (window.confirm('Delete this product ?')) {
        await DELETEPRODUCT(id);
        alert('product deleted');
        setPage(1);
      }
    } catch (error) {
      alert(error);
    }
  }

  const handleSearch = async() => {
    const response = await GETALLPRODUCTS({ limit, page, name: search, category: ctId });
    setProducts(response.results);
    setTotal(response.pagination.totalData);
    setTotalPages(response.pagination.totalPages);
    setPage(1);
  }

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/');
  }

  return(
    <div className="container">
      <div className="text-end" style={{margin: '10px'}}>
        <button onClick={handleLogOut} className="btn btn-danger">Logout</button>
      </div>
      <h1 className="text-center">Products Page</h1>
      <div className="container">
        <button className="btn btn-warning mb-2" onClick={() => navigate('/products/add')}>add new product</button>
        <div className="input-group mb-2">
          <input value={search} onChange={e => setSearch(e.target.value)} type="text" className="form-control" placeholder="search product" aria-label="Recipient's username" aria-describedby="button-addon2" />
        </div>
        <div>
        <select className="form-select" aria-label="Default select example" onChange={e => setctId(e.target.value)}>
          <option selected>-</option>
          {
            category.map(i =>
              <option value={i._id}>{i.name.toLowerCase()}</option>
            )
          }
        </select>
        <button onClick={handleSearch} className="btn btn-outline-secondary mt-2" type="button" id="button-addon2">search</button>
        </div>
      </div>
      <div className="row">
        {
          (products && products.length > 0) ? 
            products.map((i, index) =>
              <CardComponent key={index} product={i} deleteProduct={deleteProduct} admin={localStorage.getItem('admin') == 'true'}/>
          ) : 
            <h6 className="text-center">No products found</h6>
        }
      </div>
      <div className="text-center" style={{marginTop: '0.5rem'}}>
        <button disabled={page > 1 ? false : true} onClick={() => setPage(page - 1)}>prev</button>
        <button disabled={(page >= 1) && (page < totalPages) ? false : true} onClick={() => setPage(page + 1)}>next</button>
      </div>
      <div className="text-center" style={{marginTop: '0.5rem', border:'red'}}>
        <span>{(page * limit) >= total ? total : page * limit} / {total}</span>
        <h6 className="text-center" style={{marginTop:'0.5rem'}}>page: {page} / {totalPages}</h6>
      </div>
    </div>
  )
};

export default ProductPage;