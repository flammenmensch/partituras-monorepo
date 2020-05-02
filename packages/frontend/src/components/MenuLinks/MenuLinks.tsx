import React from 'react';
import { NavLink as Link } from 'react-router-dom';

const commonProps = {
  className: 'navbar-item',
  activeClassName: 'is-active'
};

const MenuLinks = () => (
  <React.Fragment>
    <Link to="/partituras" {...commonProps}>
      Sheet music
    </Link>
    <Link to="/bandoneon" {...commonProps}>
      El Bandoneon
    </Link>
    <Link to="/books" {...commonProps}>
      Books
    </Link>
  </React.Fragment>
);

export default MenuLinks;
