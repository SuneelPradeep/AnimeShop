
const Productsmodel = require('../models/product')
const singleproductModel = require('../models/singleproduct')

const getAllProducts = async(req,res) =>{
    const {_id ,company,name,featured,sort ,select } = req.query
    const reqObject = {}
if(company){
    reqObject.company =  { $regex : company , $options : "i"}
}
if(name){
    reqObject.name = { $regex : name , $options : "i"}  // mongodb atlas regex makes the i mean case insensitive so gets all records which have the search text no strict search
}
if(featured){
    reqObject.featured = featured
}
let apiData= {};

if(sort){
    let sortFix = sort.replace(",", " ")  // coz when query entered in browser no space but comma used
     apiData = apiData.sort(sortFix)
} 
if(select){
    //let selectFix = select.replace(",", " ")   
   let selectFix = select.split(",").join(" ")     // coz when query entered in browser no space but comma used
    apiData = apiData.select(selectFix)
}
apiData = Productsmodel.find(reqObject)
 let page = Number(req.query.page) || 1 ;
let limit = Number(req.query.limit) || 10;
let skip = (page-1)*limit;
//  if(page ||limit ){
    apiData = apiData.skip(skip).limit(limit)
//  }
 
if(_id) {
    if(_id !==undefined || _id !==null) {
        apiData = await Productsmodel.findById(_id);}
    }

const Products = await apiData  // req.query

    //res.status(200).json({...Products, nbHits: Products.length })   //"msg:" yes getting all products"
res.status(200).json(Products)
}

// const getSingleProducts = async(req,res)=>{
//     const {_id ,company,name,featured,sort ,select } = req.query
//    
//     let reqObject = {}
//     if(company){
//         reqObject.company =  { $regex : company , $options : "i"}
//     }
//     if(name){
//         reqObject.name = { $regex : name , $options : "i"}  // mongodb atlas regex makes the i mean case insensitive so gets all records which have the search text no strict search
//     }
//     if(featured){
//         reqObject.featured = featured
//     }
   
//    
//      let apiData = singleproductModel.find(reqObject)
    
//      if(sort){
//         let sortFix = sort.replace(",", " ")  // coz when query entered in browser no space but comma used
//          apiData = apiData.sort(sortFix)
//     } 
//     if(select){
//         //let selectFix = select.replace(",", " ")   
//        let selectFix = select.split(",").join(" ")     // coz when query entered in browser no space but comma used
//         apiData = apiData.select(selectFix)
//     }
//     if(_id) {
//  if(_id !==undefined || _id !==null) {
//     apiData = await singleproductModel.findById(_id);}
//     }
    
//    
//     const SingleProducts = await apiData
//     res.status(200).json(SingleProducts)  

// }
const getAllProductsTest = async(req,res) =>{
   
   let apiData = singleproductModel.find()
    const Products = await apiData  // req.query

    res.status(200).json(Products)
    // res.status(200).json(req.query).sort("name").select('name company').skip(2)
    
    
    //-name for desc and name for asc ,we can use two fields to asc one and desc other too
    //sort("-price")
    // skip(2) makes the top 2 records hide or go away
}



module.exports = {getAllProducts,getAllProductsTest}