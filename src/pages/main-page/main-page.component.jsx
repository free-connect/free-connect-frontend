import React from 'react';
import './main-page.styles.css'
import Filter from '../../components/filter/filter.component'

const MainPage = (props) => {
    return (
        <div className="main">
            <br />
            <h1>If you need help with services, pick a location!</h1>
            <Filter />
        </div>
    )
}

export default MainPage