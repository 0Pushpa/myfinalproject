import express from 'express';

const router = express.Router()
import {
  getAllSectorsInGroup,
  addSectorToGroup,
  deleteSectorFromGroup,
} from '../controllers/groupSector.js'

router.route('/').post(addSectorToGroup)

router.route('/:id').get(getAllSectorsInGroup).delete(deleteSectorFromGroup)

export default router;
