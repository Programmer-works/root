"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MemberSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true
    },
    memberImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        default: new Date(Date.now()),
    },
});
const Member = mongoose_1.default.model("Member", MemberSchema);
exports.default = Member;
