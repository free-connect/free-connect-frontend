import React from 'react';
import { ResourceList } from '../components/resource-list/resource-list.component';
import { SelectCity } from '../components/select-city/select-city.component';

export const ResourcesPage = (props) => {
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
        window.location.reload(false);
    }

    return(
        <React.Fragment>
            <SelectCity setVal={ setVal } handleSubmit={handleSubmit}/>
            <ResourceList city={props.location.state ? props.location.state.city : ''}/>
        </React.Fragment>
    )
}