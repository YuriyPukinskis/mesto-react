import logo from '../images/logo.png';
import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
    </header>
  );
}

