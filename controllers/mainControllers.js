const asyncHandler = require('express-async-handler')


//FETCH DATA 
let data = 
    [
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "12 Fevrier",
            orateur_id: 1
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id: 2
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id: 3
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id: 4
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id: 5
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id : 6
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id: 7
    
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id: 8
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id : 9
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id: 10
    
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id : 11
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id: 12
    
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id: 13
    
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id : 14
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id: 15
    
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id: 16
    
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id : 17
        },
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
            orateur_id: 18
    
        }
    ]


//HOME VIEW 
const Home = asyncHandler(async(req, res)=>{

    //Stringify data
    const json_data = JSON.stringify(data)

    //Get dates from data 
    let dates = [] 
    data.map((d, index)=> {
        dates.push(d.date)
    })

    res.render('home', {json_data, dates})
})



//FORM SUBMISSION 
const Ajouter = asyncHandler(async(req, res)=>{

    //Get Form data
    const {name, theme, date} = req.body

    //Check name

    //Check date

    //Add in DB 
    console.log(req.body)
    //Feedback to view 
    res.send("success")

})



//FORM EDITION
const Editer = asyncHandler(async(req, res)=>{

    //Get Form data
    const {modal_name, modal_theme, modal_date} = req.body

    //Check name

    //Check date

    //Add in DB 

    console.log(req.body)
    //Feedback to view 
    res.send("Modal success")

})



//EXPORT TO MAIN-ROUTES
module.exports = {Home, Ajouter, Editer}