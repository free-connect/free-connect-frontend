import React from 'react';
import AddResource from '../../components/resources/add-resource-form/add-resource.component';
import { withRouter } from 'react-router-dom';
import { Loading } from '../../components/loading-icon/loading.component';

const EditResourcePage = (props) => {
    const [authed, setAuthed] = React.useState(false)

    React.useEffect(() => {
        if (props.location.state) {
            if (props.location.state.edit) {
                setAuthed(true)
                return;
            } else {
                props.history.push('/')
            }
        } else {
            props.history.push('/')
        }
    }, [])

    return (
        <React.Fragment>
        {authed ? 
        <div>
            <AddResource {...props} />
        </div> : 
        <Loading />}
        </React.Fragment>
    )
}

export default withRouter(EditResourcePage)