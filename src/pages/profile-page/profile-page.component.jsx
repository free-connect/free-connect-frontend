import React from 'react';
import './profile-page.styles.css'
import Resource from '../../components/resource/resource.component';
import { withRouter } from 'react-router-dom';
import AddResource from '../../components/add-resource-form/add-resource.component';

const ProfilePage = (props) => {
    const [initAffiliation, setInitAffiliation] = React.useState(null)
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
            .then(response => setInitAffiliation(response))
            .then(() => setTimeout(setLoaded(true), 1000))
            .catch(err => console.log(err))
    }

    React.useEffect(() => loadMyResource(), [])

    return(
        <div className='profile'>
            {loaded && initAffiliation ? 
                <div className='section'>
                    <h1>Affiliated Resource</h1>
                    <Resource admin={true} profile={true} data={initAffiliation}/>
               </div> : 
               loaded ?
               <div className='section'>
                   <p>You haven't added a resource! Add one here...</p>
                   <AddResource register={true}/>
               </div> : 
               null
            }
        </div>
    )
}

export default withRouter(ProfilePage)