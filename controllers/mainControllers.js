const asyncHandler = require('express-async-handler')
const path = require('path')
const mime = require('mime')
const xl = require('excel4node')

//Bring in models
const Orateur = require('../models/orateur')


//FETCH DATA 
// let data = 
//     [
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "12 Fevrier",
//             orateur_id: "1"
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id: "2"
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id: "3"
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id: "4"
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id: "5"
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id : "6"
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id: "7"
    
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id: "8"
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id : "9"
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id: "10"
    
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id : "11"
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id: "12"
    
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id: "13"
    
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id : "14"
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id: "15"
    
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id: "16"
    
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id : "17"
//         },
//         {
//             name : "Jean Pierre Francois", 
//             theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
//             date : "26 Fevrier",
//             orateur_id: "18"
    
//         }
//     ]
    

//HOME VIEW @/ [GET]
const Home = asyncHandler(async(req, res)=>{

    //Get data from DB
    const data = await Orateur.find()

    //Stringify data
    const json_data = JSON.stringify(data)

    //Get dates from data 
    let dates = [] 
    data.map((d, index)=> {
        dates.push(d.date)
    })

    res.render('home', {json_data, dates})
})



//FORM SUBMISSION @/add [POST]
const Ajouter = asyncHandler(async(req, res)=>{

    //Get Form data
    const {nom, theme, date} = req.body

    //Trim name in case
    const name  = nom.trim()

    //Get data from DB
    const data = await Orateur.find()

    //Check name & date
    const existing_name = data.some(d=> name.toLowerCase() === d.name.toLowerCase())
    const existing_date = data.some(d=> date == d.date)

    if(existing_name){
        res.send('-1') //error - existing name
        return false
    }
       

    if(existing_date){
        res.send('-2') //error - existing date [Just for double security]
        return false
    }
       
    //Add in DB 
    await Orateur.create({
        name : name, 
        theme : theme,
        date : date
    })
    
    //Positive feedback to view 
    res.send('1')

})



//FORM EDITION @/edit [PATCH]
const Editer = asyncHandler(async(req, res)=>{

    //Get Form data
    const {modal_name, modal_theme, modal_date} = req.body


    //Get data from DB
    const db_data = await Orateur.find()

    //Check name & date
    const existing_name = db_data.some(d=> nom == d.name)
    const existing_date = db_data.some(d=> nom == d.date)

    if(existing_name)
        res.send(-1) //error - existing name

    if(existing_date)
        res.send(-2) //error - existing date [Just for double security]

    console.log(existing_name);
    return 
    //Add in DB 
    await Orateur.create({
        name : nom, 
        theme : theme,
        date : date

    })

    //Positive feedback to view 
    res.send(1)

})


//CREATE EXCEL FILE 
const createExcelFile = () => {

    const headerColumns = ["Nom", "Theme(facultatif)", "Date"]

    const wb = new xl.Workbook()
    const ws = wb.addWorksheet("programme_de_partages")
    let colIndex = 1
    headerColumns.forEach((item) => {
        ws.cell(1, colIndex++).string(item)
    })
    let rowIndex = 2;
    data.forEach((item) => {
        let columnIndex = 1;
        Object.keys(item).forEach((colName) => {
            ws.cell(rowIndex, columnIndex++).string(item[colName])
        })
        rowIndex++;
    })
    wb.write("programme_de_partages.xlsx")

}

//EXCEL FILE SYSTEM @/download [GET]
const DownloadFile = asyncHandler(async(req, res)=>{
    //
    createExcelFile()

    const file = "programme_de_partages.xlsx"

    const fileName = path.basename(file)
    const mimeType = mime.getType(file)

    res.setHeader("Content-Disposition", "attachment;filename=" + fileName)
    res.setHeader("Content-Type", mimeType)


    setTimeout(() => {
        res.download(file)
    }, 2000);
})


//EXPORT TO MAIN-ROUTES
module.exports = {Home, Ajouter, Editer, DownloadFile}