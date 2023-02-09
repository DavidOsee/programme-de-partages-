$(document).ready(function(){

    //-- TABLE

    //Get data
    let db_d = []
    
    db_d  = JSON.parse($('input#data').val())

    //SORT DATA
    const db_data = db_d.sort((a,b) => { return a.pos_id - b.pos_id })


    // db_data.forEach(el=>{
      
    //     console.log(el.name)
    // })
    

    //Hide Download and pagination if data is empty 
    if(db_data.length == 0){
        $('#downloadBtn').hide()
        $('#pagination').hide()
        $('table').after('<div class="ui icon message"><i aria-hidden="true" class="circle notched loading icon"></i><div class="content"><div class="header">Humm, aucune entrée!</div>La liste est encore vide pour le moment.</div></div>')
    }

    //TRANSFER DB_DATA IN NEW ARRAY WITH INDEXES
    let data = []
    if(db_data.length > 0){
        db_data.forEach((d, index) => {
            let no = index +1 
            data.push({
                _id : d._id,
                orateur_id : no, 
                name : d.name, 
                theme : (d.theme == "")? "Pas encore révélé" : d.theme,
                date : d.date
            })
        });
    }
    
    //Data content to populate THE HTML TABLE
    const dataContent = (_id, id, name, theme, date)=>{
        $('table tbody').append(`
            <tr>
                <td class="_id">${id}</td>
                <td class="text-truncate" style="max-width: 100px;">${name}</td>
                <td class="text-truncate" style="max-width: 155px;">${theme}</td>
                <td class="text-truncate" style="max-width: 100px;">${date}</td>
                <td>
                    <button class="ui primary button edit" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-id="${_id}" data-bs-name="${name}" data-bs-theme="${theme}" data-bs-date="${date}" >Editer</button>
                </td>
            </tr>
            `)
    }

    //EMPTY Data content to populate THE HTML TABLE
    // const EmptyDataContent = ()=>{
    //     $('table tbody').append(`
    //         <tr>
    //             <td colspan="5">
    //                 <button class="ui disabled button">&nbsp;</button>
    //             </td>
    //         </tr>
    //         `)
    // }


    //Position ref for pagination
    let pag_ref = parseInt($('#page_ref').val()) //DEFAULT : 1

    //Min data to display 
    let minData = 5

    
    //POPULATE THE TABLE
    if(pag_ref == 1 && db_data.length > 0)
    {

        for(i=pag_ref-1; i<5; i++){ 

            if(typeof data[i] != "undefined"){
                dataContent(data[i]._id, data[i].orateur_id, data[i].name, data[i].theme, data[i].date)
            }
        }
    }

    //Left navigation
    $('#left_nav').on('click', ()=>
    {
        //Remove the RAS
        $('.circle').remove()
        // $('table').after('<div class="ui icon message"><i aria-hidden="true" class="circle notched loading icon"></i><div class="content"><div class="header">R.A.S!</div>La liste est encore vide par ici.</div></div>')

        //Decrement ref
        if(pag_ref != 1)
            pag_ref -=1
        
        else if(pag_ref == 1)
            alert("Impossible de reculer d'avantage")

        //Empty tbody
        $('table tbody').html("")

        const init = 5*(pag_ref-1)

        for(i=init; i<pag_ref*5; i++){ 

            if(typeof data[i] != "undefined"){
                dataContent(data[i]._id, data[i].orateur_id, data[i].name, data[i].theme, data[i].date, '')
            }
            
        }

       

    })

    console.log(data.length)
    $('#right_nav').on('click', ()=>{
        //Increment ref
        if(pag_ref <= Math.round(data.length/5))
            pag_ref +=1

        else if(pag_ref >= Math.round(data.length/5))
            alert("C'est tout!")

            console.log(data.length)
        //Empty tbody
        $('table tbody').html("")

        const init = 5*(pag_ref-1)

        //
        if(data.length < 6){
            $('.circle').remove()
            $('table').after('<div class="ui icon message circle"><i aria-hidden="true" class="circle notched loading icon"></i><div class="content"><div class="header">R.A.S!</div>La liste est encore vide par ici.</div></div>')
            //return false
        }
        
        for(i=init; i<pag_ref*5; i++){
            if((typeof data[i] != "undefined")){
                $('.circle').remove()
                dataContent(data[i]._id, data[i].orateur_id, data[i].name, data[i].theme, data[i].date)
            }
            
     
        }
        
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
            success: function (data) 
            {
              if(data == '-1'){ //On existing name
                console.log(data)
                swal({
                    title: "Oops!",
                    text: "Le nom que vous avez entré existe deja!",
                    icon: "warning",
                    button: "C'est compris!"
                });
                return false
              }
              if(data == '-2'){ //On existing name
                swal({
                    title: "Oops!",
                    text: "Nous avons déjà un orateur programmé pour cette date!",
                    icon: "warning",
                    button: "C'est compris!"
                }); 
                return false
              }

                //On success
                swal({
                    title: "Félicitations!",
                    text: "Vous etes notre prochain orateur!",
                    icon: "success",
                    button: "Gloire à Dieu!"
                }).then(()=> { window.location = "/"});

                //RESET FORM
                $('form#ajouter').trigger('reset')
                // $('.ui .dropdown').dropdown('restore defaults')
            },
            error: function (xhr, exception) {
                console.log(exception)
            }
        })
      
    }) //AJOUTER


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
            type: "PUT",
            data: modal_data,
            success: function (data) {
              console.log(data)
              if(data == '-1'){ //On existing name
                console.log(data)
                swal({
                    title: "Oops!",
                    text: "Le nom que vous avez entré existe deja!",
                    icon: "warning",
                    button: "C'est compris!"
                });
                return false
              }
              if(data == '-2'){ //On existing name
                swal({
                    title: "Oops!",
                    text: "Nous avons déjà un orateur programmé pour cette date!",
                    icon: "warning",
                    button: "C'est compris!"
                }); 
                return false
              }

                //On success
                swal({
                    title: "Félicitations!",
                    text: "Vos informations sont à jour!",
                    icon: "success",
                    button: "Merci Seigneur!"
                }).then(()=> { window.location = "/"});

                //RESET FORM
                $('form#ajouter').trigger('reset')
                $('form#editer').trigger('reset')
            },
            error: function (xhr, exception) {
                console.log(exception)
            }
          })
      
    })



})//THE END
   



