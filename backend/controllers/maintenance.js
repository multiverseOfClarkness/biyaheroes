const items = require('../models/itemTypes')
const violationTypes = require('../models/violationTypes')
const violationTypesArchived = require('../models/violationTypesArchived')
const itemsArchived = require('../models/itemTypesArchived')
const logs = require('../models/logs')
const jwtdecode = require("jwt-decode");
const admin = require('../models/adminUsers')



const getMaintenancePage = (req, res) => {
    items.find((err, data) => {
        violationTypes.find((err, result) => {
            res.render('maintenance', {
                itemList : data,
                violationTypesList : result

            })
        })
    })
}

const addViolationType = async (req, res) => {
    const body = req.body
    const violationName = body.violation
    const currentUser = await admin.findOne({
        email: jwtdecode(req.cookies.token).email,
    });
    try {
        
        logs.create({
            author: `${currentUser.fname} ${currentUser.lname}`,
            section: 'Super admin / maintenance',
            action: 'Added violation type.',
            userID: `${currentUser.id}`
        })

        const newViolation = new violationTypes({
            violation : violationName
        });
    
        await newViolation.save()
        res.redirect('/SA/maintenance')
    } catch (error) {
        console.log(error)
    }
    

} 

const deleteViolationType = async (req, res) => {
    const currentUser = await admin.findOne({
        email: jwtdecode(req.cookies.token).email,
    });
    const thisViolation = await violationTypes.findByIdAndUpdate(req.params.id, {status: "Archived"}, {new: true});

    const archived = new violationTypesArchived ({
    id: thisViolation.id,
    violation: thisViolation.violation,
    status: thisViolation.status

    })

    await violationTypes.deleteOne(thisViolation)
    await archived.save()

    logs.create({
        author: `${currentUser.fname} ${currentUser.lname}`,
        section: 'Super admin / maintenance',
        action: 'Delete violation type.',
        userID: `${currentUser.id}`
    })
    res.redirect("/SA/maintenance");
}

const addItemType = async (req, res) => {
    const body = req.body
    const itemName = body.item

    try {
        const currentUser = await admin.findOne({
            email: jwtdecode(req.cookies.token).email,
        });
        const newItem = new items({
            item : itemName
        });
        logs.create({
            author: `${currentUser.fname} ${currentUser.lname}`,
            section: 'Super admin / maintenance',
            action: 'Added item type.',
            userID: `${currentUser.id}`
        })
        await newItem.save()
        res.redirect('/SA/maintenance')
    } catch (error) {
        console.log(error)
    }
}

const deleteItemType = async (req, res) => {
    const thisItem = await items.findByIdAndUpdate(req.params.id, {status: "Archived"}, {new: true});
    const currentUser = await admin.findOne({
        email: jwtdecode(req.cookies.token).email,
    });
    const archived = new itemsArchived({
    id: thisItem.id,
    item: thisItem.item,
    status: thisItem.status

    })

    await items.deleteOne(thisItem)
    await archived.save()
    logs.create({
        author: `${currentUser.fname} ${currentUser.lname}`,
        section: 'Super admin / maintenance',
        action: 'Delete item type.',
        userID: `${currentUser.id}`
    })
    res.redirect("/SA/maintenance");
}


module.exports = {
    getMaintenancePage,
    addViolationType,
    deleteViolationType,
    addItemType,
    deleteItemType
}