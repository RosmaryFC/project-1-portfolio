
const URL = "https://spreadsheets.google.com/feeds/list/1WwRy_ACtDyNErhvQjLKHFIjXRa3dNW7NxlT_Kza1RzU/od6/public/values?alt=json";

fetch(URL) //starts the fetch process
    .then (response => response.json()) //returns the JSON data as a JS object
    .then(data => {
        console.log("data feed", data.feed);
        //creates an array of parsed objects
        let projects = data.feed.entry.map( entry => {
            return {
                title: entry.gsx$title.$t,
                image: entry.gsx$image.$t,
                description: entry.gsx$description.$t,
                urlFrontend: entry.gsx$urlfrontend.$t,
                urlBackend: entry.gsx$urlbackend.$t,
                urlDeployed: entry.gsx$deployed.$t
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
            const $title = $('<h3>').text(projectsObj[i].title).addClass('project-title');
            const $image = $('<img>').attr('src', projectsObj[i].image).addClass('project-image');
            const $description = $('<p>').text(projectsObj[i].description).addClass('project-description');

            const $linksIntro = $('<p>').text('Checkout the site!').addClass('project-links-intro');
            const $linkList = $('<ul>').addClass('project-links-list');
            const $itemFrontend = $('<li>');
            const $itemBackend = $('<li>');
            const $itemDeployed = $('<li>');

            const $urlFronted = $('<a>').attr('href', projectsObj[i].urlFrontend)
                                    .attr('rel', 'noopener noreferrer')
                                    .attr('target', '_blank')
                                    .text('Frontend');
            const $urlBackend = $('<a>').attr('href', projectsObj[i].urlBackend)
                                    .attr('rel', 'noopener noreferrer')
                                    .attr('target', '_blank')                                
                                    .text('Backend');
            const $urlDeployed = $('<a>').attr('href', projectsObj[i].urlDeployed)
                                    .attr('rel', 'noopener noreferrer')
                                    .attr('target', '_blank')
                                    .text('Deployed');
                                    
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
            $projectInfoDiv.append($linksIntro);

            $projectInfoDiv.append($linkList);
            $linkList.append($itemDeployed);
            $itemDeployed.append($urlDeployed);
            $linkList.append($itemFrontend);
            $itemFrontend.append($urlFronted);
            $linkList.append($itemBackend);
            $itemBackend.append($urlBackend);

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

    //incorporate reset to inputs
    $("#formname").val('');
    $("#formemail").val('');
    $("#formmessage").val('');


    //creates prompt after user sends info to database
    alert(" Thanks for reaching out! I look forward to reading your message.");


}