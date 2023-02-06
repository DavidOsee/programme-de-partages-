$(document).ready(function(){


    //-- TABLE

    //Table data
    const data = 
    [
        {
            name : "Jean Pierre Francois", 
            theme : "La soif de voir la gloire de Dieu et devenir cette gloire Texte: exode 33:18-23", 
            date : "26 Fevrier",
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

    //Data content
    const dataContent = (id, name, theme, date)=>{

        $('table tbody').append(`
            <tr>
                <td class="_id">${id}</td>
                <td class="text-truncate" style="max-width: 100px;">${name}</td>
                <td class="text-truncate" style="max-width: 155px;">${theme}</td>
                <td class="text-truncate" style="max-width: 100px;">${date}</td>
                <td><button class="btn btn-primary edit" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-name="${name}" data-bs-theme="${theme}" data-bs-date="${date}" >Editer</button>
                </td>
            </tr>
            `)
    }


    //Position ref
    let rightRef = parseInt($('#rightVal').val()) //1

    //Min data to display 
    let minData = 5

    //Populate table
    if(rightRef == 1)
    {
        // data.map((d, index)=>{
        //     //First 5 data
        //     if(index < minData)
        //     {
        //         //Display in table
        //         dataContent(d.orateur_id, d.name, d.theme, d.date)
        //     }
        // })
        for(i=rightRef-1; i<5; i++)
            dataContent(data[i].orateur_id, data[i].name, data[i].theme, data[i].date)
    }

    //Populate table with ref > 5
    // if(rightRef > 1)
    // {
        
    // }
    
        
   

    //Left navigation
    $('#left_nav').on('click', ()=>
    {

        //Decrement ref
        if(rightRef != 1)
            rightRef -=1
        
        else if(rightRef == 1)
            alert("Impossible de reculer d'avantage")

        console.log(rightRef)

        //Empty tbody
        $('table tbody').html("")

        const init = 5*(rightRef-1)

        for(i=init; i<rightRef*5; i++)
            dataContent(data[i].orateur_id, data[i].name, data[i].theme, data[i].date)

    })


    $('#right_nav').on('click', ()=>{

        //Increment ref
        if(rightRef < Math.round(data.length/5))
            rightRef +=1

        else if(rightRef >= Math.round(data.length/5))
            alert("C'est tout!")

         //Empty tbody
         $('table tbody').html("")

        const init = 5*(rightRef-1)

        for(i=init; i<rightRef*5; i++)
            dataContent(data[i].orateur_id, data[i].name, data[i].theme, data[i].date)
     
    })



})//THE END
   



