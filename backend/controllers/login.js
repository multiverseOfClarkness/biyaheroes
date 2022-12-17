require('dotenv').config()
const path = require ('path')
const bcryptjs =require('bcryptjs')
const adminUsers = require('../models/adminUsers.js')
const commonUsers = require('../models/users.js')
const jwt = require('jsonwebtoken')
const { rmSync } = require('fs')



const getLoginForm = (req, res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'index.html'))
}

const login = async (req, res) => {
    //Authenticate user
    try {
        const body = await req.body
        
        let role = body.role
        let email = body.email
        let password = body.password
        
        
        const admin = await adminUsers.findOne({email:email})
        const isMatchAdmin = await bcryptjs.compare(password, admin.password)
        
        
        if(admin){
            if(isMatchAdmin){
                res.send('nice')
            }
        }

        
        
    }catch (error){
        res.send(error.message)
    }
    
    try {
        const body = await req.body
        
        let role = body.role
        let email = body.email
        let password = body.password
        
        const users = await commonUsers.findOne({email:email})
        const isMatchUser = await bcryptjs.compare(password, users.verifiedpass)

        if(users){
            if(isMatchUser){
                res.send('nice user')
            }
        }


    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {
    getLoginForm,
    login
}

