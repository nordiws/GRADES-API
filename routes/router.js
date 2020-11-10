import express from 'express';
import controller from '../controller/gradesController.js';

const router = express.Router();

router.get('/grade', controller.getAllGrades);
router.get('/grade/:id', controller.getGrade);
router.post('/grade', controller.createGrade);
router.patch('/grade/:id', controller.updateGrade);
router.delete('/grade:id', controller.deleteGrade);
router.delete('/grade', controller.deleteAllGrades);
router.get('/grade/name/:name', controller.findByName);

export { router as gradesRouter };
