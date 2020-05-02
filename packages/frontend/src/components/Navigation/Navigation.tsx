import React from 'react';
import Logo from '../Logo/Logo';
import BurgerIcon from '../BurgerIcon/BurgerIcon';
import MenuLinks from '../MenuLinks/MenuLinks';
import ProfileLinks from '../ProfileLinks/ProfileLinks';

const Navigation = () => (
  <div className="container">
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Logo/>
        <BurgerIcon/>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <MenuLinks/>
        </div>
        <div className="navbar-end">
          <ProfileLinks/>
        </div>
      </div>
    </nav>
  </div>
);

export default Navigation;
