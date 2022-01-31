import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Auth } from './auth.model'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
@Injectable()
export class AuthService {
  products: Auth[] = []

  constructor(@InjectModel('Auth') private readonly authModel: Model<any>) {}

  async signin(email, pass) {
    try {
      // const getUser = await read.getUserLogin(req)
      try {
        let userExist = await this.authModel.findOne({ email: email })
        console.log('user exist', userExist)
        if (!userExist) {
          return 'User Doesnot Exist'
        }
        if (!bcrypt.compareSync(pass, userExist.hash)) return 'Wrong Password'
        // const newUser = new this.authModel({ email, pass });
        const token = jwt.sign({ email: userExist.email }, 'secret', {
          expiresIn: '1h',
        })
        userExist = {
          _id: userExist._id,
          name: userExist.name,
          email: userExist.email,
          hash: userExist.hash,
          token: token,
        }
        return {userExist, statusCode : 200 }
      } catch (error) {
        throw [404, error.message]
      }
    } catch (error) {
      console.log(error)
      throw [404, error.message]
    }
  }

  async signup(req) {
    console.log(req, 'requesttttt')
    try {
      // console.log("signup 2")
      const uniqueMail = await this.authModel.findOne({ email: req.email })
      console.log(uniqueMail)
      if (!uniqueMail) {
        console.log('inside if')
        req.hash = bcrypt.hashSync(req.password, 8)
        console.log(req, 'reqqq4')
        delete req.password

        // console.log(req,"req222")
        const newUser = new this.authModel(req)
        console.log('new user', newUser)
        const user = await this.authModel.create(newUser)
        // const signupDetails = user
        return user
      } else {
        console.log('inside else')
        return 'User Already Exist'
      }
    } catch (error) {
      console.log(error)
      throw [404, error.message]
    }
  }
}
