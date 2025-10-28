const addProduct = async(req,res)=>{
    try{
        const {name,price,category,subCategory,bestSeller,date} = req.body;
        const image1 = req.files.image1[0];
        res.status(201).json({message:"product added successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

const listProduct = async(req,res)=>{
    
}

const removeProduct = async(req,res)=>{
    
}


const singleProduct = async(req,res)=>{
    
}

export {singleProduct,removeProduct,listProduct,addProduct}