import React from 'react';
import Resource from '../resource/resource.component';
import { CustomButton } from '../../custom-button/custom-button.component';
import './resource-list.styles.css';

export const ResourceList = (props) => {
    const [data, setData] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [count, setCount] = React.useState(0);

    const handleClick = (name) => {
        const newPage = name === 'next' ? page + 1 : page - 1;
        setPage(newPage)
        return getData(newPage)
    }

    const getData = (pageVal = 1) => {
        let query = process.env.REACT_APP_LOCATION+`/data/resources?page=${pageVal}&city=${props.city ? props.city : ''}&services=${props.services ? props.services : ''}`
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
        return;
    }, [])

    return (
        <React.Fragment>
            <div className='resource-list'>
                {data[0] && loaded ?
                    data.map((a, i) => {
                        return (
                            <React.Fragment>
                                <Resource
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
            <div className='button-block'>
                {page > 1 ?
                    <div
                        className='button-block__spec'
                        onClick={() => handleClick('prev')}
                    >
                        <CustomButton
                            text="previous"
                        />
                    </div> :
                    null}
                {page < (count / 4) ?
                    <div
                        className="button-block__spec"
                        onClick={() => handleClick('next')}
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