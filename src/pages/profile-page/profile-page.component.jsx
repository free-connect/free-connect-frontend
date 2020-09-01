import React from 'react';
import './profile-page.styles.css'
import Resource from '../../components/resources/resource/resource.component';
import { Loading } from '../../components/loading-icon/loading.component'
import { withRouter } from 'react-router-dom';
import NewEditResource from '../../components/resources/new-edit-resource/new-edit-resource.component';

const ProfilePage = (props) => {
    const [initAffiliation, setInitAffiliation] = React.useState(null)
    const [loaded, setLoaded] = React.useState(false);
    const [likes, setLikes] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const loadMyResources = () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        fetch(process.env.REACT_APP_LOCATION + '/my-resource', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(response => setInitAffiliation(response))
            .then(() => {
                return fetch(process.env.REACT_APP_LOCATION + '/my-likes', {
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
                    .then(() => setLoading(false))
                    .catch(err => console.log(err))
            })
            .then(() => {
                setLoaded(true);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }

    React.useEffect(() => {
        loadMyResources()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment >
            {loaded ? null : <Loading />}
            {!loading ?
                <div hidden={loading ? true : false} className='profile-block' >
                    {loaded ? <h1>Welcome back {localStorage.getItem('name')}!</h1> : null}
                    <br />
                    <div className='profile-likes'>
                        {loaded && likes[0] ?
                            <React.Fragment>
                                <h2>Liked Resources</h2>
                                {likes.map((likedResource, key) => {
                                    return (
                                        <React.Fragment key={key}>
                                            <h3>{likedResource.title}</h3>
                                            {likedResource.dynamicData[0] ?
                                                likedResource.dynamicData.map((dataPoint, dataKey) => {
                                                    return (
                                                        <ul key={dataKey}>
                                                            <span>
                                                                {dataPoint.name}:&nbsp;
                                                                {dataPoint.value}&nbsp;as of
                                                                <div style={{ opacity: '.5' }}>
                                                                    {dataPoint.timestamp}
                                                                </div>
                                                            </span>
                                                        </ul>
                                                    )
                                                }) :
                                                <ul>
                                                    <p>No updates</p>
                                                </ul>}
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
                                <React.Fragment>
                                    <Resource
                                        admin={true}
                                        profile={true}
                                        data={initAffiliation}
                                    />
                                </React.Fragment>
                            </React.Fragment> :
                            loaded ?
                                <React.Fragment>
                                    <div className='profile-section'>
                                        <p>
                                            Want to add a new resource? This will help people in need access necessary
                                            resources in their area. This section allows you to add some vital information
                                            for your resource page. Along with the basics, we've also included a section to
                                            clarify how you assist with certain services along with the option to add 'Updates.'
                                            Updates are facts about your nonprofit that will change
                                            on a daily basis (think beds, available housing applications, new services, etc). This
                                            information will be featured on the users profile when they sign in to ensure that
                                            they have this information immediately. It also includes a timestamp to make sure
                                            these updates are current. Feel free to visit the 'about' section for more
                                            details!
                                        </p>
                                        <NewEditResource handleLoading={setLoading} register={true} />
                                    </div>
                                </React.Fragment> :
                                null
                        }
                    </div>
                </div> :
                <Loading />}
        </React.Fragment>
    )
}

export default withRouter(ProfilePage)