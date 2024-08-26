"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const membercloud_1 = __importDefault(require("../middleware/membercloud"));
const memberController_1 = __importDefault(require("../controller/memberController"));
const router = express_1.default.Router();
router.post('/', membercloud_1.default.single('memberImage'), memberController_1.default.createMember);
router.get('/', memberController_1.default.getAllMember);
router.get('/:id', memberController_1.default.getOneMember);
router.delete('/:id', memberController_1.default.deleteMember);
router.delete('/', memberController_1.default.deleteMembers);
router.put('/:id', memberController_1.default.updateMember);
exports.default = router;
