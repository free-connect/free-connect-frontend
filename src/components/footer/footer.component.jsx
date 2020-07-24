import React from 'react';
import { Link } from 'react-router-dom';
import './footer.styles.css'

export const Footer = () => {

    return (
        <footer className='footer-box'>
            <div className='footer-box__left'>
                <Link to={'/about'}>
                    <p>About</p>
                </Link>
                {/* <Link to={'/Donate'}>
                    <p>Donate</p>
                </Link>
                <Link to={'/Volunteer'}>
                    <p>Volunteer</p>
                </Link> */}
                <a href='http://www.nth-iter.com'><p>Powered By Nth Iter</p></a>
            </div>
            <div className='footer-box__right'>

            </div>
        </footer>
    )
}