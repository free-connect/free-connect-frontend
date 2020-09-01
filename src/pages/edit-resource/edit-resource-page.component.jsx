import React from 'react';
import NewEditResource from '../../components/resources/new-edit-resource/new-edit-resource.component';
import { withRouter } from 'react-router-dom';
import { Loading } from '../../components/loading-icon/loading.component';
import { ErrorPage } from '../error-page/error-page.component';

const EditResourcePage = (props) => {
    const [authed, setAuthed] = React.useState(false)
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (props.location.state) {
            if (props.location.state.edit) {
                setAuthed(true)
                return;
            }
        }
        props.history.push('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            {loading && authed ?
                <React.Fragment>
                    <Loading />
                </React.Fragment> :
                !loading && authed ?
                    <React.Fragment>
                        <NewEditResource handleLoading={setLoading} {...props} />
                    </React.Fragment> :
                    <ErrorPage />
            }
        </React.Fragment>
    )
}

export default withRouter(EditResourcePage)