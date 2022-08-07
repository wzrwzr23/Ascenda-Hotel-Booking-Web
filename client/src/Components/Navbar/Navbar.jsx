import './Navbar.css'
import { Link } from 'react-router-dom'
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navContainer">
        <ErrorBoundary>
        {<Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">Ascenda Hotel Booking</span>
          </Link>}
        </ErrorBoundary>
        {/* <div className="navItems">
          <button className="navButtons" data-testid="navRegister">Register</button>
          <button className="navButtons">Login</button>
        </div> */}
      </div>
    </div>
  )
}

export default Navbar