const planSchema = require("../models/planModel")

const createPlan = async ({name, description, coveration, plan, duration, price, createdBy}) =>{

    const createdPlan = await planSchema.create({name, description, coveration, plan, duration, price, createdBy})
    return createdPlan
}


const getAllPlan = async () =>{
    const fetchPlan = await planSchema.find()
    return fetchPlan
} 


module.exports = {createPlan, getAllPlan}