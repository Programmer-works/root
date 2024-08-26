"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'dipawi57c',
    api_key: '691624192685166',
    api_secret: 'eIFrUkZaKCMbr8ByyZCtSv4NjxQ'
});
exports.default = cloudinary_1.v2;
