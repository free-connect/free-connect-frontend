import React from 'react';
import Resource from '../../components/resource/resource.component';
import { withRouter } from 'react-router-dom';

const ProfilePage = (props) => {

    const [affiliation, setAffiliation] = React.useState(null)
    const [loaded, setLoaded] = React.useState(false)

    const loadMyResource = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            return
        }
        fetch('/my-resource', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(response => setAffiliation(response))
            .then(() => setTimeout(setLoaded(true), 1000))
            .catch(err => console.log(err))
    }

    React.useEffect(() => loadMyResource(), [])

    return(
        <div>
            {loaded && affiliation ? 
                <React.Fragment>
                    <h1>Affiliated Resource</h1>
                    <Resource admin={true} profile={true} data={affiliation}/>
               </React.Fragment> : 
               <React.Fragment>
                   <p>no data!</p>
               </React.Fragment>
            }
        </div>
    )
}

export default withRouter(ProfilePage)