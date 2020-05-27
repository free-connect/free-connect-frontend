import React from 'react';
import './resource.styles.css'
import { Link, withRouter } from 'react-router-dom';
import { ReviewBox } from '../review/review-box/review-box.component';

const Resource = (props) => {
    const [reviewAct, setReviewAct] = React.useState(false)
    const [reviewList, setReviewList] = React.useState(false);
    const [reviewData, setReviewData] = React.useState([])

    const handleClick = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
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
                if (response.msg === 'success') {
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
        let data = {
            resourceId: props.data._id,
            review: review
        };
        const token = localStorage.getItem('token')
        if (!token) {
            alert("Oh No! You're not a user! come register :)")
            props.location.push('/register');
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
                if (response.msg === 'success') {
                    alert('thanks for reviewing!');
                    setReviewAct(false);
                    return;
                } else if (response.msg === 'already reviewed') {
                    alert('You already reviewed this resource!')
                    setReviewAct(false);
                    return
                } else if (response.msg === 'your resource') {
                    alert("Can't review your own resource!");
                    setReviewAct(false);
                    return
                } else if (response.msg === 'no affiliation') {
                    alert("You have to have an affiliation to review!");
                    setReviewAct(false);
                    return
                }
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
                if (response.msg) {
                    alert('Successfully Deleted!');
                    props.history.push('/admin-resources');
                    window.location.reload(false);
                }
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="resource-box">
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
                handleClickOff={handleClickOffAct}/> 
            {reviewAct || reviewList ? <div className="layer"></div> : null}
            <h1>{props.data.title}</h1>
            <p>address: {props.data.address}</p>
            <p>city: {props.data.city ? props.data.city : 'none'}</p>
            <p>phone: {props.data.phone}</p>
            <a href={props.data.website}>Click to visit {props.data.name}</a>
            <img 
                src={props.data.url} 
                alt={props.data.title}
                height='350px'
                width='350px'
                />
            <p>resources offered: {
                props
                    .data
                    .services
                    .map((a, i) => i === 0 ? 
                        <span>  {a} </span> : 
                        <span>| {a} </span>)}
            </p>
            {!props.admin ? <button disabled={reviewAct ? true : false} onClick={handleClick}>Review</button> : null}
            {!props.admin ? <button disabled={reviewList ? true : false} onClick={handleClickList}>See All Reviews</button> : null}
            {props.admin ? 
            <div className='delete-resource'>
                {!props.profile ?
                <React.Fragment>
                    <button onClick={handleDelete}>
                        Delete
                    </button>
                </React.Fragment> : 
                null
                }
                <Link to={{
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
    )
}

export default withRouter(Resource)