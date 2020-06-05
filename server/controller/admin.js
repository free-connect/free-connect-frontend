const Resource = require('../models/resources');
const { validationResult } = require('express-validator')

exports.getResources = (req, res, next) => {
    //first check confirms a search was initiated to narrow down the city
    if (req.query.city) {
        const city = req.query.city;
        return Resource
                .find({city: city})
                .then(resources => {
                    res.json(resources)
                })
                .catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500
                    }
                    next(err)
                })
    //second check confirms that if someone is registering, 
    //we don't need to send back all the data, just a list of names and id
    } else if (req.query.register) {
        return Resource
            .find()
            .then((resource) => {
                let newResource = resource.map(a => {
                    return {
                    title: a.title, 
                    _id: a._id
                    }
                })
                res.json(newResource)
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500
                }
                next(err)
            })
    }  
    //if those conditions aren't met, we'll gather every resource and send it back         
    return Resource
        .find()
        .then(resources => {
            res.json(resources)
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.postAddResource = (req, res, next) => {
    const {title, address, phone, services, website, city} = req.body;
    //arrays are sent as strings, this section encodes data as an array
    const newServices = services.split(',');
    const errors = validationResult(req);
    //this section handles the image file. If there is none, it sends this error
    if (!req.file) {
        return res.json({
            errors: 'No image provided or did not load properly! Try again'
        })
    }
    //this handles the validation errors
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        })
    }
    //this section sanitizes some data
    const imageUrl = req.file.path.replace('\\', '/');
    let newTitle = title.split(/\s+/).map(a => a[0].toUpperCase()+a.substring(1)).join(' ');
    let newPhone = phone.split(/\D+/gi).join('').trim()
    const resource = new Resource({
        title: newTitle,
        address: address,
        phone: newPhone,
        url: imageUrl,
        website: website,
        services: newServices,
        city: city
    })
    resource
        .save()
        .then(data => {
            res.json({
                success: true,
                affiliation: data._id
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
} 

exports.postEditResource = (req, res, next) => {
    const {title, address, phone, services, website, id, city} = req.body;
    //arrays are sent as strings in multiform data (will troubleshoot later), this section encodes data as an array
    const newServices = services.split(',');
    const errors = validationResult(req);
    const url = req.file;
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        })
    }
    let newTitle = title.split(/\s+/).map(a => a[0].toUpperCase()+a.substring(1)).join(' ');
    let newPhone = phone.split(/\D+/gi).join('').trim()
    Resource
        .findById(id)
        .then(resource => {
            resource.title = newTitle;
            resource.address = address;
            //only edits the image if a new file was sent
            if (url) {
                resource.url = url.path;
            }
            resource.services = newServices;
            resource.phone = newPhone;
            resource.website = website;
            resource.city = city;
            return resource.save()
        })
        .then(() => {
            res.json({
                success: true
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
} 

exports.postDeleteResource = (req, res, next) => {
    const idToDelete = req.body.id
    Resource
        .findByIdAndRemove(idToDelete)
        .then(() => {
            res.json({
                success: true
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}