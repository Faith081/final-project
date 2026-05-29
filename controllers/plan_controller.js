const {createPlan, getAllPlan} = require("../services/plan_services")

const newPlanCreated = async (req, res) =>{
    try {
        
        const {name, description, coveration, plan, duration, price, createdBy} = req.body
        const planCreate = await createPlan({name, description, coveration, plan, duration, price, createdBy})

        res.status(201).json({
            success:true,
            message:"Plan created successfully",
            data: planCreate
        })

    } catch (error) {
        res.status(500).json({message:error.message})
    }
    

}

const getPlan = async (req, res) =>{
    try {

         const plan = await getAllPlan()

       res.status(200).json({message:"retrieved successfully", data : plan})
        
    } catch (error) {
         res.status(500).json({message:error.message})
    }
   
}



module.exports = {newPlanCreated, getPlan}