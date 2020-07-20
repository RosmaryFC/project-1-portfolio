
const URL = "https://spreadsheets.google.com/feeds/list/1WwRy_ACtDyNErhvQjLKHFIjXRa3dNW7NxlT_Kza1RzU/od6/public/values?alt=json";

fetch(URL) //starts the fetch process
    .then (response => response.json()) //returns the JSON data as a JS object
    .then(data => {
        console.log(data.feed);
        //creates an array of parsed objects
        let projects = data.feed.entry.map( entry => {
            return {
                title: entry.gsx$title.$t,
                image: entry.gsx$image.$t,
                description: entry.gsx$description.$t,
                url: entry.gsx$url.$t
            }
        })
        addProjects(projects);
    });

    const addProjects = (projectsObj) => {
        console.log('projects', projectsObj);

        for(let i = 0; i < projectsObj.length; i++){
            console.log(projectsObj[i].title);
            const $projectDiv = $('<div>').addClass('project-item');
            const $projectImgDiv = $('<div>').addClass('project-img-div');
            const $projectInfoDiv = $('<div>').addClass('project-info-div');
            const $title = $('<h3>').text(projectsObj[i].title);
            const $image = $('<img>').attr('src', projectsObj[i].image);
            const $description = $('<p>').text(projectsObj[i].description);
            const $url = $('<a>').attr('href', projectsObj[i].url);

            if($image.attr('src') == ''){
                //skip project item, do not add!!
                continue;
            }

            $('#project-items-container').append($projectDiv);
            $projectDiv.append($projectImgDiv);
            $projectDiv.append($projectInfoDiv);
            $projectImgDiv.append($image);
            $projectInfoDiv.append($title);
            $projectInfoDiv.append($description);
            $title.append($url);





        }
    }

//on click for form button
function sendForm() {
    console.log('SEND FORM');
    //logic for google form
    const FORM_URL = "https://script.google.com/macros/s/AKfycbwYE97cmQJ4b5DSNZfYCPlDDMoki06pRF4bH-7EUJxqeAcoNL0/exec";

    const name = $("#formname").val();
    const email = $("#formemail").val();
    const message = $("#formmessage").val();

    console.log(name, email, message);

    const CALLBACK_URL = FORM_URL + "?callback-ctrlq&formname="+name+"&formemail="+email+"&formmessage="+message+"&action=insert";

    const request = jQuery.ajax({
        crossDomain:true,
        url:CALLBACK_URL,
        method:"GET",
        dataType:"jsonp"
    });

    console.log(request);

    //TODO: incorporate reset must add reset form id to form
    $("#formname").val('');
    $("#formemail").val('');
    $("#formmessage").val('');


    //TODO: create prompt after user sends info to database
    alert(" Thanks for reaching out! I look forwarrd to reading your message.");


}