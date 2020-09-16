import React from 'react';
import './new-edit-resource.styles.css'
import { siftPhone } from '../../../util/functions'
import { Dynamic } from '../../dynamic-data/dynamic.component';
import { Form } from '../../form/form.component';
import { ButtonAndDropdown } from '../../button-and-dropdown/button-and-dropdown.component';
import { SelectResource } from '../../select-resource/select-resource.component'
import { withRouter } from 'react-router-dom';
import { CustomButton } from '../../custom-button/custom-button.component';
import { AlertBoxContext } from '../../../util/context/alertContext';
import { quickAlert } from '../../../util/functions';


const NewEditResource = (props) => {
    const [state, setState] = React.useContext(AlertBoxContext);
    const [title, setTitle] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [url, setUrl] = React.useState([]);
    const [preview, setPreview] = React.useState('')
    const [website, setWebsite] = React.useState('');
    const [services, setServices] = React.useState({})
    const [city, setCity] = React.useState('Boulder')
    const [dynamicData, setDynamicData] = React.useState([]);
    const [id, setId] = React.useState('');
    const [affiliation, setAffiliation] = React.useState(null);

    const handleImage = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setUrl(file);
        if (window.FileReader) {
            const reader = new FileReader();
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(file);
            }
            reader.onloadend = () => setPreview(reader.result)
        }
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
        setPreview(url)
        return;
    }

    const handleErrorArray = (array) => {
        const errorMessage = array.map(messages => messages.msg).join(' ');
        quickAlert(errorMessage, state, setState);
    }

    const handleAddUserResource = (aff, tok) => {
        let data = {
            affiliation: aff.toString()
        }
        fetch(process.env.REACT_APP_LOCATION + '/add-user-resource', {
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
                    handleErrorArray(response.errors)
                    props.handleLoading(false);
                    return;
                }
                if (response.success) {
                    props.handleLoading(false);
                    const successMessage = 'success!';
                    quickAlert(successMessage, state, setState);
                }
            })
            .catch((err) => console.log(err, 'err'))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (affiliation) {
            props.handleLoading(true);
            handleAddUserResource(affiliation, token)
            return;
        }
        let checkTelephone = siftPhone(phone);
        if (checkTelephone.length !== 10 && phone) {
            const errorMessage = 'Number must be 10 digits long. Please include area code!';
            quickAlert(errorMessage, state, setState);
            return
        }
        if (!Object.keys(services)[0]) {
            const errorMessage = 'Please select at least one service.';
            quickAlert(errorMessage, state, setState);
            return
        }
        if (!address) {
            const errorMessage = 'Please enter an address.';
            quickAlert(errorMessage, state, setState);
            return
        }
        if (!website) {
            const errorMessage = 'Please enter a valid website! This can include facebook/instagram links as well.';
            quickAlert(errorMessage, state, setState);
            return
        }
        props.handleLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('address', address);
        formData.append('phone', checkTelephone);
        formData.append('image', url);
        formData.append('dynamicData', JSON.stringify(dynamicData));
        formData.append('services', JSON.stringify(services));
        formData.append('website', website);
        formData.append('city', city);
        if (!props.location.state) {
            fetch(process.env.REACT_APP_LOCATION + '/', {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: 'bearer ' + token
                }
            })
                .then(res => res.json())
                .then(response => {
                    if (!props.register) {
                        props.handleLoading(false)
                    }
                    if (response.errors) {
                        const errorMessage = response.errors;
                        quickAlert(errorMessage, state, setState);
                        return
                    }
                    if (response.success) {
                        if (props.register) {
                            handleAddUserResource(response.affiliation, token);
                        } else {
                            setState({
                                ...state,
                                onClose: () => {
                                    props.history.push('/admin-resources')
                                    window.location.reload(false);
                                }
                            })
                            quickAlert('Approved!', state, setState);
                        }
                    }
                })
                .catch(err => console.log(err));
        } else {
            formData.append('id', id)
            if (!token) {
                const errorMessage = 'not authorized';
                quickAlert(errorMessage, state, setState);
                return;
            }
            fetch(process.env.REACT_APP_LOCATION + '/edit-resource', {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: 'bearer ' + token
                }
            })
                .then(res => res.json())
                .then(response => {
                    props.handleLoading(false);
                    if (response.errors) {
                        handleErrorArray(response.errors)
                        return;
                    }
                    if (response.success) {
                        quickAlert('Approved!', state, setState);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <div className='resource-edit'>
                <div className='left-edit'>
                    <Form
                        title='Organization Name'
                        label={title}
                        type="text"
                        changeFunction={setTitle} />
                    <br />
                    <label htmlFor='picture' >Picture</label>
                    <input
                        className='custom-form'
                        type='file'
                        name='picture'
                        onChange={handleImage} />
                    <br />
                    <img
                        src={preview === 'none' || !preview ? require('../../../images/no-image.jpg') : preview}
                        width='200px'
                        height='200px'
                        alt="Displays the resource."
                    />
                    <br />
                    <Form
                        title='Website'
                        label={website}
                        type="text"
                        changeFunction={setWebsite} />
                    <Form
                        title="Address"
                        label={address}
                        type="text"
                        changeFunction={setAddress} />
                    <br />
                    <ButtonAndDropdown
                        purpose='city'
                        text='View City'
                        setCity={setCity}
                        city={city}
                        add={true}
                    />
                    <br />
                    <Form
                        title="Phone"
                        label={phone}
                        type="text"
                        changeFunction={setPhone} />
                    <br />
                    <Dynamic
                        handleDynamic={setDynamicData}
                        dynamicData={dynamicData}
                    />
                </div>
                <div className='right-edit'>
                    <p>Services</p>
                    <br />
                    <ButtonAndDropdown
                        purpose='services'
                        text='View Services'
                        setServices={setServices}
                        services={services}
                        add={true}
                        {...props}
                    />
                    <br />
                    <br />
                </div>
                <React.Fragment>
                    {props.register ?
                        <p>
                            <label>Or select from existing....</label>
                            <SelectResource handleResource={setAffiliation} />
                        </p>
                        : null}
                </React.Fragment>
                <br />
            </div>
            <CustomButton handleClick={handleSubmit} text={'Submit!'} />
            <br />
        </React.Fragment>
    )
}

export default withRouter(NewEditResource)