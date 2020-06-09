import React from 'react';
import Resource from '../resource/resource.component';
import './resource-list.styles.css';

export const ResourceList = (props) => {
    const [data, setData] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);

    const getData = () => {
        let query = `/data/resources?city=${props.city ? props.city : ''}&services=${props.services ? props.services : ''}`
        fetch(query)
                .then(response => response.json())
                .then(newData => {
                    console.log('newData', newData)
                    setData([...newData.resources])
                })
                .then(() => {
                    props.handleLoad(true)
                    setLoaded(true);
                })
                .catch(err => console.log('errorrrrr', err))
    }

    React.useEffect(() => getData(), [])

        return(
            <div className='resource-list'>
                {data.length>0 && loaded ? 
                data.map((a, i) => {
                    return(
                        <React.Fragment>
                            <Resource 
                                id={i+1 === data.length ? 0 : i+1} 
                                data = {a} 
                                admin={props.admin}/>
                        </React.Fragment>
                    )
                }) :
                    <React.Fragment>
                        <p>No data!</p>
                    </React.Fragment>
            }
        </div>
    )
}