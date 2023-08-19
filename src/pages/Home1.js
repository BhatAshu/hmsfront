import React from "react";
import Layout from "../components/Layout/Layout";
import Doctor from "../images/header.png";
// import Home from "../pages/Home";

const Home = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          /* Set other styling properties like background, padding, etc. */
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "20px",
            textAlign:"center",
            /* Set other styling properties for the content area */
          }}
        >
          <div className="headerContainer">
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "bold",
                marginBottom: "40px",
                paddingRight: "60px",
              }}
            >
              Your Most Trusted
              <br />
              HEALTH PARTNER
            </h1>
            <h1
              style={{
                fontSize: "1.7rem",
                color: "light black",
                marginBottom:"30px",
                paddingRight: "110px",
              }}
            >
              The Best Match Services For You
            </h1>
            <p
             style={{
              fontSize: "1.4rem",
              color: "#666",
              // paddingRight: "40px",
            }}
          >
            Lorem, ipsum dolor sit amet consecteturadipisicing <br/>elit.
            Totam, nulla odit esse necessitatibus
             corporis<br/> voluptatem?
               </p>
               {/* <Link to="/home">
             <button>Sign In</button>
           </Link> */}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            /* Set other styling properties for the image container */
          }}
        >
          <img
            src={Doctor}
            alt="Doctor"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;