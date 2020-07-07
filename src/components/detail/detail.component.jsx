import React from 'react';
import { ReviewBox } from '../review/review-box/review-box.component';
import { CustomButton } from '../custom-button/custom-button.component';
import { LikeButton } from '../like-button/like-button.component';

import { withRouter } from 'react-router-dom';
import './detail.styles.css'

const Detail = (props) => {
    const [data, setData] = React.useState({})
    const [loaded, setLoaded] = React.useState(false);
    const [reviewAct, setReviewAct] = React.useState(false)
    const [reviewList, setReviewList] = React.useState(false);
    const [reviewData, setReviewData] = React.useState([]);
    const [userLikes, setUserLikes] = React.useState(false)

    const handleResourceLoad = (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        fetch('/myLikes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + token
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.likes && response.likes.includes(id)) {
                    setUserLikes(true)
                } else {
                    return
                }
            })
            .catch(err => console.log(err))
    }

    const handleLike = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            alert('You gotta be signed in to like a resource!');
            return;
        }
        const newData = {
            likedId: data._id
        }
        fetch('/like',
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
                } else {
                    return;
                }
            })
            .catch(err => console.log(err))
    }

    const handleClickReview = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        const token = localStorage.getItem('token')
        if (!token) {
            alert('You gotta sign in to review a resource!');
            return;
        }
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
        fetch(`/review-list?resId=${data._id}`, {
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
            alert("Oh No! You're not a user! come register :)")
            return;
        };
        fetch('/review', {
            method: "POST",
            body: JSON.stringify(newData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + token
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    alert('thanks for reviewing!');
                } else {
                    alert(response.message)
                };
                setReviewAct(false);
                return
            })
            .catch(err => {
                console.log(err);
                alert('hmm somthing went wrong. Please make sure you have a reistered affiliation before reviewing!')
                setReviewAct(false);
                return
            })
    }

    const getDetails = (pushedData) => {
        handleResourceLoad(pushedData._id)
        if (!pushedData) {
            return;
        }
        fetch('/details?id=' + pushedData._id, {
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

    React.useState(() => props.location.state ? getDetails(props.location.state.data) : setLoaded(true), []);

    return (
        <div className='resource-detail'>
            {Object.keys(data)[0] && loaded ?
                <React.Fragment>
                    <div className='left-detail'>
                        <h3>{data.title}</h3>
                        <br />
                        <a href={data.website}>
                            <img
                                src={data.url}
                                alt={data.title}
                                height='auto'
                                width='80%'
                            />
                        </a>
                        <br />
                        <p>{data.address}</p>
                        <p>{data.city ? `${data.city}, CO` : 'none specified'}</p>
                        <p>{data.phone}</p>
                        <br />
                        {data.dynamicData.map(a => {
                            return (
                                <div className='detail-dynamic-data'>
                                    <span><p>{a.name}:&nbsp;{a.value}&nbsp;</p></span>
                                    <p className='detail-dynamic-data__time'>updated {a.timestamp}</p>
                                </div>
                            )
                        })}
                        <div className='detail-reviews'>
                            <React.Fragment>
                                {!props.admin ?
                                    <CustomButton
                                        text='Review'
                                        disabled={reviewAct ? true : false}
                                        handleClick={handleClickReview}
                                    /> :
                                    null}
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
                        </div>
                    </div>
                    <div className='right-detail'>
                        {Object.keys(data.services).map(a => {
                            return (
                                <div className='detail-service'>
                                    <h4>{a}</h4>
                                    <ul>
                                        {data.services[a].map(b => <li>{b}</li>)}
                                    </ul>
                                </div>
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
                    <p>Thanks for checking out resource details! Head over to the resoure page to browse a list of available resources in your area</p> :
                    null
            }
            {reviewAct || reviewList ? <div className="detail-layer"></div> : null}
        </div>
    )
}

export default withRouter(Detail)