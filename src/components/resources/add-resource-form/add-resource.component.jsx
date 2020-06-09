import React from 'react';
import './add-resource.styles.css'
import { Form } from '../../form/form.component';
import { CityForm } from '../../city-form/city-form.component';
import { SelectResource } from '../../select-resource/select-resource.component'
import { withRouter } from 'react-router-dom';
import { Services } from '../../services/services.component';

const AddResource = (props) => {
    const [title, setTitle] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [url, setUrl] = React.useState([]);
    const [website, setWebsite] = React.useState('');
    const [services, setServices] = React.useState([]);
    const [city, setCity] = React.useState('Boulder')
    const [id, setId] = React.useState('');
    const [affiliation, setAffiliation] = React.useState(null)

    const handleResource = (val) => {
        setAffiliation(val);
    }

    const handleImage = (e) => {
        e.preventDefault();
        setUrl([e.target.files[0]])
        return
    }

    const siftPhone = (val) => {
        val = val.split(/[^\d]/gi).join('');
        return val
      };

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
            affiliation: aff.toString()
        }
        fetch('/add-user-resource', {
            method: "POST", 
            body: JSON.stringify(data),
            headers: {
                Authorization: 'bearer ' + tok,
                'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(response => {
                if (response.errors) {
                    alert(response.errors.map(a => a.msg).join(' '));
                    return;
                }
                if (response.success) {
                    window.location.reload()
                }
            })
            .catch((err) => console.log(err, 'err'))
        }

    const handleSubmit = (e) => {
        e.preventDefault()
        let checkTelephone = siftPhone(phone);
        if (checkTelephone.length !== 10 && phone) {
            alert('number must be 10 digits long. Please include area code!');
            return
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('address', address);
        formData.append('phone', checkTelephone);
        formData.append('image', url[0]);
        formData.append('services', services);
        formData.append('website', website);
        formData.append('city', city);
        const token = localStorage.getItem('token');
        if (affiliation) {
            handleAddUserResource(affiliation, token)
            return;
        }
        if (!props.location.state) {
            fetch('/', {
                method: "POST", 
                body: formData,
                headers: {
                    Authorization: 'bearer ' + token
                    }
                })
                .then(res => res.json())
                .then(response => {
                    if (response.errors) {
                        alert(response.errors);
                        return;
                    }
                    if (response.success) {
                        if (props.register) {
                            handleAddUserResource(response.affiliation, token);
                        } else {
                            alert('approved!');
                            props.history.push('/admin-resources')
                            window.location.reload(false);
                        }
                    }
                })
                .catch(err => console.log(err));
        } else {
            formData.append('id', id)
            if (!token) {
                alert('not authorized')
                return;
            }
            fetch('/edit-resource', {
                method: "POST", 
                body: formData,
                headers: {
                    Authorization: 'bearer '+ token
                    }
                })
                .then(res => res.json())
                .then(response => {
                    if (response.errors) {
                        alert(response.errors.map(a => a.msg).join(' '));
                        return;
                    }
                    if (response.success) {
                        alert('approved!');
                        props.history.push('/profile')
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return(
        <form className='add-resource-form' onSubmit={handleSubmit}>
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
                <br />
            <label htmlFor='picture' >Picture</label>
                <input 
                    className='custom-form'
                    type='file'
                    name='picture' 
                    onChange={handleImage}/>
            <br />
            <CityForm handleChange={handleCityChange}/>
            <br />
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