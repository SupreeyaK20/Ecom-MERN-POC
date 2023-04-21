const Shipping = require("../models/shippingModel");

const shippingController = {

    addShipping : async (req, res) =>{
        try {
            const {phone, address, city, state, zipCode, country} = req.body
            const user = req.user
            console.log(user)
            if(!req.body){
                res.status(400);
                throw new Error("All fields are mandatory !");
            }

            const shippingDetails = await Shipping.create({
                name: user.username, 
                email: user.email, 
                phone, 
                address,
                city, 
                state,
                zipCode, 
                country,
                user : user.id
            })

            res.status(200).json(shippingDetails)

        } catch (error) {
            res.status(400).json({message: 'Something went wrong'})
        }
    }
    
}

module.exports = shippingController