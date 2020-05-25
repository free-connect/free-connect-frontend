import React from 'react';
import './resource.styles.css'
import { Link, withRouter } from 'react-router-dom';
import { Review } from '../review/review.component';

const Resource = (props) => {
    const [reviewAct, setReviewAct] = React.useState(false)

    const handleClick = (e) => {
        e.preventDefault();
        setReviewAct(true);    
    }

    const handleClickOff = () => {
        setReviewAct(false)
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
                console.log('res', response.msg)
                if (response.msg === 'success') {
                    alert('thanks for reviewing!');
                    setReviewAct(false);
                    return;
                } else {
                    throw Error('something broke...')
                }
            })
            .catch(err => console.log(err))
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
            <Review 
                active={reviewAct} 
                handleSubmitReview={handleSubmitReview} 
                handleClickOff={handleClickOff}/> 
            {reviewAct ? <div className="layer"></div> : null}
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
            <button onClick={handleClick}>Review</button>
            <button>See All Reviews</button>
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