const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    companyName: String,
    description: String,
    logoUrl: String,
    facebookUrl: String,
    linkedinUrl: String,
    twitterUrl: String,
    instagramUrl: String,
    address: String,
    phoneNumber: String,
    email: String,
    screenshotUrl: String,
  
   
});

const Company = mongoose.model('CompanyRecord', companySchema);

module.exports = Company;
