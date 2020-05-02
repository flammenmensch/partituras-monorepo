import React from 'react';

const Hero = () => (
  <section className="hero is-dark">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">Partituras</h1>
        <h2 className="subtitle">
          Tango music sheet collection and supplementary materials
        </h2>
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <React.Fragment>
      <Hero/>
      <section className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-4 is-vertical is-parent">
              <div className="tile is-child notification is-warning">
                <h3 className="title">Tango music sheets</h3>
              </div>
              <div className="tile is-child notification is-danger">
                <h3 className="title">Books</h3>
              </div>
            </div>
            <div className="tile is-parent is-4">
              <div className="tile is-child notification is-info">
                <h3 className="title">Bandoneon</h3>
              </div>
            </div>
            <div className="tile is-parent is-4">
              <div className="tile is-child notification is-primary">
                <h3 className="title">Links</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
