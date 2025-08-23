import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import Overview from "../../components/overview/Overview";
import Property from "../../components/propertyList/Property";
import FeaturedProperties from "../../components/featuredProperty/FeaturedProperties";
import AboutCompany from "../../components/aboutCompany/aboutCompany";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";


const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <div className="homeTitle">
          <h1>Explore India</h1>
          <p>These popular destinations have a lot to offer</p>
        </div>
        <Featured />
        <div className="homeBrowseProperty">
          <h1>Browse by property type</h1>
          <Property />
        </div>
        <div>
          <div className="homeHeading">
            <h1>Travelers interested in India also visited</h1>
          </div>
          <Overview />
        </div>
        <div className="featuredProperty">
          <h1>Homes guests love</h1>
        </div>
        <FeaturedProperties />
        <AboutCompany />
       <MailList/>
       <div className="footerTitle">
        <h1>Popular with travelers from India</h1>
       <Footer/>
       </div>

      </div>
    </div>
  );
};

export default Home;
