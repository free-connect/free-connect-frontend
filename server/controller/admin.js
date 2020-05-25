const Resource = require('../models/resources')

exports.getResources = (req, res, next) => {
    if (req.query.city) {
        const city = req.query.city
        return Resource
                .find({city: city})
                .then(resources => {
                    res.json(resources)
                })
                .catch(err => res.status(500))
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
    }           
    return Resource
        .find()
        .then(resources => {
            res.json(resources)
        })
        .catch(err => res.status(500))
}

exports.postAddResource = (req, res, next) => {
    const {title, address, phone, url, services, website, city} = req.body;
    const resource = new Resource({
        title: title,
        address: address,
        phone: phone.split(/\D+/gi).join('').trim(),
        url: url,
        website: website,
        services: services,
        city: city
    })
    resource
        .save()
        .then(data => {
            console.log('data', data)
            res.json({
                msg: true,
                affiliation: data._id
            })
        })
        .catch(err => console.log(err))
} 

exports.postEditResource = (req, res, next) => {
    const {title, address, phone, url, services, website, id, city} = req.body;
    Resource
        .findById(id)
        .then(resource => {
            resource.title = title;
            resource.address = address;
            resource.url = url;
            resource.services = services;
            resource.phone = phone;
            resource.website = website;
            resource.city = city;
            return resource.save()
        })
        .then(() => {
            res.json({
                msg: true
            })
        })
        .catch(err => console.log(err))
} 

exports.postDeleteResource = (req, res, next) => {
    const idToDelete = req.body.id
    Resource
        .findByIdAndRemove(idToDelete)
        .then(() => {
            res.json({
                msg: true
            })
        })
        .catch(err => console.log(err))
}