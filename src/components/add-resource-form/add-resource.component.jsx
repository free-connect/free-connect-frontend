import React from 'react';
import './add-resource.styles.css'
import { Form } from '../form/form.component';
import { CityForm } from '../city-form/city-form.component';
import { SelectResource } from '../select-resource/select-resource.component'
import { withRouter } from 'react-router-dom';
import { Services } from '../services/services.component';

const AddResource = (props) => {
    const [title, setTitle] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [website, setWebsite] = React.useState('');
    const [services, setServices] = React.useState([]);
    const [city, setCity] = React.useState('Boulder')
    const [id, setId] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [affiliation, setAffiliation] = React.useState(null)

    const handleResource = (val) => {
        setAffiliation(val);
    }

    const handleEdit = () => {
        const { title, phone, address, url, website, services, _id, city } = props.location.state.data;
        setTitle(title);
        setAddress(address);
        setPhone(phone);
        setUrl(url);
        setWebsite(website);
        setServices(services);
        setId(_id);
        setCity(city)
    }

    React.useEffect(() => {
        if (!props.location.state) {
            return;
        } else {
            handleEdit()
        }
    }, [])

    const handleCityChange = (val) => {
        setCity(val)
    }

    const handleChange = (e) => {
        let newChecked = [...services];
        let ind = newChecked.indexOf(e.target.name)
        if (!e.target.checked) {
            newChecked.splice(ind, 1)
            setServices(newChecked)
        } else {
            setServices([...newChecked, e.target.name]);
        }
    }

    const handleAddUserResource = (aff, tok) => {
        let data = {
            affiliation: aff
        }
        fetch('/add-user-resource', {
            method: "POST", 
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + tok
                }
            })
            .then(res => res.json())
            .then(response => {
                if (response.msg === 'success') {
                    setLoading(false)
                    window.location.reload()
                }
            })
            .catch((err) => console.log(err, 'err'))
        }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            title: title,
            address: address,
            phone: phone,
            url: url,
            services: services,
            website: website,
            city: city
        }
        const token = localStorage.getItem('token');
        if (affiliation) {
            handleAddUserResource(affiliation, token)
            return;
        }
        if (!props.location.state) {
            setLoading(true)
            fetch('/', {
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
                        if (props.register) {
                            handleAddUserResource(response.affiliation, token);
                            return;
                        } else {
                            alert('approved!');
                            props.history.push('/admin-resources')
                            window.location.reload(false);
                        }
                    }
                })
                .catch(err => console.log(err))
        } else {
            data.id = id;
            if (!token) {
                alert('not authorized')
                return;
            }
            fetch('/edit-resource', {
                method: "POST", 
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'bearer '+ token
                    }
                })
                .then(res => res.json())
                .then(response => {
                    if (response.msg) {
                        alert('approved!');
                        props.history.push('/admin-resources')
                    }
                })
                .catch(err => console.log(err))
        }

    }

    return(
        loading ?
        <React.Fragment>
            <p>Loading....</p>
        </React.Fragment> :
        <form className='add-resource' onSubmit={handleSubmit}>
            <Form 
                title='title' 
                label="Organization Name" 
                value={title} 
                type="text" 
                changeFunction = {setTitle}/>
            <Form 
                title='address' 
                label="Address" 
                value={address} 
                type="text" 
                changeFunction = {setAddress}/>
            <Form 
                title='phone' 
                label="Phone" 
                value={phone} 
                type="text" 
                changeFunction = {setPhone}/>
            <Form 
                title='website' 
                label="Website" 
                value={website} 
                type="text" 
                changeFunction = {setWebsite}/>
            <Form 
                title='picture' 
                label="Organization Picture URL" 
                value={url} 
                type="text" 
                changeFunction = {setUrl}/>
            <CityForm handleChange={handleCityChange}/>
            <Services handleChange={handleChange} services={services}/>
            <React.Fragment>
            {props.register ? 
                    <p>
                        <label>Or select from existing....</label>
                        <SelectResource handleResource={handleResource} /> 
                    </p>
                : null}
            </React.Fragment>
            <br/>
            <button type="submit">Submit Information</button>
        </form>
    )
}

export default withRouter(AddResource)