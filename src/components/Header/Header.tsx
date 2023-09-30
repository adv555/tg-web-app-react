import React from 'react';
import './Header.css';
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';

const Header: React.FC = () => {
  const { onClose, user } = useTelegram();

  return (
    <div className="header">
      <Button onClick={onClose}>Close</Button>
      <span className="username">{user?.username}</span>
    </div>
  );
};

export default Header;
