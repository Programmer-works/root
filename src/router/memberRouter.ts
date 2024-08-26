import express from 'express';
import upload from '../middleware/membercloud'
import MemberController from '../controller/memberController';

const router = express.Router();

router.post('/', upload.single('memberImage'), MemberController.createMember);
router.get('/', MemberController.getAllMember);
router.get('/:id',MemberController.getOneMember);
router.delete('/:id', MemberController.deleteMember);
router.delete('/', MemberController.deleteMembers);
router.put('/:id', MemberController.updateMember);

export default router;

