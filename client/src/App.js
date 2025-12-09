import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import UserRoute from './components/Routes/UserRoute';
import UserDashboard from './pages/User/UserDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/User/Profile';
import Orders from './pages/User/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import CartPage from './pages/CartPage';
import PaymentGateway from './pages/PaymentGateway';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/dashboard' element={<UserRoute/>}>
          <Route path='user' element={<UserDashboard/>}/>
          <Route path='user/profile' element={<Profile/>}/>
          <Route path='user/orders' element={<Orders/>}/>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard/>}/>
          <Route path='admin/createCategory' element={<CreateCategory/>}/>
          <Route path='admin/createProduct' element={<CreateProduct/>}/>
          <Route path='admin/products/:slug' element={<UpdateProduct/>}/>
          <Route path='admin/products' element={<Products/>}/>
          <Route path='admin/users' element={<Users/>}/>
        </Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/policy' element={<Policy />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/product/:slug' element={<ProductDetails />}/>
        <Route path='/category/:slug' element={<CategoryProducts />}/>
        <Route path='/categories' element={<Categories />}/>
        <Route path='/cart' element={<CartPage />}/>
        <Route path='/payment' element={<PaymentGateway />}/>
        <Route path='*' element={<Pagenotfound />}/>
      </Routes>
    </>
  );
}

export default App;
