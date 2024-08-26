"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const successmessage_1 = require("../utilies/successmessage");
const errormessage_1 = require("../utilies/errormessage");
const cloudinary_1 = __importDefault(require("../utilies/cloudinary"));
const member_1 = __importDefault(require("../modal/member"));
class MemberController {
    static createMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, email, course, password, role } = req.body;
                if (!req.file) {
                    return (0, errormessage_1.errormessage)(res, 400, `please upload image`);
                }
                const result = yield cloudinary_1.default.uploader.upload(req.file.path, {
                    folder: 'member'
                });
                const member = yield member_1.default.create({
                    memberImage: {
                        public_id: result.public_id,
                        url: result.secure_url,
                    },
                    userName,
                    email,
                    course,
                    password,
                    role
                });
                if (!member) {
                    return (0, errormessage_1.errormessage)(res, 401, `Failed to create news`);
                }
                return (0, successmessage_1.successmessage)(res, 201, `member created successfully`, member);
            }
            catch (error) {
                console.error('Error occurred:', error);
                return (0, errormessage_1.errormessage)(res, 500, `internal server error`);
            }
        });
    }
    static getAllMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const member = yield member_1.default.find();
                if (member) {
                    return (0, successmessage_1.successmessage)(res, 200, ` all member retrived`, member);
                }
                else {
                    return (0, errormessage_1.errormessage)(res, 401, `failed to retrived`);
                }
            }
            catch (error) {
                console.log(`error is :`, error);
            }
        });
    }
    static getOneMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const member = yield member_1.default.findById(id);
                if (member) {
                    return (0, successmessage_1.successmessage)(res, 200, `data retrived successfully`, member);
                }
                else {
                    return (0, errormessage_1.errormessage)(res, 401, `no data found`);
                }
            }
            catch (error) {
            }
        });
    }
    static deleteMembers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield member_1.default.deleteMany();
                if (news) {
                    return (0, errormessage_1.errormessage)(res, 201, `member deleted successfully`);
                }
                else {
                    return (0, errormessage_1.errormessage)(res, 401, `member not deleted`);
                }
            }
            catch (error) {
            }
        });
    }
    static deleteMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memberId = req.params.id;
                const member = yield member_1.default.findByIdAndDelete(memberId);
                if (member) {
                    return (0, errormessage_1.errormessage)(res, 201, `member deleted successfully`);
                }
                else {
                    return (0, errormessage_1.errormessage)(res, 401, `member not deleted by ${memberId}`);
                }
            }
            catch (error) {
            }
        });
    }
    static updateMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memberId = req.params.id;
                const member = yield member_1.default.findByIdAndUpdate(memberId, req.body, { new: true });
                if (member) {
                    return (0, successmessage_1.successmessage)(res, 200, `news successfully updated`, member);
                }
            }
            catch (error) {
            }
        });
    }
}
exports.default = MemberController;
