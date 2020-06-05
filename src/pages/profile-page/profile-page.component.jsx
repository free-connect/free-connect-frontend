import React from 'react';
import './profile-page.styles.css'
import Resource from '../../components/resources/resource/resource.component';
import { withRouter } from 'react-router-dom';
import AddResource from '../../components/resources/add-resource-form/add-resource.component';

const ProfilePage = (props) => {
    const [initAffiliation, setInitAffiliation] = React.useState(null)
    const [loaded, setLoaded] = React.useState(false)

    const loadMyResource = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return
        }
        fetch('/my-resource', {
            headers: {
                method: 'GET',
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(response => setInitAffiliation(response))
            .then(() => setTimeout(setLoaded(true), 1000))
            .catch(err => console.log(err))
    }

    React.useEffect(() => loadMyResource(), [])

    return(
        <div className='profile'>
            {loaded && initAffiliation ? 
                <React.Fragment>
                    <h1>Welcome back {localStorage.getItem('name')}!</h1>
                    <br />
                    <h2>Affiliated Resource</h2>
                    <div className='section'>
                        <Resource admin={true} profile={true} data={initAffiliation}/>
                    </div>
               </React.Fragment> :
               loaded ?
               <React.Fragment>
                    <h1>Welcome back {localStorage.getItem('name')}!</h1>
                    <br />
                    <p>You haven't added a resource! Add one here...</p>
                    <div className='section'>
                        <AddResource register={true}/>
                    </div>
                </React.Fragment> : 
               null
            }
        </div>
    )
}

export default withRouter(ProfilePage)