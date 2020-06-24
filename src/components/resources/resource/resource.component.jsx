import React from 'react';
import './resource.styles.css';
import { ReviewBox } from '../../review/review-box/review-box.component';
import { ReviewButton } from '../../review-button/review-button.component';
import { Link, withRouter } from 'react-router-dom';

const Resource = (props) => {
    const [reviewAct, setReviewAct] = React.useState(false)
    const [reviewList, setReviewList] = React.useState(false);
    const [reviewData, setReviewData] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);

    const handleLike = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            alert('You gotta be signed in to like a resource!');
            return;
        }
        const data = {
            likedId: props.data._id
        }
        fetch('/like',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'bearer ' + token
                }
            })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    props.updateLikes(props.data._id)
                    alert('success!')
                } else {
                    alert(response.message)
                }
            })
            .catch(err => console.log(err))
    }

    const handleDetail = () => {
        if (disabled) {
            return;
        }
        props.history.push({
            pathname: '/detail',
            state: {
                data: props.data
            }
        })
        return;
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
        fetch(`/review-list?resId=${props.data._id}`, {
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
        let data = {
            resourceId: props.data._id,
            review: review
        };
        if (!token) {
            alert("Oh No! You're not a user! come register :)")
            return;
        };
        fetch('/review', {
            method: "POST",
            body: JSON.stringify(data),
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

    const handleDelete = (e) => {
        e.preventDefault()
        let data = {
            id: props.data._id
        }
        const token = localStorage.getItem('token')
        if (!token) {
            alert('not authorized');
            return
        }
        fetch('/delete-resource', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + token
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    alert('Successfully Deleted!');
                    props.history.push('/admin-resources');
                    window.location.reload(false);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='resource-box' onClick={() => reviewAct || reviewList ? null : handleDetail()}>
            {!props.profile ?
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
                </React.Fragment> :
                null}
            <div className="resource-left">
                <h3>{props.data.title}</h3>
                <img
                    src={props.data.url}
                    alt={props.data.title}
                    height='80vw'
                    width='80vw'
                />
                <br />
                {!props.admin ?
                    <ReviewButton
                        handleHover={setDisabled}
                        text='Review'
                        disabled={reviewAct ? true : false}
                        handleClick={handleClickReview}
                    /> :
                    null}
                {!props.admin ?
                    <ReviewButton
                        text='See All Reviews'
                        handleHover={setDisabled}
                        disabled={reviewList ? true : false}
                        handleClick={handleClickList}
                    /> :
                    null}
            </div>
            <div className="resource-right">
                <ul>
                    {Object.keys(props.data.services).map(a => <li>{a}</li>)}
                </ul>
                <br />
                <p>{props.data.address}</p>
                <p>{props.data.city ? props.data.city : 'none'}, CO</p>
                <br />
                <p>{props.data.phone}</p>
                <br />
                <a
                    onMouseOver={() => setDisabled(true)}
                    onMouseOut={() => setDisabled(false)}
                    href={props.data.website}>Click to visit {props.data.name}</a>
                {props.profile || props.admin ?
                    null :
                    <img
                        onClick={handleLike}
                        onMouseOver={() => setDisabled(true)}
                        onMouseOut={() => setDisabled(false)}
                        src={require('../../../logos/thumbs-up.jpg')}
                        alt='thumbs up'
                    />
                }
                {props.liked ? <p>LIKED!!!!</p> : null}
                {props.admin ?
                    <div className='delete-resource'>
                        {!props.profile ?
                            <React.Fragment>
                                <button
                                    onMouseOver={() => setDisabled(true)}
                                    onMouseOut={() => setDisabled(false)}
                                    onClick={handleDelete}>
                                    Delete
                        </button>
                            </React.Fragment> :
                            null
                        }
                        <Link
                            onMouseOver={() => setDisabled(true)}
                            onMouseOut={() => setDisabled(false)}
                            to={{
                                pathname: "/edit-resource",
                                state: {
                                    data: props.data,
                                    edit: true
                                }
                            }}>Edit</Link>
                    </div> :
                    null
                }
            </div>
            {reviewAct || reviewList ? <div className="resource-layer"></div> : null}
        </div>
    )
}

export default withRouter(Resource)