import logo from '../images/logo.png';
import React from 'react';

export default function Header() {
  return (
    <header class="header">
      <img class="header__logo" src={logo} alt="Логотип" />
    </header>
  );
}

