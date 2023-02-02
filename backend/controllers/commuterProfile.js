const user = require('../models/users')
const jwtdecode = require('jwt-decode')
const moment = require('moment')
const bcryptjs = require('bcryptjs')



const getCommuterProfile = async (req,res) => {
    try {
        const currentUser = await user.findOne({email: jwtdecode(req.cookies.token).email})
        const formattedDate = moment(currentUser.birthday).format('MM/DD/YYYY')
        
        user.find({_id : currentUser._id}, (err, user) => {
            res.render('commuter-profile', {
                
                userDetails : user,
                formattedDate
            } )
            
        })
    } catch (error) {
        
        res.redirect('/logout')
    }
    
}

const updateCommuterProfile = async (req, res) => {

    const currentUser = await user.findOne({email: jwtdecode(req.cookies.token).email})
    const body = req.body
    
    const reqFname = body.firstname
    const reqLname = body.lastname
    const reqBirthday = body.birthday
    const reqAddress = body.address
    const reqPhone = body.phone
    const reqEmail = body.email
    const reqCurrentPass = body.currentpass;
    const reqNewPass = body.newpass;
    const reqVerifiedPass = body.retypepass;
    
    try {
        if(reqFname || reqLname || reqAddress|| reqBirthday){
            await user.findOneAndUpdate({email: jwtdecode(req.cookies.token).email}, {fname: reqFname, lname: reqLname, address: reqAddress, birthday: reqBirthday});
            res.redirect("/commuter/profile");
        } else if (reqPhone || reqEmail) {
            await user.findOneAndUpdate({email: jwtdecode(req.cookies.token).email}, {phone: reqPhone, email: reqEmail});
            res.redirect("/commuter/profile");
        } else if (reqCurrentPass || reqNewPass ||reqVerifiedPass ) {
            const currentUser = await user.findOne({email: jwtdecode(req.cookies.token).email})

            if(currentUser) {
                const isMatchUser = await bcryptjs.compare(reqCurrentPass, currentUser.password)
                if(isMatchUser){
                    const salt = await bcryptjs.genSalt(10);
                    let verifiedNewPass = reqVerifiedPass
                    const newHashedPassword = await bcryptjs.hash(verifiedNewPass, salt)
      
                    await user.updateOne({email : currentUser.email}, {
                        password: newHashedPassword
                    })
                    getProfileAfterSuccess(req, res)
                } else {
                    getProfileAfterError(req, res)
                }
            }
        } else {
            const reqProfile = await JSON.parse(body.profile);
            await admin.updateOne({ email: currentUser.email },
            {
            profileImage: new Buffer.from(reqProfile.data, "base64"),
            profileImageType: reqProfile.type
            });
            res.redirect("/commuter/profile");
        }
    } catch (error) {   
    console.log(error)        
    }
    

}



const getProfileAfterError = async (req, res) =>{
    try {
        
        const currentUser = await user.findOne({
          email: jwtdecode(req.cookies.token).email,
        });
        const formattedDate = moment(currentUser.birthday).format('MM/DD/YYYY')
        user.find({ _id: currentUser._id }, (err, user) => {
          res.render("commuter-change-pass-error", {
            userDetails: user,
            formattedDate
          });
        });
      } catch (error) {
        console.log(error);
        //res.redirect('/logout')
      }
  }
const getProfileAfterSuccess = async (req, res) =>{
    try {
        
        const currentUser = await user.findOne({
          email: jwtdecode(req.cookies.token).email,
        });
        const formattedDate = moment(currentUser.birthday).format('MM/DD/YYYY')
        user.find({ _id: currentUser._id }, (err, user) => {
          res.render("commuter-change-pass-success", {
            userDetails: user,
            formattedDate
          });
        });
      } catch (error) {
        console.log(error);
        //res.redirect('/logout')
      }
  }


module.exports = {
    getCommuterProfile,
    updateCommuterProfile
}

