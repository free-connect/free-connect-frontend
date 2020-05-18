import React from 'react';
import Resource from '../../components/resource/resource.component';
import { withRouter } from 'react-router-dom';

const ProfilePage = () => {

    const [affiliation, setAffiliation] = React.useState({})

    const loadMyResource = () => {
        fetch('/my-resource', {
            //finish this up. Also remember that this page won't load unless there's data passed in Resource, so 
            //you might get an unhandled error if you navigate to this page.
        })
    }

    React.useEffect(loadMyResource(), [])

    return(
        <div>
            <h1>Affiliated Resource</h1>
            <Resource data={affiliation}/>
        </div>
    )
}

export default withRouter(ProfilePage)