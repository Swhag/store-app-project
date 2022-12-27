import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { trendingOne, trendingTwo } from '../store/data';
import { addItem } from '../store/cartSlice';
import { setItems } from '../store/itemSlice';
import { updateCartCount } from '../store/cartSlice';
import '../styles/App.css';

import TopNavbar from './Navbar';
import Hero from './Hero';
import Categories from './Categories';
import Services from './Services';
import Footer from './Footer';

import ShopPage from '../pages/Shop';
import DetailsPage from '../pages/Detail';
import Cart from '../pages/Cart';

function App() {
  let [trending, setTrending] = useState(trendingOne);
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchShoes = async () => {
      const res = await axios.get('https://Swhag.github.io/shoesData1.json');
      let itemsDataCopy = [...res.data];

      dispatch(setItems(itemsDataCopy));
    };
    fetchShoes();
  }, []);

  useEffect(() => {
    dispatch(updateCartCount());
  }, []);

  return (
    <div className='App'>
      <TopNavbar></TopNavbar>
      <div className='container'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Hero></Hero>
                <Categories></Categories>
                <Products items={trending}></Products>
                <div className='button-container'>
                  <ul className='pagination justify-content-center justify-content-lg-end'>
                    <li className='page-item mx-1'>
                      <a
                        className='page-link'
                        href='#!'
                        onClick={() => {
                          setTrending(trendingOne);
                        }}
                      >
                        <span>«</span>
                      </a>
                    </li>

                    <li className='page-item ms-1'>
                      <a
                        className='page-link'
                        href='#!'
                        onClick={() => {
                          setTrending(trendingTwo);
                        }}
                      >
                        <span>»</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <Services></Services>
              </>
            }
          />
          ---------------------------------------------------
          <Route path='/shop' element={<ShopPage></ShopPage>}></Route>
          ---------------------------------------------------
          <Route
            path='/detail/:id'
            element={<DetailsPage></DetailsPage>}
          ></Route>
          ---------------------------------------------------
          <Route
            path='/cart'
            element={
              <>
                <Cart></Cart>
              </>
            }
          ></Route>
          ---------------------------------------------------
          <Route
            path='*'
            element={
              <>
                Error 404: Unable to reach this page - still working on it bruh
              </>
            }
          />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

function Products(props) {
  let items = props.items;

  return (
    <section className='pt-5 product-container'>
      <header className='text-center'>
        <p className='small text-muted small text-uppercase mb-1'>
          The Style Room
        </p>
        <h2 className='h5 text-uppercase mb-4'>TOP TRENDING PRODUCTS </h2>
      </header>
      <div className='container'>
        <div className='row'>
          {items.map((item, i) => {
            return <ProductCard key={i} id={item.id} item={item}></ProductCard>;
          })}
        </div>
      </div>
    </section>
  );
}

function ProductCard(props) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let item = props.item;

  return (
    <div className='col-lg-3 col-sm-6'>
      <div className='el-wrapper home-el-wrapper'>
        <div className='box-up'>
          <img
            className='img product-image'
            src={item.imageURL}
            alt='#'
            width='80%'
            onClick={() => {
              navigate(`/detail/` + item.id);
            }}
          />
          <div className='img-info'>
            <div className='info-inner'>
              <span className='p-name'>{item.name}</span>
              <span className='p-company'>{item.brand}</span>
            </div>
            <div className='a-size'>
              Available sizes :<span className='size'>8.5 / 9 / 10 / 11</span>
            </div>
          </div>
        </div>

        <div className='box-down'>
          <div className='h-bg'>
            <div className='h-bg-inner'></div>
          </div>

          <a
            className='cart'
            href='#!'
            onClick={() => {
              dispatch(addItem(item));
              dispatch(updateCartCount());
            }}
          >
            <span className='price'>${item.price}</span>
            <span className='add-to-cart'>
              <span className='txt'>Add in cart</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
