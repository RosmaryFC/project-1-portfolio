
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
            const $title = $('<h3>').text(projectsObj[i].title);
            const $image = $('<img>').attr('src', projectsObj[i].image);
            const $description = $('<p>').text(projectsObj[i].description);
            const $url = $('<a>').attr('href', projectsObj[i].url);

            if($image.attr('src') == ''){
                //skip project item, do not add!!
                continue;
            }

            $('#project-items-container').append($projectDiv);
            $projectDiv.append($title);
            $projectDiv.append($image);
            $projectDiv.append($description);
            $title.append($url);

        }
    }