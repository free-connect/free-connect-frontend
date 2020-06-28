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
        fetch('/my-resource', {
            headers: {
                method: 'GET',
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(response => setInitAffiliation(response))
            .then(() => {
                return fetch('/my-likes', {
                    headers: {
                        method: 'GET',
                        Authorization: 'Bearer ' + token
                    }
                })
                    .then(res => res.json())
                    .then(response => setLikes([...response.likes]))
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
                <h1>Welcome back {localStorage.getItem('name')}!</h1>
                <br />
                <div className='profile' >
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
                                <div className='section'>
                                    <Resource
                                        admin={true}
                                        profile={true}
                                        data={initAffiliation}
                                    />
                                </div>
                            </React.Fragment> :
                            loaded ?
                                <React.Fragment>
                                    <p>Do you work for a nonprofit and want it to be included on this
                                site? Add one here!</p>
                                    <div className='section'>
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