import { Router } from 'express'
import { CreateUserController } from '../modules/accounts/useCases/CreateUser/CreateuserController'
import { UpdateUserAvatarController } from '../modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController'

import multer from 'multer'
import uploadConfig from '../config/upload'

const userRouters = Router()
const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

userRouters.post('/', createUserController.handle)

userRouters.patch('/avatar', uploadAvatar.single("avatar"), updateUserAvatarController.handle)

export { userRouters }