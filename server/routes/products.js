const express = require("express");
const Product = require("../models/productSchema");
const router = express.Router();
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: fileStorage });

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { productName, description, price, rating } = req.body;
    const imageName = req.file.originalname;
    const product = new Product({
      productName,
      description,
      price,
      rating,
      imageName
    });
    const saveProduct = await product.save();
    if (saveProduct) {
      res.status(200).send("Product Added");
    }
  } catch (error) {
    console.log("Error", error);
  }
});

router.get("/get",async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).send(products)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete',async(req,res)=>{
    try {
        const {name} = req.body;
        console.log(name)
        const response = await Product.deleteOne({productName:name});
        if(response){
            res.status(200).send("Product Deleted")
        }
    } catch (error) {
       console.log(error)
    }
})

module.exports = router;
