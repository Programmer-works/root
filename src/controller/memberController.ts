import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import cloudinary from '../utilies/cloudinary';
import Member from '../modal/member';
import { successmessage } from '../utilies/successmessage';
import { errormessage } from '../utilies/errormessage';
import { tokenmessage } from '../utilies/tokenmessage'; // Ensure this is used somewhere or remove it if unnecessary

class MemberController {
    public static async createMember(req: Request, res: Response): Promise<void> {
        try {
            const { userName, email, course, password, role } = req.body;
    
            if (!req.file) {
                return errormessage(res, 400, 'Please upload an image');
            }
    
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'member'
            });
    
            const hashedPassword = bcrypt.hashSync(password, 10);
    
            const member = await Member.create({
                memberImage: {
                    public_id: result.public_id,
                    url: result.secure_url,
                },
                userName,
                email,
                course,
                password: hashedPassword, // Store the hashed password
                role
            });
    
            if (!member) {
                return errormessage(res, 401, 'Failed to create member');
            }
    
            return successmessage(res, 201, 'Member created successfully', member);
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, 'Internal server error');
        }
    }
    

    public static async getAllMember(req: Request, res: Response): Promise<void> {
        try {
            const members = await Member.find();
            if (members.length > 0) {
                return successmessage(res, 200, 'All members retrieved', members);
            } else {
                return errormessage(res, 404, 'No members found');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, 'Internal server error');
        }
    }

    public static async getOneMember(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const member = await Member.findById(id);
            if (member) {
                return successmessage(res, 200, 'Member data retrieved successfully', member);
            } else {
                return errormessage(res, 404, 'No data found');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, 'Internal server error');
        }
    }

    public static async deleteMembers(req: Request, res: Response): Promise<void> {
        try {
            const result = await Member.deleteMany();
            if (result.deletedCount > 0) {
                return successmessage(res, 200, 'All members deleted successfully', result);
            } else {
                return errormessage(res, 404, 'No members found to delete');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, 'Internal server error');
        }
    }

    public static async deleteMember(req: Request, res: Response): Promise<void> {
        try {
            const memberId = req.params.id;
            const member = await Member.findByIdAndDelete(memberId);
            if (member) {
                return successmessage(res, 200, 'Member deleted successfully', member);
            } else {
                return errormessage(res, 404, `Member not found with ID ${memberId}`);
            }
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, 'Internal server error');
        }
    }

    public static async updateMember(req: Request, res: Response): Promise<void> {
        try {
            const memberId = req.params.id;
            const updatedMember = await Member.findByIdAndUpdate(memberId, req.body, { new: true });
            if (updatedMember) {
                return successmessage(res, 200, 'Member successfully updated', updatedMember);
            } else {
                return errormessage(res, 404, 'Member not found');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, 'Internal server error');
        }
    }
    
    public static async Login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
 
            if (!email || !password) {
                return errormessage(res, 400, 'Email and password are required');
            }
    
            const user = await Member.findOne({ email });

    
            if (!user) {
                return errormessage(res, 401, 'Incorrect Email');
            }

    
            const passwordMatch =bcrypt.compare(password, user.password);
    
            if (!passwordMatch) {
                return errormessage(res, 401, 'Incorrect Password');
            }
            const secretkey = process.env.SECRET_KEY || 'franklin'; 
            const token = Jwt.sign({ user: user }, secretkey, { expiresIn: '1d' });
    
            res.status(200).json({
                token: token,
                data: {
                    datas: user
                }
            });
    
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, `Error: ${error}`);
        }
    }
    
    
    
    
}

export default MemberController;
