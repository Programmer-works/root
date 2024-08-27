import express,{Request,Response} from 'express';
import Student from '../modal/student';
import { errormessage } from '../utilies/errormessage';
import cloudinary from '../utilies/cloudinary';
import { successmessage } from '../utilies/successmessage';


class StudentController{
    public static async create(req:Request,res:Response):Promise<void>{
try {
    const{firstName,lastName,age,sex,grade} = req.body

    if (!req.file) {
        return errormessage(res,400,`please upload file`)
    }
    
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'students'
    });

    const student = await Student.create({
        studentReport: {
            public_id: result.public_id,
            url: result.secure_url,
        },
        firstName,
        lastName,
        age,
        sex,
        grade
    })
if(student){
    return successmessage(res,201,`student created`,student)
}else{
    return errormessage(res,401,`fail to create student`)
}


} catch (error) {
    console.error('Error occurred:', error);
            return errormessage(res,500,`internal server error`)
}
    }

    public static async viewStudents(req:Request,res:Response):Promise<void>{
        try {
            const student = await Student.find()
            if(student){
                return successmessage(res,200,`all students retrived`,student)
            }
            else{
                return errormessage(res,401,`no students found`)
            }
        } catch (error) {
            
        }
    }


}
export default StudentController