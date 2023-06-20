import AddProductPage from "../pages/add-product.page";
import EditProductPage from "../pages/edit-product.page";
import HomePage from "../pages/home.page";
import ProductPage from "../pages/product.page";

export const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/products',
    element: <ProductPage />,
  },
  {
    path: '/products/add',
    element: <AddProductPage />,
  },
  {
    path: '/products/edit/:id',
    element: <EditProductPage />
  }
]