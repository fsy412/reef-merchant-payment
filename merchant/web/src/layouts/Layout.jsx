import React from 'react'
import { Link } from 'react-router'
// import { container } from 'webpack'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './layout.css'

import { BsReverseLayoutTextSidebarReverse, BsFilePpt } from 'react-icons/bs'
class Layout extends React.Component {
  render() {
    const { title, children } = this.props
    return (
      <div className=" ">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <Link to="/" className="navbar-brand barTitle">
            Reef Merchant
          </Link>
        </nav>
        <div className="content">
          <div className="leftMenu">
            <ul>
              <li>
                <Link to="/payment" className="menuItem">
                  <BsFilePpt />
                  <span className="menuItemIcon">Reef Pay</span>
                </Link>
              </li>
              <li>
                <Link to="/user/list" className="menuItem">
                  <BsReverseLayoutTextSidebarReverse />
                  <span className="menuItemIcon"> Payment History</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="right">
            <div className="rightContent mt-2">{children}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
