const express = require('express');
const miniWebsiteController = require('../controllers/miniWebsiteController');
const verifyToken = require('../middleware/tokenVerify');
const router = express.Router();
const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 20 * 1024 * 1024,
        files: 30
    }
});


router.post('/create-mini-website', upload.fields([
    { name: 'logo' },
    { name: 'photoGallery' },
    { name: 'products' }
]),
    verifyToken, miniWebsiteController.createMiniWebsite)

router.put('/edit-mini-website', express.json({ limit: '50mb' }), verifyToken, miniWebsiteController.editMiniWebsite)
router.get('/mini-websites', miniWebsiteController.getMiniWebsites);
router.get('/mini-website/:params', miniWebsiteController.getMiniWebsiteByParams);
router.delete('/delete-mini-website/:params', verifyToken, miniWebsiteController.deleteMiniWebsite);
router.post('/mini-website/:params/increase-views', miniWebsiteController.increaseViews);
router.put('/update-mini-website-links/:params', miniWebsiteController.editWebsiteLinks);

module.exports = router;