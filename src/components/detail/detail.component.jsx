import React from 'react';
import { ReviewBox } from '../review/review-box/review-box.component';
import { CustomButton } from '../custom-button/custom-button.component';

import { withRouter } from 'react-router-dom';
import './detail.styles.css'

//do some fine tuning here

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
                    setUserLikes(true)
                    alert('success!')
                } else {
                    alert(response.message)
                }
            })
            .catch(err => console.log(err))
    }

    const handleClickReview = (e) => {
        e.preventDefault();
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

    const handleClickOffAct = () => {
        setReviewAct(false);
    }

    const handleClickOffList = () => {
        setReviewList(false);
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
                        {data.dynamicData.map(a => {
                            return (
                                <div style={{
                                    display: 'flex',
                                    textAlign: 'left',
                                    width: '100%'
                                }}>
                                    <span><p>{a.name}:&nbsp;{a.value}&nbsp;</p></span>
                                    <br />
                                    <p style={{ opacity: '.5' }}>as of {a.timestamp}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='right-detail'>
                        <br />
                        <p>{data.address}</p>
                        <br />
                        <p>{data.city ? `${data.city}, CO` : 'none specified'}</p>
                        <br />
                        <p>{data.phone}</p>
                        <br />
                        {Object.keys(data.services).map(a => {
                            return (
                                <React.Fragment>
                                    <h4>{a}</h4>
                                    <ul>
                                        {data.services[a].map(b => <li>{b}</li>)}
                                    </ul>
                                </React.Fragment>
                            )
                        })}
                    </div>
                    <div className='detail-reviews'>
                        <React.Fragment>
                            <ReviewBox
                                type='list'
                                active={reviewList}
                                data={reviewData}
                                handleClickOff={handleClickOffList}
                            />
                            <ReviewBox
                                type='review'
                                active={reviewAct}
                                handleSubmitReview={handleSubmitReview}
                                handleClickOff={handleClickOffAct}
                            />
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
                                <img
                                    onClick={handleLike}
                                    src={require('../../logos/thumbs-up.jpg')}
                                    alt='thumbs up'
                                    height='70px'
                                    width='70px'
                                    style={{ cursor: 'pointer' }}
                                />
                            }
                            {userLikes ? <p>LIKED!!!!</p> : null}
                        </React.Fragment>
                    </div>
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