import { PrismaClient,ProductCategory } from '@prisma/client'

const prisma = new PrismaClient()

export const findCheckpointByGeoSpatialCoor = async (
  latitude: number,
  longitude: number
) => {
  return await prisma.checkpoint.findFirst({
    where: {
      latitude,
      longitude
    }
  })
}



export const saveDonation = async (donation: {
  name: string
  donatorId: number
  image: string
  details: string
  location: string
  category: ProductCategory

}) => {
  return await prisma.donation.create({
    data: {
      name: donation.name,
      donatorId: donation.donatorId,
      image: donation.image,
      details: donation.details,
      location: donation.location,
      category : donation.category
    }
  })
}

export const updateDonation = async (donation : any) => {
    const id = donation.id;
    if(!id) {
      throw new Error("Donation Id Not Provided")
    }
    const obj : any = {}

    for(let key in donation) {
        if(key=="id") continue;
        obj[key] = donation[key];
    }
    return await prisma.donation.update({
    where: {
      id
    },
    data: {
        ...obj
    }
  })
}


export const deleteDonation = async (donation : {id : number}) => {
    return await prisma.donation.update({
        where : {
            id : donation.id
        },
        data : {
            isDeleted : true
        }
    })
}


export const claimDonation = async (donation : {id : number, claimerId : number})=> {
    return await prisma.donation.update({
        where : {
            id : donation.id
        },
        data : {
            claimerId : donation.claimerId
        }
    })
}



export const findAllDonations = async (donation : {category :ProductCategory }) =>{
  return await prisma.donation.findMany({
    where : {
      category: donation.category
    }
})
}
export default {
  saveDonation,
  updateDonation,
  claimDonation,
  deleteDonation,
  findAllDonations
}