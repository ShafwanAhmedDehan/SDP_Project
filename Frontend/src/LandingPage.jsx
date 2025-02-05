import React, {useRef} from "react";
import Navbar from "./Components/Navbar.jsx"
import Footer from "./Components/Footer.jsx"
import styles from "./LandingPage.module.css"
// import Button from "./Components/Button.jsx"
import JoinCommunity from "./components/JoinCommunity";
import Community from "./components/Community";
import KnowAboutCrafts from "./components/KnowAboutCrafts";
import NewArrival from "./components/NewArrival";
import Category from "./components/Category";
import GoToProduct from "./components/GoToProduct";

const LandingPageFinal = () => {

  // const communityRef = useRef(null);

  // // Function to scroll to the Community component
  // const scrollToCommunity = () => {
  //   if (communityRef.current) {
  //     communityRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };


    return (
      <div className={styles.landingPageFinal}>
        
        <Navbar />
        <div className={styles.productsHeading}>
          <div className={styles.productsHeadingChild} />
          <b className={styles.enjoyOurFeatured}>Enjoy Our Featured Products</b>
        </div>
        
        <GoToProduct />
        <Category />
        <NewArrival />
        <KnowAboutCrafts />
        <Community />
        <JoinCommunity />
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    );
  };
  
  export default LandingPageFinal;