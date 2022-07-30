import './Payment.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';


const Payment = () => {
    return (
        
<>
<Navbar/>
<Header type="list"/>



      <div className="row">
        <div className="col-75">
          <div className="container">
            <form action="/action_page.php">
              <div className="row">
                
                <div className="col-50">
                  <h3>Payment</h3>
                  <label htmlFor="fname">Accepted Cards</label>
                  <div className="icon-container">
                    <i className="fa fa-cc-visa" style={{color: 'navy'}} />
                    <i className="fa fa-cc-amex" style={{color: 'blue'}} />
                    <i className="fa fa-cc-mastercard" style={{color: 'red'}} />
                    <i className="fa fa-cc-discover" style={{color: 'orange'}} />
                  </div>

                  <label htmlFor="cname">Name on Card</label>
                  <input type="text" id="cname" name="cardname" placeholder="John More Doe"  required/>
                  <label htmlFor="ccnum">Credit card number</label>
                  <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" required />
                  <label htmlFor="expmonth">Exp Month</label>
                  <input type="text" id="expmonth" name="expmonth" placeholder="September" required />
                  <div className="row">
                    <div className="col-50">
                      <label htmlFor="expyear">Exp Year</label>
                      <input type="text" id="expyear" name="expyear" placeholder={2018} required /> 
                    </div>
                    <div className="col-50">
                      <label htmlFor="cvv">CVV</label>
                      <input type="text" id="cvv" name="cvv" placeholder={352} required/>
                    </div>
                  </div>
                </div>
              </div>
              
              <input type="submit" defaultValue="Continue to checkout" className="btn" />
            </form>
          </div>
        </div>
        <div className="col-25">
          <div className="container">
            
            <p>Total <span className="price" style={{color: 'black'}}><b>$30</b></span></p>
          </div>
        </div>
      </div>
  

<Footer/>
</>





    );
    }


export default Payment 