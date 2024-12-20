import { PrismaClient, UserRole, type User,type ScrapProduct } from '@prisma/client'
import { logError } from '../utils/GenericErrorResponse'
import { logger, LogType } from '../utils/logger'

const prisma = new PrismaClient()

export const createUser = async (data: {
  username: string
  email: string
  password: string
  roles?: UserRole[]
  checkpointId: number
}) => {
  try {
    const { username, email, password, roles } = data

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        roles,
        checkpointId: data.checkpointId
      }
    })
    return newUser
  } catch (err) {
    logError(err)
    throw err
  }
}

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email
    }
  })
}

export const findUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      username
    }
  })
}

export const findUserById = async (id: number) : Promise<User | null>=> {
  return await prisma.user.findUnique({
    where: {
      id
    }
  })
}

export const deletePushToken = async (id: number, pushToken : string)=> {
  try {
    const user : any  =  findUserById(id);

    if(!user) {
      logger(LogType.ERROR,`User with ${id} Id Not found`);
      throw new Error("No User with given id was found");
    }

    await prisma.user.update({
      where : {
        id
      },
      data : {
        pushTokens : user.pushTokens.filter((token : string)=>token!=pushToken)
      }
    })
  }catch (err) {
    logError(err);
    throw err;
  }
}

export const findUsersByCheckpoint = async (checkpointId: number) => {
  return await prisma.user.findMany({
    where: {
      checkpointId: checkpointId
    }
  })
}

export const updateUserData = async (user: any) => {
  if (!user.id) {
    logError("Id not Provided");
    throw new Error('Id not provided')
  }
  const obj: any = {}

  for (let key in user) {
    if (key == 'id') continue
    if (key == 'roles') {
      obj[key] = [UserRole.REGULAR_USER, ...(user.roles ?? [])]
      continue
    }
    obj[key] = user[key]
  }

  try {
    const updatedUser =  await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        ...obj
      }
    })

    return updatedUser;
  } catch (err) {
    logError(err)
    throw err
  }
}

export const saveProduct = async (data : {
  userId : number,
  name : string,
  price : number
}) => {
  try {
    const product = await prisma.scrapProduct.create({
       data : {
        name : data.name,
        price : data.price,
        userId : data.userId
       }
    })

    return product;
  }catch(err) {
    logError(err);
    throw err
  }
}


const findAllProductsByUserId = async (userId : number) : Promise<ScrapProduct[]> => {
  try {
    const user = await prisma.user.findUnique({
      where : {
        id : userId
      }
    })

    if(!user) {
      logger(LogType.ERROR,`User with ${userId} Not found`);
      throw new Error("User with given id not found");
    }

    const products = await prisma.scrapProduct.findMany({
      where : {
        userId 
      }
    })
    return products;
  }catch(err) {
    logError(err);
    throw err
  }
} 

export default {
  saveProduct,
  findAllProductsByUserId
}