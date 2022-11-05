const Steps = require('../models/steps');
const shortid = require('shortid');
const NodeCache = require( "node-cache" );
const { generate } = require('shortid');
const map = require('../helper');
const myCache = new NodeCache( { checkperiod: 0 } );


const getSteps = async (req, res) => {
    try{
        let steps = Steps.find({ user: req.user.uid })
       console.log(steps)
        if (steps) {
            res.status(200).send({ "totalSteps": parseInt(steps.totalSteps), })
        } else {
            res.status(404).send({ "error": "User doesn't exist" })
        }
    } catch(err){
        return res.status(500).json({'message': err.message});    
    }

}

const updateHandler = async (message, userId) =>{
    try{
        let obj = { steps: message.newSteps, startDate: message.startDate }
        let value = myCache.get( userId );
        if(value){
            obj.steps += value.steps 
            success = myCache.set( userId, obj);
        }else{
            success = myCache.set( userId, obj);
        }
    
    }catch(err){
        console.log(err)
    }
    return true
}

const insertHandler = async (userId) =>{
    try{
        if(myCache.has( userId )){
            let value = myCache.get( userId );
            const newSteps = new Steps();
            newSteps.totalSteps = value.steps
            newSteps.startDate = value.startDate
            newSteps.endDate = new Date()
            newSteps.user = userId
            newSteps.uid = shortid.generate();
            await newSteps.save()
            myCache.del( userId )
        }
    }catch(err){
        console.log(err)
    }
    return true

}


module.exports = {
    updateHandler,
    insertHandler,
    getSteps
}