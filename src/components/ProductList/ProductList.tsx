import React, { useCallback, useEffect, useState } from 'react';
import './ProductList.css';
import ProductCard from '../ProductCard/ProductCard';
import { IProduct } from '../../types/prodact';
import { useTelegram } from '../../hooks/useTelegram';

console.log(import.meta.env.VITE_API_URL);

const products = [
  {
    id: '1',
    title: 'Iphone 12',
    price: 1000,
    description: 'Blue, 128gb',
  },
  {
    id: '2',
    title: 'iPhone 11',
    price: 1115,
    description: 'Red, 256gb',
  },
  {
    id: '3',
    title: 'iPhone 11',
    price: 1680,
    description: 'Green , 256gb',
  },
  {
    id: '4',
    title: 'iPhone 11',
    price: 122,
    description: 'Gold, 256gb',
  },
  {
    id: '5',
    title: 'iPad Mini 6',
    price: 607,
    description: 'Pink, 64gb',
  },
  {
    id: '6',
    title: 'iPhone 7',
    price: 375,
    description: 'Pink, 64gb',
  },
  {
    id: '7',
    title: 'iPhone XS',
    price: 900,
    description: 'Gold, 256gb',
  },
  {
    id: '8',
    title: 'Apple iPhone XS',
    price: 880,
    description: 'Silver, 256gb',
  },
];

const getTotalPrice = (cart: IProduct[]) => {
  return cart.reduce((acc, { price }) => acc + price, 0);
};

const ProductList: React.FC = () => {
  const [cart, setCart] = useState<IProduct[]>([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: cart,
      totalPrice: getTotalPrice(cart),
      queryId,
    };

    // Vite
    fetch(`${import.meta.env.VITE_API_URL}/web-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);

    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]); // eslint-disable-line

  const onAdd = (product: IProduct) => {
    const alreadyAdded = cart.find(({ id }) => id === product.id);
    let newItems: IProduct[] = [];

    if (alreadyAdded) {
      newItems = cart.filter(({ id }) => id !== product.id);
    } else {
      newItems = [...cart, product];
    }

    setCart(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Total to checkout: ${getTotalPrice(newItems)}$`,
      });
    }
  };

  return (
    <div className="list">
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
            className="item"
            onAdd={onAdd}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
