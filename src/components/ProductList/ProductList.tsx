import React, { useCallback, useEffect, useState } from 'react';
import './ProductList.css';
import ProductCard from '../ProductCard/ProductCard';
import { IProduct } from '../../types/prodact';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
  {
    id: 1,
    title: 'Product 1',
    price: 100,
    description: 'Description 1',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 200,
    description: 'Description 2',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    title: 'Product 3',
    price: 200,
    description: 'Description 3',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 4,
    title: 'Product 4',
    price: 100,
    description: 'Description 4',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 5,
    title: 'Product 5',
    price: 200,
    description: 'Description 5',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 6,
    title: 'Product 6',
    price: 200,
    description: 'Description 6',
    image: 'https://picsum.photos/200/300',
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
