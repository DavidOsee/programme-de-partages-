$(document).ready(function(){


    //-- TABLE

    //Get data
    let data = []
    data  = JSON.parse($('input#data').val())

    //Data content
    const dataContent = (id, name, theme, date)=>{

        $('table tbody').append(`
            <tr>
                <td class="_id">${id}</td>
                <td class="text-truncate" style="max-width: 100px;">${name}</td>
                <td class="text-truncate" style="max-width: 155px;">${theme}</td>
                <td class="text-truncate" style="max-width: 100px;">${date}</td>
                <td><button class="ui primary button edit" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-name="${name}" data-bs-theme="${theme}" data-bs-date="${date}" >Editer</button>
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

    //SUBMIT AJOUTER FORM
    $('form#ajouter').on('submit', (e)=>{
        //
        e.preventDefault()
        
        const $inputs = $('#ajouter :input');

        //Get input values
        let form_data = {}

        $inputs.each(function() {
            form_data[this.name] = $(this).val();
        });

        //Validate before sending to the server 
        if(form_data.nom ==""  || form_data.date=="")
            return false
        
        if(form_data.nom.length > 20 || form_data.theme.length > 80 || form_data.date.length > 15)
            return false

        //Ajax 
        $.ajax({
            url: '/add',
            type: "POST",
            data: form_data,
            success: function (data) {
              console.log(data)
            },
            error: function (xhr, exception) {
                console.log(exception)
            }
          })
      
    })


    //SUBMIT EDITER FORM 
    $('form#editer').on('submit', (e)=>{
        //
        e.preventDefault()

        const $inputs = $('#editer :input');

        //Get input values
        let modal_data = {};

        $inputs.each(function() {
            modal_data[this.name] = $(this).val();
        });

        //Validate before sending to the server 
        if(modal_data.nom =="" || modal_data.date=="")
            return false
        
        if(modal_data.nom.length > 20 || modal_data.theme.length > 80 || modal_data.date.length > 15)
            return false

        //Ajax 
        $.ajax({
            url: '/edit',
            type: "PATCH",
            data: modal_data,
            success: function (data) {
              console.log(data)
            },
            error: function (xhr, exception) {
                console.log(exception)
            }
          })
      
    })



})//THE END
   



