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


const dates_data = ["12 Fevrier", "26 Fevrier", "12 Mars", "26 Mars", "9 Avril", "23 Avril","7 Mai", "21 Mai"]


//ASSIGN POS_ID BASED ON DATE 
const Set_pos_id = (body_date) => {
    switch(body_date)
    { 
        case "12 Fevrier" :
            return 1
            break
        case "26 Fevrier" : 
            return 2
            break
        case "12 Mars" : 
        return 3
        break

        case "26 Mars" : 
        return 4
        break

        case "9 Avril" : 
        return 5
        break

        case "23 Avril" : 
        return 6
        break

        case "7 Mai" : 
        return 7
        break

        case "21 Mai" : 
        return 8
        break

        default : 
         return null
    }
}





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
        pos_id : Set_pos_id(date),
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
    const {id, nom, theme, date} = req.body

    //Get data from DB
    const db_data = await Orateur.find()

    //Trim name in case
    const name  = nom.trim()

    //Check name & date
    const existing_name = db_data.some(d=> name.toLowerCase() === d.name.toLowerCase())
    const existing_date = db_data.some(d=> date == d.date)

    console.log(existing_name)
    console.log(existing_date)

    // if(existing_name){
    //     res.send('-1') //error - existing name
    //     return false
    // }
       

    if(existing_date){
        res.send('-2') //error - existing date [Just for double security]
        return false
    }

    //UPDATE DATA IN DB 
    await Orateur.findByIdAndUpdate(id,{ 
        pos_id : Set_pos_id(date),
        theme : theme,
        date : date
    }, { new : true})

    //Positive feedback to view 
    res.send('1')

})


//CREATE EXCEL FILE 
const CreateExcelFile = asyncHandler(async() => {

    //Get data from DB
    const dbData = await Orateur.find()

    //SORT THE DATA FIRST 
    const db_data = dbData.sort((a,b) => { return a.pos_id - b.pos_id })

    //Recreate data obj
    let file_data = []

    db_data.map(d=> {
        file_data.push({
            nom : d.name, 
            theme : d.theme, 
            date : d.date 
        })
    })


    const headerColumns = ["Nom", "Theme(facultatif)", "Date"]

    const wb = new xl.Workbook()
    const ws = wb.addWorksheet("programme_de_partages")
    let colIndex = 1
    headerColumns.forEach((item) => {
        ws.cell(1, colIndex++).string(item)
    })
    let rowIndex = 2;
    file_data.forEach((item) => {
        let columnIndex = 1;
        Object.keys(item).forEach((colName) => {
            ws.cell(rowIndex, columnIndex++).string(item[colName])
        })
        rowIndex++;
    })
    wb.write("programme_de_partages.xlsx")

})

//EXCEL FILE SYSTEM @/download [GET]
const DownloadFile = asyncHandler(async(req, res)=>{
    //
    CreateExcelFile()

    const file = "programme_de_partages.xlsx"

    const fileName = path.basename(file)
    const mimeType = mime.getType(file)

    res.setHeader("Content-Disposition", "attachment;filename=" + fileName)
    res.setHeader("Content-Type", mimeType)


    setTimeout(() => {
        res.download(file)
    }, 1000);
})


//EXPORT TO MAIN-ROUTES
module.exports = {Home, Ajouter, Editer, DownloadFile}