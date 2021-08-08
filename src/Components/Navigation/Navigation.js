import { NavLink } from "react-router-dom";
import './Navigation.css';
 const Navigation = () => (
    <nav className='Navigation'>
        <NavLink exact to='/' className='navLink' activeClassName='navLinkActive'>Главная</NavLink>
        <NavLink to='/movies' className='navLink' activeClassName='navLinkActive'>Фильмы</NavLink>
    </nav>
);

export default Navigation;