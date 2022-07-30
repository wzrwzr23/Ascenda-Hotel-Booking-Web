import './Booking.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';

const Booking = () => {
  
  return (
    <>
    <Navbar/>
    <Header type="list"/>
    <div className="booking">
      <div className="bookingUserDetails">
        <h1 className="detailsTitle">BOOKING</h1>
        <h2 className="detailsSubTitle">User Details</h2>
        <form className='user'>
            <br/>
            <br/>
            <div className="userName">
              <select name="salutation" className="salutation">
                  <option value="select">Select an option</option>
                  <option value="mr">Mr</option>
                  <option value="mrs">Mrs</option>
                  <option value="miss">Miss</option>
              </select>
              <div className="firstName">
                First Name<span class="require">*</span>
                <input className='inputBox' type="text" required/>
              </div>
              <div className="lastName">
                Last Name<span class="require">*</span>
                <input className='inputBox' type="text" required/>
              </div>
            </div>
            <div className="phoneNumber">
              Phone Number<span class="require">*</span>
              <input className='inputBox' type="tel" required/>
            </div>
            <div className="emailAddress">
              Email Address<span class="require">*</span>
              <input className='inputBox' type="email" required/>
            </div>
            <div className="specials">
              Special Requests:
              <div className="textBox">
                <textarea classname="Text1" cols="40" rows="5"></textarea>
              </div>
            </div>
            <div className="billingAddress">
              Billing Address<span class="require">*</span>
              <div className="textBox">
                <textarea classname="Text1" cols="40" rows="5"></textarea>
              </div>
            </div>
            {/*<input className='submitBtn' type="submit"/>*/}
            <a href={`/booking/`}></a>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Booking