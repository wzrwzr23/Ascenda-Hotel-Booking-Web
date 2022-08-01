import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import DestinationSearch from '../DestinationSearch/DestinationSearch';
import ImageSlide from './ImageSlide'

const Homepage = () => {

  return (
    <>
    <div id='homewrap'>
      <Navbar/>
      <Header/>
      <ImageSlide/>
        <DestinationSearch/>
      {/* <p>Something</p>
      <br />
      <p>Display some picture</p>
      <h1>Display1</h1>
      <h1>Display2</h1>
      <h1>Display3</h1> */}
      <Footer/>
    </div>
    </>
  );
}

export default Homepage
