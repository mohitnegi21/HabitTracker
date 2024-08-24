

import Habits from "../model/habits.js";
import Status from "../model/status.js";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";


const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

export const home = async function(req,res)
{
    

    //   //------------------
    //   try{
    //       //search all habits in Habits and enter staus for current day - last updated day habit
    //       const habit = await Habits.find();
    //       habit.forEach(async (record)=>{

    //         const staus = await Status.find({habit:record._id});
    //         staus.forEach(async(rec)=>{
    //             console.log(rec.date);
    //            let curdate = new Date();
    //            //calculate days for which entry is to be made
    //               habit = await Habits.create({
    //         name:nameValue
    //     })

            
    //     for(let i=0;i<7;i++)
    //     {
    //         let currentDate = new Date();
    //         currentDate.setDate(currentDate.getDate() - i);

    //             const month = monthNames[currentDate.getMonth()];
    //             const day = currentDate.getDate();
        
    //             const formattedDate = `${month} ${day}`;

    //         let date= await Status.create(
    //             {
    //                 date:formattedDate,
    //                 datestatus:'Not Started',
    //                 habit:habit._id
    //             }
    //         )
    //         habit.status.push(date);
            
    //     }
    //     habit.save();

    //             //const month = monthNames[currentDate.getMonth()];
    //             //const day = currentDate.getDate();
                
    //         })

    //         //console.log(staus);
    //         //console.log(record._id);
    //       })
          
    //   }catch(err){
    //         console.log(err);
    //   }

    try{

        let habits =await Habits.find({}).populate('status');

        let currentDate = new Date();

        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();

        const date = `${month} ${day}`;

        res.render('./home',{
            habits:habits,
            currdate:date
        }
        )

    }
    catch (error) {
        console.log('Error', error);
    }
    
}

export const create=async function(req,res)
{
    try {

        let nameValue = (req.body.habits?req.body.habits:req.body.custom_meal);

        let habit = await Habits.findOne({ name: nameValue });

        if (habit) {
            console.log('Habit Already Exists')
            return res.redirect('back');
        }

        habit = await Habits.create({
            name:nameValue
        })

            
        for(let i=0;i<7;i++)
        {
            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - i);

                const month = monthNames[currentDate.getMonth()];
                const day = currentDate.getDate();
        
                const formattedDate = `${month} ${day}`;

            let date= await Status.create(
                {
                    date:formattedDate,
                    datestatus:'Not Started',
                    habit:habit._id
                }
            )
            habit.status.push(date);
            
        }
        habit.save();
        
        return res.redirect('back');
    
        
    } catch (error) {
        console.log('Error', error);
    }
    
}

export const toggleStatus=async function(req,res)
{
    // console.log("toggle status clicked");
    // console.log(req.query.id)
    // console.log(req.body.habitstatus)
    try {

        let currentDate = new Date();

        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();

        const date = `${month} ${day}`;

        let status = await Status.findOne({habit:req.query.id,date:date})

        status.datestatus=req.body.habitstatus;
        status.save();

        return res.redirect('back');

    } catch (error) {
        console.log('Error', error);
    }
    
}

export const deleteHabit = async function(req,res)
{
    console.log("inside delete habit")
    try {
        let id =  new mongoose.Types.ObjectId(req.query.id)
        console.log(req.query.id)
        console.log(id);
        let habit = await Habits.findById(id);
        await habit.deleteOne();

        await Status.deleteMany({habit:id})

        res.redirect('back')
        
    } catch (error) {
        console.log('Error', error);
    }
}

export const weekView= async function(req,res)
{
    try{

        let habits =await Habits.find({}).populate('status');

        let currentDate = new Date();

        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();

        const date = `${month} ${day}`;

        res.render('./weekView',{
            habits:habits,
            currdate:date
        }
        )

    }
    catch (error) {
        console.log('Error', error);
    }
}

export const toggleStatusw=async function(req,res)
{
    try {
        // console.log(req.query.id);
        // console.log(req.body);
        // console.log(req.body.habitstatus);
        // console.log(req.query.date);
        let id =  new mongoose.Types.ObjectId(req.query.id)
        let status = await Status.findOne({habit:id,date:req.query.date})
        status.datestatus = req.body.habitstatus;
        // if(status.datestatus==='Not Started')
        // {
        //     status.datestatus='Done';
        // }
        // else if(status.datestatus==='Done')
        // {
        //     status.datestatus='Not Done';
        // }
        // else{
        //     status.datestatus='Not Started';
        // }

        status.save();

       
        return res.redirect('back');

    } catch (error) {
        console.log('Error', error);
    }
    
}