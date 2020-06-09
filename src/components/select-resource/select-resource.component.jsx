import React from 'react';

export const SelectResource = (props) => {
    const [resources, setResources] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false)

    const handleDropdown = (e) => {
        e.preventDefault();
        let resource = resources.find(a => a.title === e.target.value);
        if (e.target.value === 'None') {
            props.handleResource(null);
            return;
        }
        props.handleResource(resource._id)
    }

    const loadResources = () => {
        fetch('/data/register')
                .then(response => response.json())
                .then(newData => {
                    setResources(newData);
                })
                .then(() => setLoaded(true))
                .catch(err => console.log(err))
    }

    React.useEffect(() => loadResources(), [])

    return(
        <React.Fragment>
            {loaded ? 
            <select onChange={handleDropdown}>
                <option disabled selected="selected">Select a Resource</option>
                {resources.map(a => {
                    return(
                        <React.Fragment>
                            <option>{a.title}</option>
                        </React.Fragment>
                    )
                })}
                <option>None</option>
            </select> : 
            null
            }
        </React.Fragment>
    )
} 