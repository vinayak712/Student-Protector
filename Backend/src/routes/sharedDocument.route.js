import express from 'express';
import { getAllDocuments, uploadDocument, upload } from '../controllers/sharedDocument.controller.js';

const router = express.Router();

// Get all shared documents (no authentication required)
router.get('/', getAllDocuments);

// Upload new shared document (no authentication required)
router.post('/', upload.single('file'), uploadDocument);

export default router;