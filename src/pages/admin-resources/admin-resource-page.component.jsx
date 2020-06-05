import React from 'react';
import './admin-resource.styles.css'
import { ResourceList } from '../../components/resources/resource-list/resource-list.component';
import AddResource from '../../components/resources/add-resource-form/add-resource.component';

export const AdminResourcePage = (props) => {
    return(
        <div className='admin'>
            <AddResource/>
            <ResourceList 
                admin={true} 
                city={props.location.state ? props.location.state.city : ''}/>
        </div>
    )
}