import express from 'express';
import upload from '../middleware/membercloud.ts'
import MemberController from '../controller/memberController.ts';

const router = express.Router();

router.post('/', upload.single('memberImage'), MemberController.createMember);
router.get('/', MemberController.getAllMember);
router.get('/:id',MemberController.getOneMember);
router.delete('/:id', MemberController.deleteMember);
router.delete('/', MemberController.deleteMembers);
router.put('/:id', MemberController.updateMember);
router.post('/login',MemberController.Login)

export default router;

