import React from 'react';
import Layout from "../components/Layout/Layout";
import Doctor from "../images/header.png";
import './Home.css'; 

function Home1() {
  return (
    <Layout>
    <div className="homec">
      <div className="paragraphs">
        <p className='pa1'>Your Most Trusted</p>
        <p className='pa2'>HEALTH PARTNER</p>
        <p className='pa3'> Experience unmatched support and guidance on your health journey.
              Our dedicated team is here to provide you with personalized
              solutions tailored to your needs. Whether it's wellness advice,
              medical consultations, or specialized treatments, we're committed
              to your well-being. Embrace a healthier life with us.</p>
      </div>
      <div className="image">
        <img  src={Doctor}
            alt="Doctor" />
      </div>
    </div>
    </Layout>
  );
}

export default Home1;
