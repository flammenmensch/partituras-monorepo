import React from 'react';
import { NavLink as Link } from 'react-router-dom';

const ProfileLinks = () => (
  <React.Fragment>
    <Link to="/sign-in" className="navbar-item" activeClassName="is-active">
      Sign In
    </Link>
    <Link to="/sign-up" className="navbar-item" activeClassName="is-active">
      Join
    </Link>
  </React.Fragment>
);

export default ProfileLinks;
