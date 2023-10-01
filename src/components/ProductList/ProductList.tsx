import React, { useCallback, useEffect, useState } from 'react';
import './ProductList.css';
import ProductCard from '../ProductCard/ProductCard';
import { IProduct } from '../../types/prodact';
import { useTelegram } from '../../hooks/useTelegram';

console.log(import.meta.env.VITE_API_URL);

const products = [
  {
    id: '1',
    title: 'Джинсы',
    price: 5000,
    description: 'Синего цвета, прямые',
  },
  {
    id: '2',
    title: 'Куртка',
    price: 12000,
    description: 'Зеленого цвета, теплая',
  },
  {
    id: '3',
    title: 'Джинсы 2',
    price: 5000,
    description: 'Синего цвета, прямые',
  },
  {
    id: '4',
    title: 'Куртка 8',
    price: 122,
    description: 'Зеленого цвета, теплая',
  },
  {
    id: '5',
    title: 'Джинсы 3',
    price: 5000,
    description: 'Синего цвета, прямые',
  },
  {
    id: '6',
    title: 'Куртка 7',
    price: 600,
    description: 'Зеленого цвета, теплая',
  },
  {
    id: '7',
    title: 'Джинсы 4',
    price: 5500,
    description: 'Синего цвета, прямые',
  },
  {
    id: '8',
    title: 'Куртка 5',
    price: 12000,
    description: 'Зеленого цвета, теплая',
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
