import React from 'react';
import './add-resource.styles.css'
import { siftPhone } from '../../../util/functions'
import { Dynamic } from '../../dynamic-data/dynamic.component';
import { Form } from '../../form/form.component';
import { CityForm } from '../../city-form/city-form.component';
import { SelectResource } from '../../select-resource/select-resource.component'
import { withRouter } from 'react-router-dom';
import { ServicesAll } from '../../services-all/services-all.component';

const AddResource = (props) => {
    const [title, setTitle] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [url, setUrl] = React.useState([]);
    const [website, setWebsite] = React.useState('');
    const [services, setServices] = React.useState({})
    const [city, setCity] = React.useState('Boulder')
    const [dynamicData, setDynamicData] = React.useState([]);
    const [id, setId] = React.useState('');
    const [affiliation, setAffiliation] = React.useState(null)

    const handleImage = (e) => {
        e.preventDefault();
        setUrl([e.target.files[0]]);
        return;
    }

    const addDetail = (arr, del = false) => {
        let name = Object.keys(arr)[0];
        let detail = { ...services }
        if (del) {
            delete detail[name]
        } else {
            detail[name] = arr[name];
        }
        setServices(detail);
    }

    const handleEdit = () => {
        if (!props.location.state.data) {
            props.history.push('/');
            return;
        }
        const { title,
            dynamicData,
            phone,
            address,
            url,
            website,
            services,
            _id,
            city } = props.location.state.data;
        setTitle(title);
        setAddress(address);
        setPhone(phone);
        setDynamicData(dynamicData);
        setUrl(url);
        setWebsite(website);
        setServices(services)
        setId(_id);
        setCity(city);
        return
    }

    const handleAddUserResource = (aff, tok) => {
        let data = {
            affiliation: aff.toString()
        }
        fetch(process.env.REACT_APP_LOCATION+'/add-user-resource', {
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
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (affiliation) {
            handleAddUserResource(affiliation, token)
            return;
        }
        let checkTelephone = siftPhone(phone);
        if (checkTelephone.length !== 10 && phone) {
            alert('number must be 10 digits long. Please include area code!');
            return
        }
        if (!Object.keys(services)[0]) {
            alert('please select at least one service')
            return;
        }
        if (!address) {
            alert('Please enter an address.');
            return;
        }
        if (!website) {
            alert("Please enter a valid website! This can include facebook/instagram links as well.");
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('address', address);
        formData.append('phone', checkTelephone);
        formData.append('image', url[0]);
        formData.append('dynamicData', JSON.stringify(dynamicData));
        formData.append('services', JSON.stringify(services));
        formData.append('website', website);
        formData.append('city', city);
        if (!props.location.state) {
            fetch(process.env.REACT_APP_LOCATION+'/', {
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
            fetch(process.env.REACT_APP_LOCATION+'/edit-resource', {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: 'bearer ' + token
                }
            })
                .then(res => res.json())
                .then(response => {
                    if (response.errors) {
                        console.log(response, response.errors)
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

    React.useEffect(() => {
        if (!props.location.state) {
            return;
        } else {
            handleEdit()
        }
    }, [])

    return (
        <form className='add-resource-form' onSubmit={handleSubmit}>
            <Form
                title='title'
                label="Organization Name"
                value={title}
                type="text"
                changeFunction={setTitle} />
            <Form
                title="address"
                label="Address"
                value={address}
                type="text"
                changeFunction={setAddress} />
            <Form
                title='phone'
                label="Phone"
                value={phone}
                type="text"
                changeFunction={setPhone} />
            <Form
                title='website'
                label="Website"
                value={website}
                type="text"
                changeFunction={setWebsite} />
            <br />
            <label htmlFor='picture' >Picture</label>
            <input
                className='custom-form'
                type='file'
                name='picture'
                onChange={handleImage} />
            <br />
            <CityForm setCity={setCity} city={city} />
            <br />
            <ServicesAll
                setServices={setServices}
                services={services}
                addDetail={addDetail}
                add={true}
                {...props} />
            <br />
            <br />
            <Dynamic
                handleDynamic={setDynamicData}
                dynamicData={dynamicData}
            />
            <React.Fragment>
                {props.register ?
                    <p>
                        <label>Or select from existing....</label>
                        <SelectResource handleResource={setAffiliation} />
                    </p>
                    : null}
            </React.Fragment>
            <br />
            <button
                className="add-resource-button"
                type="submit"
            >
                Submit Information
            </button>
        </form>
    )
}

export default withRouter(AddResource)