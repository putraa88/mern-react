import { useNavigate } from "react-router-dom";

const CardComponent = ({ product, deleteProduct, admin }) => {
  const navigate = useNavigate();

  return(
    <div className="col-lg-3 d-flex align-items-stretch mt-5">
      <div className="card" style={{ width: "18rem" }}>
        <img src={product.imageUrl} className="card-img-top img-responsive" alt="..." style={{height:'250px', width:'100%'}} />
        <div className="card-body">
          <h5 className="card-title text-center">{product.name}</h5>
          <p className="card-text">Rp. {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          <p className="card-text" style={{color: 'blue', fontSize: '16px'}}>{product.category.name}</p>
          <p></p>
          <div className="row"> 
            {
              (product.tags && product.tags.length > 0) &&
              product.tags.map(i =>
                <div className="col-5" key={i._id} style={{color: 'red', fontSize: '15px'}}>{i.name.toLowerCase()}</div>  
              ) 
            }
          </div>
          {
            admin
              ?
                <>
                  <button type="button" onClick={() => navigate(`/products/edit/${product._id}`, { state: { id: product._id } })} className="btn btn-warning">edit</button>
                  <button type="button" onClick={() => deleteProduct(product._id)} className="btn btn-danger">delete</button>  
                </>
              :
                <button type="button" onClick={() => deleteProduct(product._id)} className="btn btn-danger">purchase</button>
          }
        </div>
      </div>
    </div>
  )
}

export default CardComponent;