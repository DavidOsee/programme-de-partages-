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
    

//HOME VIEW 
const Home = asyncHandler(async(req, res)=>{

    //Get data from DB
    const data = await Orateur.find()

    console.log(data)

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
    const {nom, theme, date} = req.body

    //Check name

    //Check date

    //Add in DB 
    await Orateur.create({
        name : nom, 
        theme : theme,
        date : date

    })
    
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

//EXCEL FILE SYSTEM
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