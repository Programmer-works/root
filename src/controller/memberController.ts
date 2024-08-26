import express,{Request,Response} from 'express'
import { successmessage } from '../utilies/successmessage'
import { errormessage } from '../utilies/errormessage'

import cloudinary from '../utilies/cloudinary'
import Member from '../modal/member'
class MemberController {
   public static async createMember(req:Request, res:Response):Promise<void>{
        try {
            const { userName,email,course,password,role} = req.body;
            
            if (!req.file) {
                return errormessage(res,400,`please upload image`)
            }
            
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'member'
            });
            
            
            const member = await Member.create({
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
                return errormessage(res,401,`Failed to create news`)
            }
            return successmessage(res,201,`member created successfully`,member)
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res,500,`internal server error`)
        }
    }
    
public static async getAllMember(req:Request,res:Response):Promise<void>{
    try {
        const member = await Member.find();
        if (member) {
            return successmessage(res,200,` all member retrived`,member)
        } else {
            return errormessage(res,401,`failed to retrived`)
        }
    } catch (error) {
        console.log(`error is :`,error)
    }
}

public static async getOneMember(req:Request,res:Response):Promise<void>{
    try {
        const id = req.params.id
        const member = await Member.findById(id)
         if (member) {
            return successmessage(res,200,`data retrived successfully`,member)
         } else {
            return errormessage(res,401,`no data found`)
         }
    } catch (error) {
        
    }
}
public static async deleteMembers(req:Request,res:Response):Promise<void>{
    try {
        const news = await Member.deleteMany();
        if(news){
            return errormessage(res,201,`member deleted successfully`)
        }else{
            return errormessage(res,401,`member not deleted`)
        }
    } catch (error) {
        
    }
}

public static async deleteMember(req:Request,res:Response):Promise<void>{
    try {
        const memberId = req.params.id
        const member = await Member.findByIdAndDelete(memberId);
        if(member){
            return errormessage(res,201,`member deleted successfully`)
        }else{
            return errormessage(res,401,`member not deleted by ${memberId}`)
        }
    } catch (error) {
        
    }
}
public static async updateMember(req:Request,res:Response):Promise<void>{
    try {
        const memberId = req.params.id
        const member = await Member.findByIdAndUpdate(memberId, req.body, {new : true})
        if(member){
            return successmessage(res,200,`news successfully updated`,member)
        }
    } catch (error) {
        
    }
}
}
export default MemberController