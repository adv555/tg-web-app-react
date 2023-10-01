import React from 'react';
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';
import './Header.css';

const Header: React.FC = () => {
  const { onClose, user } = useTelegram();

  return (
    <div className="header">
      <Button onClick={onClose}>X</Button>
      <span className="username">{user?.username}</span>
    </div>
  );
};

export default Header;
