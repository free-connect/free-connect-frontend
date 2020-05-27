import React from 'react'
import { ResourceList } from '../components/resource-list/resource-list.component';
import AddResource from '../components/add-resource-form/add-resource.component';

export const AdminResourcePage = (props) => {
    return(
        <React.Fragment>
            <AddResource/>
            <ResourceList 
                admin={true} 
                city={props.location.state ? props.location.state.city : ''}/>
        </React.Fragment>
    )
}