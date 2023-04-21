const Inventory = require('../models/inventoryModel');
const Product = require('../models/productModel');

const inventoryController = {
    updateInventory : async (req, res) =>{
        const {productId, stock} = req.body
        try {

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }

            // Find the inventory for the given product
            let inventory = await Inventory.findOne({ product: productId });
            if (!inventory) {
                return res.status(404).json({
                  msg: "Inventory not found"
                });
            }
            // checking inventory is not negative
            if (inventory.quantity + stock < 0) {
                return res.status(400).json({
                  msg: "Invalid stock value. Cannot reduce quantity below 0.",
                });
            }

            // Update existing inventory with check stock is not negative value
            if (stock < 0) {
                return res.status(400).json({ msg: "Stock quantity cannot be negative" });
            }else{
                 // Update existing inventory
                inventory.quantity += stock;
            }
           

            // Save the updated inventory
            await inventory.save();

            res.json({ msg: "Inventory updated successfully", data: inventory });    

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Server error' });
        }
        

    }
}
module.exports = inventoryController