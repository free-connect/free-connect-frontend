import React from 'react';
import { Form } from '../form/form.component';
import { withRouter } from 'react-router-dom';

const AddResource = (props) => {
    const [title, setTitle] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [website, setWebsite] = React.useState('');
    const [services, setServices] = React.useState([]);
    const [city, setCity] = React.useState('Boulder')
    const [id, setId] = React.useState('');

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
        const token = localStorage.getItem('token')
        if (!props.location.state) {
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
                        alert('approved!');
                        props.history.push('/admin-resources')
                        window.location.reload(false);
                    }
                })
                .catch(err => console.log(err))
        } else {
            data.id = id;
            const token = localStorage.getItem('token');
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

    const servicesList = [
        'Housing', 
        'Medical Care', 
        'Mental Health Care', 
        'Benefits', 
        'Veterans Services', 
        'Shelter', 
        'Food'
    ];

    return(
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
            <p>
                <label>Cities</label>
                <select id = "myList" onChange={(e) => setCity(e.target.value)}>
                    <option >Boulder</option>
                    <option >Denver</option>
                </select>
            </p>
            <div className='checks' onChange={handleChange}>
                {servicesList.map((a,i) => {
                    let truthy = false;
                    if (services) {
                        truthy = services.includes(a) ? true : false;
                    }
                    return(
                    <React.Fragment key={i}>
                        <input type='checkbox' checked={truthy} name={a}/>
                            <label htmlFor={`Service${i+1}`}>{a}</label>
                    </React.Fragment>
                    )
                })}
            </div>
                <button type="submit">Submit Information</button>
        </form>
    )
}

export default withRouter(AddResource)