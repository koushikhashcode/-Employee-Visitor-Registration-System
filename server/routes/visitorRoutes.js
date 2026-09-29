import { Router } from 'express';
import {
  getVisitors,
  getVisitorById,
  createVisitor,
  updateVisitor,
  deleteVisitor,
  getTodayStats,
  exportVisitorsCSV,
} from '../controllers/visitorController.js';
import { validateVisitorInput } from '../middleware/validator.js';

const router = Router();

// Stats and Export routes (specified before /:id parameter)
router.get('/stats/today', getTodayStats);
router.get('/export/csv', exportVisitorsCSV);

// Standard Visitor CRUD
router.route('/')
  .get(getVisitors)
  .post(validateVisitorInput, createVisitor);

router.route('/:id')
  .get(getVisitorById)
  .put(validateVisitorInput, updateVisitor)
  .delete(deleteVisitor);

export default router;
