import React from 'react';
import Resource from '../resource/resource.component';
import './resource-list.styles.css';

export const ResourceList = (props) => {
    const [data, setData] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);

    function compare(check, arrs) {
        check = [...check]
        let count = 0;
        while(check[0]) {
          if (arrs.includes(check[check.length-1])) {
            count++
          }
          check.pop()
        };
        return count
      }

    const getData = () => {
        let query = '?city='+props.city
        fetch('/data/resources'+query)
                .then(response => response.json())
                .then(newData => {
                    if (props.services) {
                        newData = newData.sort((a,b) => compare(props.services, b.services)-compare(props.services, a.services))
                    }
                    setData([...data, ...newData])
                })
                .then(() => {
                    setLoaded(true)
                })
                .catch(err => console.log(err))
    }

    React.useEffect(() => getData(), [])

        return(
            <div className='resource-list'>
                {data.length>0 && loaded ? 
                data.map(a => {
                    return(
                        <React.Fragment>
                            <Resource data = {a} admin={props.admin}/>
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