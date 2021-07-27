
import MainPage from './components/MainPage.js';
import ProjectPage from './components/ProjectPage.js';
import Navbar from './components/Navbar.js';


Promise.all([
      d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTsvZuUsQXQa69WVgCUEkykkMSzl8kqEkWZ1cTF__T8nv_kluq67PBNcMCG-PPQ9dZ7N50n3ihVS47P/pub?output=csv"),
      d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vShw7PBsS5oZVRmoFv4-shqHkiFaO8raLtCwOIBHq9nANxNTEB67AEbAu0tLHXfoL-ix_Ylf95ts9nh/pub?output=csv")
      ])
      .then(([about, projects]) => {
        const data = {about, projects};
        console.log(data);

    // determine what page to render
    let params = new URLSearchParams(window.location.search);
    if (params.get('project')==null){
        MainPage(data);
    }else{
        let project = data.projects.find(d=>d.title===params.get('project'));
        Navbar('project')
        ProjectPage(project, about);
        hljs.highlightAll();
        lightGallery(document.getElementById('lightgallery'), {
            plugins: [lgZoom, lgThumbnail, lgVideo],
            speed: 500,
            thumbnail: true
        });
    }  
});



