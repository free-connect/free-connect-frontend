import React from 'react';
import Resource from '../resource/resource.component';
import { CustomButton } from '../../custom-button/custom-button.component';
import './resource-list.styles.css';

export const ResourceList = (props) => {
    const [data, setData] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [count, setCount] = React.useState(0);
    const [userLikes, setUserLikes] = React.useState([])

    const updateLikes = (val) => {
        const newLikes = [...userLikes, val];
        setUserLikes(newLikes)
    }

    const handleResourceLoad = () => {
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
                if (response.likes) {
                    setUserLikes(response.likes)
                } else {
                    return
                }
            })
            .catch(err => console.log(err))
    }

    const handleClick = (name) => {
        const newPage = name === 'next' ? page + 1 : page - 1;
        setPage(newPage)
        return getData(newPage)
    }

    const getData = (pageVal = 1) => {
        let query = `/data/resources?page=${pageVal}&city=${props.city ? props.city : ''}&services=${props.services ? props.services : ''}`
        fetch(query)
            .then(response => response.json())
            .then(newData => {
                setCount(newData.totalRes)
                setData([...newData.resources])
            })
            .then(() => {
                if (props.handleLoad) {
                    props.handleLoad(true)
                }
                setLoaded(true);
            })
            .catch(err => console.log('errorrrrr', err))
    }

    React.useEffect(() => {
        getData();
        handleResourceLoad();
        return;
    }, [])

    return (
        <React.Fragment>
            <div className='resource-list'>
                {data.length > 0 && loaded ?
                    data.map((a, i) => {
                        return (
                            <React.Fragment>
                                <Resource
                                    updateLikes={updateLikes}
                                    liked={userLikes.includes(a._id)}
                                    id={i + 1 === data.length ? 0 : i + 1}
                                    data={a}
                                    admin={props.admin}
                                />
                            </React.Fragment>
                        )
                    }) :
                    <React.Fragment>
                        <p>No data!</p>
                    </React.Fragment>
                }
            </div>
            <div className='button'>
                {page > 1 ?
                    <div
                        style={{
                            marginLeft: '30%',
                            marginRight: '30%'
                        }}
                        name='prev'
                        onClick={(e) => handleClick('prev')}
                    >
                        <CustomButton
                            text="previous"
                        />
                    </div> :
                    null}
                {page < (count / 4) ?
                    <div
                        style={{
                            marginLeft: '30%',
                            marginRight: '30%'
                        }}
                        name='next'
                        onClick={(e) => handleClick('next')}
                    >
                        <CustomButton
                            text="next"
                        />
                    </div> :
                    null}
            </div>
        </React.Fragment>
    )
}