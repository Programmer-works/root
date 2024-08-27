import express,{Router} from "express"
import memberRoutes from "../router/memberRouter.ts"
import studentRouter from "../router/student.ts"


const router:Router=express.Router()

router.use('/member',memberRoutes)
router.use('/student',studentRouter)

export default router