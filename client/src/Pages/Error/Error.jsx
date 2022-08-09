import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import './Error.css'

const Error = () => {
  return (
    <div className='errorFullPage'>
        <Navbar/>
        <Header type='list'/>
        <div className="errorPage">
            <div className="error404">404</div>
            <div className="errorLine">Error</div>
            <div className="errorMsg">The input you have entered is not valid. Please go back to the homepage and try again.</div>
        </div>
        <Footer/>
    </div>
  )
}

export default Error