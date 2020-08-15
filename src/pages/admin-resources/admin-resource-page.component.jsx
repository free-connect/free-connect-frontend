import React from 'react';
import { Loading } from '../../components/loading-icon/loading.component';
import { ResourceList } from '../../components/resources/resource-list/resource-list.component';
import NewEditResource from '../../components/resources/new-edit-resource/new-edit-resource.component';

export const AdminResourcePage = (props) => {
    const [loading, setLoading] = React.useState(false);
    
    React.useEffect(() => window.scrollTo(0, 0))

    return (
        <div>
            {loading ?
            <React.Fragment>
                <Loading />
                </React.Fragment> :
                <React.Fragment>
                    <NewEditResource handleLoading={setLoading}/>
                    <ResourceList
                        admin={true}
                        city={props.location.state ? props.location.state.city : ''} />
                </React.Fragment>
            }
        </div>
    )
}