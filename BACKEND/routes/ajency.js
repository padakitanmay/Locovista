import express from 'express';
import {
    createAjency,
    updateAjency,
    deleteAjency,
    getSingleAjency,
    getAllAjency,
    getAjencyBySearch,
    getFeaturedAjency,
    getAjencyCount,
} from '../controller/ajencyController.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router();

router.post('/',verifyAdmin, createAjency);

router.put('/:id',verifyAdmin, updateAjency);

router.delete('/:id',verifyAdmin, deleteAjency);

router.get('/:id', getSingleAjency);

router.get('/', getAllAjency);

// router.get('/search/getAjencyBySearch', getAjencyBySearch);

router.get('/search/getFeaturedAjencys', getFeaturedAjency);

// router.get('/search/getAjencyCount', getAjencyCount);

export default router;
