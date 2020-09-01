import React from 'react';
import { ReviewBox } from '../../review/review-box/review-box.component';
import { CustomButton } from '../../custom-button/custom-button.component';
import { LikeButton } from '../../like-button/like-button.component';
import { Loading } from '../../loading-icon/loading.component';
import { ResourceLink } from '../../resources/resource-link/resource-link.component';
import { DetailServices } from '../detail-services/detail-services.component';
import { AlertBoxContext } from '../../../util/context/alertContext';
import { quickAlert } from '../../../util/functions'

import { withRouter } from 'react-router-dom';
import './resource-detail.styles.css'

const ResourceDetail = (props) => {
    const [state, setState] = React.useContext(AlertBoxContext);
    const [data, setData] = React.useState({});
    const [loaded, setLoaded] = React.useState(false);
    const [reviewAct, setReviewAct] = React.useState(false);
    const [reviewList, setReviewList] = React.useState(false);
    const [reviewData, setReviewData] = React.useState([]);
    const [userLikes, setUserLikes] = React.useState(false);

    const handleResourceLoad = (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        fetch(process.env.REACT_APP_LOCATION + '/my-likes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + token
            }
        })
            .then(res => res.json())
            .then(response => {
                let checkId = response.likes.map(a => a.id)
                if (response.likes && checkId.includes(id)) {
                    setUserLikes(true)
                } else {
                    return;
                }
            })
            .catch(err => console.log(err))
    }

    const handleLike = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            const message = 'You gotta be signed in to like a resource!';
            quickAlert(message, state, setState)
            return;
        }
        const newData = {
            likedId: data._id
        }
        fetch(process.env.REACT_APP_LOCATION + '/like',
            {
                method: 'POST',
                body: JSON.stringify(newData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'bearer ' + token
                }
            })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    setUserLikes(true);
                    return;
                } else if (response.message) {
                    const message = response.message;
                    quickAlert(message, state, setState)
                    return;
                }
                return;
            })
            .catch(err => console.log(err))
    }

    const handleClickReview = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        if (!token) {
            const message = 'You gotta sign in to review a resource!';
            quickAlert(message, state, setState)
            return;
        }
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        if (reviewList) {
            setReviewList(false)
        }
        setReviewAct(true);
    }

    const handleClickList = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        if (reviewAct) {
            setReviewAct(false)
        }
        fetch(process.env.REACT_APP_LOCATION + `/review-list?resId=${data._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    setReviewData(response.data);
                }
            })
            .then(() => setReviewList(true))
            .catch(err => console.log(err))
    }

    const handleSubmitReview = (e, review) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        let newData = {
            resourceId: data._id,
            review: review
        };
        if (!token) {
            const message = "Oh No! You're not a user! come register :)";
            quickAlert(message, state, setState);
            return;
        };
        fetch(process.env.REACT_APP_LOCATION + '/review', {
            method: "POST",
            body: JSON.stringify(newData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + token
            }
        })
            .then(res => res.json())
            .then(response => {
                let message;
                if (response.success) {
                    message = 'thanks for reviewing!'
                } else {
                    message = response.message
                };
                quickAlert(message, state, setState)
                setReviewAct(false);
                return
            })
            .catch(err => {
                console.log(err);
                const message = 'hmm somthing went wrong. Please make sure you have a reistered affiliation before reviewing!';
                quickAlert(message, state, setState)
                setReviewAct(false);
                return
            })
    }

    const getDetails = (pushedData) => {
        handleResourceLoad(pushedData._id)
        if (!pushedData) {
            return;
        }
        fetch(process.env.REACT_APP_LOCATION + '/details?id=' + pushedData._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                setData({ ...pushedData, details: response.data })
            })
            .then(() => setLoaded(true))
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        props.location.state ? getDetails(props.location.state.data) : setLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    return (
        <div className='resource-detail'>
            {loaded ? null : <Loading />}
            {Object.keys(data)[0] && loaded ?
                <React.Fragment>
                    <div className='left-detail'>
                        <h3>{data.title}</h3>
                        <br />
                            <img
                                src={data.url}
                                alt={data.title}
                                height='auto'
                                width='80%'
                            />
                        <br />
                        <ResourceLink website={data.website}/>
                        <br />
                        <p>{data.address}</p>
                        <p>{data.city ? `${data.city}, CO` : 'none specified'}</p>
                        <p>{data.phone}</p>
                        <br />
                        {data.dynamicData.map((dataPoint, key) => {
                            return (
                                <div key={key} className='detail-dynamic-data'>
                                    <span><p>{dataPoint.name}:&nbsp;{dataPoint.value}&nbsp;</p></span>
                                    <p className='detail-dynamic-data__time'>updated {dataPoint.timestamp}</p>
                                </div>
                            )
                        })}
                        {loaded ?
                <div className='detail-reviews'>
                    <React.Fragment>
                        {!props.admin ?
                            <CustomButton
                                text='Review'
                                disabled={reviewAct ? true : false}
                                handleClick={handleClickReview}
                            /> :
                            null}
                        <br />
                        {!props.admin ?
                            <CustomButton
                                text='See All Reviews'
                                disabled={reviewList ? true : false}
                                handleClick={handleClickList}
                            /> :
                            null}
                        {props.profile || props.admin ?
                            null :
                            <React.Fragment>
                                <LikeButton
                                    userLikes={userLikes}
                                    handleLike={handleLike}
                                />
                            </React.Fragment>
                        }
                    </React.Fragment>
                </div> :
                null}
                    </div>
                    <div className='right-detail'>
                        {Object.keys(data.services).map((service, key) => {
                            return (
                                <DetailServices key={key} service={service} details={data.services[service]}/>
                            )
                        })}
                    </div>
                    <ReviewBox
                        type='list'
                        active={reviewList}
                        data={reviewData}
                        handleClickOff={() => setReviewList(false)}
                    />
                    <ReviewBox
                        type='review'
                        active={reviewAct}
                        handleSubmitReview={handleSubmitReview}
                        handleClickOff={() => setReviewAct(false)}
                    />
                </React.Fragment>
                :
                loaded ?
                    <p className='detail-default'>Thanks for checking out resource details! Head over to the resoure page to browse a list of available resources in your area</p> :
                    null
            }
            {reviewAct || reviewList ? <div className="detail-layer"></div> : null}
        </div>
    )
}

export default withRouter(ResourceDetail)