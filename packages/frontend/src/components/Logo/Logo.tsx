import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/" className="navbar-item">
    <strong>Partituras</strong>
    <sup>&nbsp;&alpha;lpha</sup>
  </Link>
);

export default Logo;
