import React from 'react';
import AddResource from '../../components/resources/add-resource-form/add-resource.component';
import { withRouter } from 'react-router-dom';

const EditResourcePage = (props) => {
    return (
        <div className='edit-resource'>
            <AddResource {...props} />
        </div>
    )
}

export default withRouter(EditResourcePage)