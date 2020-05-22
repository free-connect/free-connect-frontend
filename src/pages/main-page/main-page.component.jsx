import React from 'react';
import { SelectCity } from '../../components/select-city/select-city.component'
import { withRouter } from 'react-router-dom';

const MainPage = (props) => {
    const [city, setCity] = React.useState('Boulder')

    const setVal = (val) => {
        setCity(val)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.history.push({
            pathname: '/resources',
            state: {
                city: city
            }
        })
    }

    return(
        <div className='main'>
            <h1>If you need help with services, pick a location!</h1>
            <SelectCity setVal = {setVal} handleSubmit={ handleSubmit }/>
        </div>
    )
}

export default withRouter(MainPage)