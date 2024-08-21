import Ajency from "../models/Ajency.js";
export const createAjency = async (req, res) => {
  try {
    const newAjency = new Ajency(req.body);
    const savedAjency = await newAjency.save();
    
    res.status(200).json({ success: true, message: 'Ajency successfully created', data: savedAjency });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create Ajency', error: err.message });
  }
};

//update Ajency
export const updateAjency=async(req,res)=>{
  const { id } = req.params;
  try {
    const updatedAjency = await Ajency.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAjency) {
      return res.status(404).json({ success: false, message: 'Ajency not found' });
    }
    res.status(200).json({ success: true, message: 'Ajency successfully updated', data: updatedAjency });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update Ajency', error: err.message });
  }
}

//delete Ajency
export const deleteAjency=async(req,res)=>{
  const { id } = req.params;
  try {
    const deletedAjency = await Ajency.findByIdAndDelete(id);
    if (!deletedAjency) {
      return res.status(404).json({ success: false, message: 'Ajency not found' });
    }
    res.status(200).json({ success: true, message: 'Ajency successfully deleted', data: deletedAjency });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete Ajency', error: err.message });
  }
}

//getSingle Ajency
export const getSingleAjency=async(req,res)=>{
  const { id } = req.params;
  try {
    const ajency = await Ajency.findById(id);
    // console.log(Ajency);
    if (!Ajency) {
      return res.status(404).json({ success: false, message: 'Ajency not found' });
    }
    res.status(200).json({ success: true, data: ajency });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch Ajency', error: err.message });
  }
}

//getALL Ajency
export const getAllAjency=async(req,res)=>{
  //for pagination
  const page=parseInt(req.query.page);
  try {
    const Ajencys = await Ajency.find({})
    .skip(page*8)
    .limit(8);
    res.status(200).json({ success: true,count:Ajencys.length, data: Ajencys });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch Ajencys', error: err.message });
  }
}

//get by search
export const getAjencyBySearch = async (req, res) => {
    // Assuming you pass the search criteria in the request query parameters
    const { city, distance, maxGroupSize } = req.query;
  
    // Construct a filter object based on the provided search criteria
    const filter = {};
    if (city) {
      filter.city = city;
    }
    if (distance) {
      filter.distance = { $lte: parseInt(distance) };
    }
    if (maxGroupSize) {
      filter.maxGroupSize = { $lte: parseInt(maxGroupSize) };
    }
   
    try {
      // Use the filter object to find Ajencys that match the search criteria
      const Ajencys = await Ajency.find(filter);
  
      res.status(200).json({ success: true, data: Ajencys });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch Ajencys based on search', error: err.message });
    }
  };

  
//get featured Ajency
export const getFeaturedAjency=async(req,res)=>{
 
  try {
      const ajencys = await Ajency.find({featured:true}).limit(8);
      res.status(200).json({ success: true, data: ajencys });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch Ajencys', error: err.message });
    }
}

//get Ajency conut
export const getAjencyCount=async(req,res)=>{
  try {
    const AjencyCount=await Ajency.estimatedDocumentCount()
    res.status(200).json({success:true,data:AjencyCount})
  } catch (err) {
    res.status(500).json({success:false, message:"Failed to fetch"});
    
  }
}