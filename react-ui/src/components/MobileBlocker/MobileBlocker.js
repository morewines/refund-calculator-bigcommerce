import React from 'react';

//CSS
import './MobileBlocker.css';

//Modules
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const MobileBlocker = () => (
  <div className="wrapper">
    <header>
      <Nav />
    </header>
    <main className="main-wrapper">
      <div className="container mobile-blocker-center">
        <p>
          BigCommerce Partial Refund Calculator is not
          compatible with mobile or tablet devices due to
          requiring wide info tables.
        </p>
        <p>
          Please visit this web app on a desktop or laptop
          browser.
        </p>
        <p>
          If you feel there is an error, please contact andrew@morewines.com.
        </p>
      </div>
    </main>
    <Footer />
  </div>
)

export default MobileBlocker;
