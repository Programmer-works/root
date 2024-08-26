import express,{Router} from "express"
import memberRoutes from "../router/memberRouter.ts"


const router:Router=express.Router()

router.use('/member',memberRoutes)

export default router