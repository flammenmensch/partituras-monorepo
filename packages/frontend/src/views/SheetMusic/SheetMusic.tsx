import React from 'react';
import RandomSheets from '../../components/RandomSheets/RandomSheets';

const SheetMusic = () => {

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">
            Search sheet music
          </h1>
          <form>
            <div className="field">
              <div className="control">
                <input type="search" className="input" placeholder="e.g. La Cumparsita"/>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <RandomSheets/>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="subtitle">Search results</h2>
        </div>
      </section>
    </>
  );
};

export default SheetMusic;
