// import Cat from "../modals/cats.modal.js";




// export const testCats = async (req, res, next) => {
// res.json('successfully')
// }


// export const createCat = async (req, res, next) => {
//     try {
//         console.log('Request body:', req.body);
//         const cat = await Cat.create(req.body);
//         return res.status(201).json(cat);
//     } catch (error) {
//         console.error('Error creating cat:', error);
//         return res.status(400).json({ success: false, message: error.message });
//     }
// };
import mongoose from "mongoose";
import Cat from "../modals/cats.modal.js";
import { errorHandler } from "../utils/error.js";


export const testCats = async (req, res, next) => {
    res.json('successfully');
};


export const createCat = async (req, res, next) => {
    try {
        console.log('Request body:', req.body);
        
        const userId = req.user && typeof req.user === 'object' ? req.user.id : req.user;
        console.log('User ID:', userId);

   
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        
        const catData = {
            ...req.body,
            owner: userId 
        };

        console.log('Cat data:', catData);

       
        const cat = await Cat.create(catData);
        return res.status(201).json(cat);
    } catch (error) {
        console.error('Error creating cat:', error);
        return res.status(400).json({ success: false, message: error.message });
    }
};


export const getAllCats = async (req, res, next) => {
    try {
        const cats = await Cat.find().populate('owner', 'username email'); 
        return res.status(200).json(cats);
    } catch (error) {
        console.error('Error fetching cats:', error);
        return res.status(400).json({ success: false, message: error.message });
    }
};


export const getOneCat = async (req, res, next) => {
    try {
        const catId = req.params.id; 
        const cat = await Cat.findById(catId).populate('owner', 'username email'); 

        if (!cat) {
            return res.status(404).json({ success: false, message: 'Cat not found' });
        }

        return res.status(200).json(cat);
    } catch (error) {
        console.error('Error fetching cat:', error);
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const editCat = async (req, res) => {
 
    try {
        const updatedCat = await Cat.findByIdAndUpdate(
            req.params.catId,
            req.body,
            { new: true }
        );
    

        if (!updatedCat) {
            return res.status(404).json({ message: 'Cat not found' });
        }

        res.json(updatedCat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteCat = async (req, res, next) => {
    const cat = await Cat.findById(req.params.catId);


    if (!cat) {
        return next(errorHandler(404, 'Cat not found!'));
    };

   
    if (req.user.id !== cat.owner.toString()) {
        return next(errorHandler(401, 'You can only delete your own cats!'))
    };

    try {
        await Cat.findByIdAndDelete(req.params.catId);
        res.status(200).json('Cat has been deleted.')
    } catch (error) {
        next(error)
    }

};