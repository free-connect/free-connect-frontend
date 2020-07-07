import React from 'react';
import './resource-page.styles.css'
import Filter from '../../components/filter/filter.component';
import { Loading } from '../../components/loading-icon/loading.component'
import { ResourceList } from '../../components/resources/resource-list/resource-list.component';

export const ResourcePage = (props) => {
    const [pageLoaded, setPageLoaded] = React.useState(false)

    const cityProp = props.location.state ? props.location.state.city : '';
    const resources = props.location.state ? props.location.state.resources : '';

    return (
        <React.Fragment>
            <div className={pageLoaded ? 'loading-page' : 'resource-page'}>
                <br />
                <br />
                <br />
                {pageLoaded ? null : <Loading />}
                <div hidden={pageLoaded ? false : true}>
                    <Filter />
                    <ResourceList
                        handleLoad={setPageLoaded}
                        city={cityProp}
                        services={resources} />
                </div>
            </div>
        </React.Fragment>
    )
}