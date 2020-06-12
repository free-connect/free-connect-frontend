const Resource = require('../models/resources');
const { validationResult } = require('express-validator');
const fileHelper = require('../util/file')

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

exports.getResources = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    let totalRes;
    const perPage = 4;
    Resource
        .find()
        .countDocuments()
        .then(count => {
            totalRes = count;
            const city = req.query.city || '';
            const services = req.query.services.split(',') || [];
            return Resource
                .find(city ? { city: city } : null)
                .then(resources => {
                    let sorted = [];
                    if (services[0]) {
                        sorted = resources.sort((a, b) => {
                            return compare(services, b.services) - compare(services, a.services)
                        })
                    } else {
                        sorted = resources
                    }
                    sorted = sorted.splice((currentPage -1)*perPage, perPage)
                    return sorted
                })
        })
        .then(sortedResources => {
            res.json({
                resources : sortedResources, 
                totalRes: totalRes
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getRegisterResources = (req, res, next) => {
    //this 'GET' ensures that if someone is registering, 
    //we don't need to send back all the data, just a list of names and id
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
                fileHelper.deleteFile(resource.url)
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
    const idToDelete = req.body.id;
    //delete local image file
    Resource
        .findById(idToDelete)
        .then(resource => {
            fileHelper.deleteFile(resource.url)
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
    //delete resource itself
    return Resource
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