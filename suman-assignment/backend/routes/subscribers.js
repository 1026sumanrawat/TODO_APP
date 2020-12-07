const express = require('express')
const subscriber = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')

/**
* @apiType GET
* @apiPath /
* @apiBody {"titleOfTask": "Lecture","description" : "On onday every week"}
* @apiDescription Get all Subscribers
* @apiResponse subscribers
*/
router.get('/', async (req, res) => {
    console.log(req)
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }
    catch (err) {

        res.status(500).json({ message : err.message})
    }

})



/**
* @apiType GET
* @apiPath /:id
* @apiDescription Get one Subscribers
* @apiResponse subscriber
*/
router.get('/:id', getSubscriber, (req, res) => {

    res.send(res.subscriber)
    

})

/**
* @apiType POST
* @apiPath /
* @apiBody {"titleOfTask": "Lecture","description" : "On onday every week"}
* @apiDescription Create Subscriber
* @apiResponse subscribers
*/
router.post('/', async  (req, res) => {
    // console.log(req.body)
    const subscriber = new Subscriber({

        // id : req.body.id,
        titleOfTask: req.body.titleOfTask,
        description : req.body.description,
        dueDate: req.body.dueDate
        // createdDate : req.body.createdDate,
        // lastModifiedDate: req.body.lastModifiedDate
    
    })
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)

    } catch(err) {
        res.status(400).json({message: err.message })

    }

})

/**
* @apiType PATCH
* @apiPath /
* @apiBody {"titleOfTask": "Lecture","description" : "On onday every week"}
* @apiDescription Update Subscribers
* @apiResponse Updated subscribers
*/
router.patch('/:id', getSubscriber, async(req, res) => {

    if (req.body.titleOfTask != null){
        res.subscriber.titleOfTask = req.body.titleOfTask
    }
    if (req.body.description != null){
        res.subscriber.description = req.body.description
    }
    res.subscriber.todo_completed = req.body.todo_completed
    try{
        console.log("gere",req.body)
        const updatedTask = await res.subscriber.save()
        res.json(updatedTask)

    }
    catch(err){
        res.status(400).json({message: err.message })
    }
})
/**
* @apiType DELETE
* @apiPath /:id
* @apiDescription Delete Subscribers
* @apiResponse {message: "Task Deleted"}
*/
router.delete('/:id',getSubscriber, async(req, res) => {
    // res.subscriber
    try{
        await res.subscriber.remove()
        res.json({message: "Task Deleted"})

    }catch(err){
        res.status(500).json({message: err.message})

    }
    
})

async function getSubscriber(req, res, next) {

    try{
        subscriber1 = await Subscriber.findById(req.params.id)
        if ( subscriber1 == null ){
            return res.status(404).json({ message: 'Cannot Find Task'})
        }
    }
    catch(err) {
        res.status(500).json({ message: err.message})
    }
    res.subscriber = subscriber1
    next()
}

module.exports = router