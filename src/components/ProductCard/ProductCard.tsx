import React from 'react';
import './ProductCard.css';
import Button from '../Button/Button';
import { IProduct } from '../../types/prodact';

type Props = {
  product: IProduct;
  className?: string;
  onAdd: (product: IProduct) => void;
};

const ProductCard: React.FC<Props> = ({ product, className, onAdd }) => {
  const onAddHandler = () => {
    onAdd(product);
  };

  return (
    <div className={'product' + className}>
      <div className="img" />
      <div className="title">{product.title}</div>
      <div className="description">{product.description}</div>
      <div className="price">{product.price}$</div>
      <Button classnames="add-btn" onClick={onAddHandler}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
