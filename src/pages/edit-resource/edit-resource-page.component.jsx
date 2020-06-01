import React from 'react';
import AddResource from '../../components/add-resource-form/add-resource.component';
import { withRouter } from 'react-router-dom';
import './edit-resource-page.styles.css';

const EditResourcePage = (props) => {
    return(
        <div className='edit-resource'>
            <AddResource {...props} />
        </div>
    )
}

export default withRouter(EditResourcePage)