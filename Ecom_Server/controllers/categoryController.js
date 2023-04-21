const Category = require("../models/categoryModel")

const categoryController = {
    addCategory : async (req, res) =>{
        try {
            const { name, description } = req.body
            const category = new Category({name, description})

            await category.save()
            res.status(200).json({message: 'Category added successfully gdhdj', category})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Something went wrong'})
        }
    },
    getCategory: async (req, res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)

        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Something went wrong'})
        }
    }
}

module.exports = categoryController