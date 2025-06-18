import React from 'react'
import NavLinkItem from '../components/NavLinkItem'

const NavLinks = () => {
  return (
    <nav className="nav-links">
        <NavLinkItem to="/admin/projects" text="Projects" iconClass="fa-duotone fa-solid fa-briefcase"  />   
    </nav>
  )
}

export default NavLinks