import React from 'react';
import './resource-page.styles.css'
import Filter from '../components/filter/filter.component'
import { ResourceList } from '../components/resource-list/resource-list.component';

export const ResourcesPage = (props) => {
    const cityProp = props.location.state ? props.location.state.city : '';
    const resources = props.location.state ? props.location.state.resources : '';

    return(
        <div className='resource-page'>
            <br />
            <br />
            <br />
            <Filter />
            <ResourceList city={cityProp} services={resources}/>
        </div>
    )
}