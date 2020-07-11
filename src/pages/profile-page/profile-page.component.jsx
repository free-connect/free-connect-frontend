import React from 'react';
import './profile-page.styles.css'
import Resource from '../../components/resources/resource/resource.component';
import { Loading } from '../../components/loading-icon/loading.component'
import { withRouter } from 'react-router-dom';
import AddResource from '../../components/resources/add-resource-form/add-resource.component';

const ProfilePage = (props) => {
    const [initAffiliation, setInitAffiliation] = React.useState(null)
    const [loaded, setLoaded] = React.useState(false);
    const [pageLoaded, setPageLoaded] = React.useState(false);
    const [likes, setLikes] = React.useState([])

    const loadMyResources = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        fetch(process.env.REACT_APP_LOCATION+'/my-resource', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(response => setInitAffiliation(response))
            .then(() => {
                return fetch(process.env.REACT_APP_LOCATION+'/my-likes', {
                        method: 'GET',
                        headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                    .then(res => res.json())
                    .then(response => {
                        if (response.message) {
                            //this section is meant to log someone out if someone has messed with the JWT
                            props.logout();
                        }
                        setLikes([...response.likes]);
                    })
                    .then(() => true)
                    .catch(err => console.log(err))
            })
            .then(() => {
                setLoaded(true);
                setPageLoaded(true)
            })
            .catch(err => console.log(err))
    }

    React.useEffect(() => loadMyResources(), [])

    return (
        <React.Fragment>
            {pageLoaded ? null : <Loading />}
            <React.Fragment hidden={pageLoaded ? false : true}>
                <div className='profile' >
                    <h1>Welcome back {localStorage.getItem('name')}!</h1>
                    <br />
                    <div className='profile-likes'>
                        {loaded && likes[0] ?
                            <React.Fragment>
                                <h2>Liked Resources</h2>
                                {likes.map(a => {
                                    return (
                                        <React.Fragment>
                                            <h3>{a.title}</h3>
                                            {a.dynamicData.map(b => {
                                                return (
                                                    <ul>
                                                        <span>
                                                            {b.name}:&nbsp;
                                                                {b.value}&nbsp;as of
                                                                <div style={{ opacity: '.5' }}>{b.timestamp}</div></span>
                                                    </ul>
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                })}
                            </React.Fragment> :
                            loaded ?
                                <React.Fragment>
                                    <p>no liked resources :(</p>
                                </React.Fragment> :
                                null
                        }
                    </div>
                    <div className='profile-resource'>
                        {loaded && initAffiliation ?
                            <React.Fragment>
                                <h2>Affiliated Resource</h2>
                                <div>
                                    <Resource
                                        admin={true}
                                        profile={true}
                                        data={initAffiliation}
                                    />
                                </div>
                            </React.Fragment> :
                            loaded ?
                                <React.Fragment>
                                    <div className='profile-section'>
                                        <p>
                                            Want to add a new resource? This will help people in need access necessary
                                            resources in their area. This section allows you to add some vital information
                                            for your resource page. Along with the basics, we've also included a section to
                                            clarify how you assist with certain services along with the option to add 'Dynamic
                                            Data.'  Dynamic Data is simply information about your nonprofit that will change
                                            on a daily basis (think beds, available housing applications, new services, etc). This
                                            information will be featured on the users profile when they sign in to ensure that
                                            they have this information immediately. It also includes a timestamp to make sure
                                            dynamic information is up-to-date. Feel free to visit the 'about' section for more
                                            details!
            </p>
                                        <AddResource register={true} />
                                    </div>
                                </React.Fragment> :
                                null
                        }
                    </div>
                </div>
            </React.Fragment>
        </React.Fragment>
    )
}

export default withRouter(ProfilePage)