import GetImageURL, {GetImageArr, GetEmbedVideo, GetVideoURL, GetTeaserURL} from './Images.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
const opacity = 0.6;

export default function ProjectPage(project, about){

    document.querySelector('.container').innerHTML = `
        ${Navbar('project')}
        ${ProjectDetail(project, about)}
        ${Footer(about)}
    `
    // SetGallery();
    SetLightgallery(GetMediaArr(project.video, project.images));
}

export function ProjectDetail(d, about){
    
    return `
    <section id="content" class="project-intro">
        <div class="content-wrapper">
            <br>
            <div class="row">
            <div class="col-6">
                ${Lightgallery()}
            </div>
            <div class="col-6">
                <div class="project-info">
                    <h1 class="title">${d.title}</h1>
                    <div class="project-subtitle">
                        ${d.subtitle}
                    </div>
                    <p class="project-desc">
                        ${d.desc}
                    </p>
                    ${CodeSnippet(d.code)}
                    ${CustomButton(d.url, d.urlLabel)}
                    <a href="${d.resources}" target="_blank">
                        <button class="button" style="margin-top: 30px; margin-bottom: 50px;">More Resources</button>
                    </a>
                    <div class="project-tags" style="color: #a7a6a6;">
                        By ${d.authors}
                    </div>

                </div>
            </div>
        </div>

    </section>
    `
}

export function GetMediaArr(videoString, imageString){
    let mediaString;
    let mediaArr = [];

    mediaString = imageString;

    // remove space
    mediaString = mediaString.replace(/\s/g, '');
    mediaArr = mediaString.split(',');
    mediaArr = mediaArr.map(d=> {
        let obj = {
            src: GetImageURL(d),
            thumb: GetImageURL(d)
        }
        return obj;
    })

    if (videoString != "") {
        let obj = {
            video: {
                "source": [
                    {
                        "src": GetVideoURL(videoString), 
                        "type":"video/mp4"
                    }
                ], 
                "attributes": {
                    "preload": false, 
                    "controls": true
                }
            },
            thumb: GetVideoURL(videoString)
        };

        // mediaString = videoString.concat("," + imageString);
        // videoObj.video.source.src.Value = GetVideoURL(videoString);
        // videoObj.thumb = GetVideoURL(videoString);
        // console.log('video: ' + GetVideoURL(videoString));

        // add video element at the beginning of mediaArr
        mediaArr.unshift(obj);
    }
    return mediaArr;


    
    // console.log('mediaString:' + mediaString);
    
    // mediaArr = mediaString.split(',');

    // mediaArr = mediaArr.map(d=> {
    //     let obj = {
    //         src: GetImageURL(d),
    //         thumb: GetImageURL(d)
    //     }
    //     return obj;
    // })
    // return mediaArr;
}

export function CustomButton(url, urlLabel){
    if (url==="") {
        return '';
    }else {
        return `
        <a href="${url}" target="_blank">
            <button class="button" style="margin-top: 30px; margin-bottom: 50px;">${urlLabel}</button>
        </a>

        `;
    }
}

export function CodeSnippet(code){
    if (code==="") {
        return '';
    }else {
        return `
        <h4>Code</h4>
            <pre><code class="python">${code}</code></pre>
        `;
    }
}

// custom gallery
export function Gallery(video, images){
    return `
    <div class="gallery">
        <div class="maxi">
        ${ShowMaxi(video, images)}
        </div>
        <div class="mini">
        ${GetEmbedVideo(video)}
        ${ImageItems(images)}
        </div>
    </div>
    `
}

export function ShowMaxi(video, images){
    if (video==="") {
        return `<img id="current" src="${(GetTeaserURL(images))}"></img>`;
    } else {
        return `${GetEmbedVideo(video)}`;   
    }
}

export function SetGallery(){
    const current = document.querySelector('#current');
    const mini = document.querySelectorAll('.mini img, .mini iframe');
    console.log(mini);

    // Set first image opacity
    mini[0].style.opacity = opacity;

    mini.forEach(item => item.addEventListener('click', ImgClick));

    function ImgClick(e) {
        // Reset the opacity
        console.log('mini clicked');
        mini.forEach(
            item => (item.style.opacity = 1));
        
        console.log('target:' + e.target.src);
        // Change current image to src of clicked image
        current.src = e.target.src;
        
        // Change the opacity to opacity var
        e.target.style.opacity = opacity;
    }
}

// lightgallery.js
export function Lightgallery() {
    return `
        <div id="inline-gallery-container" class="inline-gallery-container"></div>
    `
}

export function SetLightgallery(mediaArr) {
    const $lgContainer = document.getElementById("inline-gallery-container");
    const inlineGallery = lightGallery($lgContainer, {
        container: $lgContainer,
        dynamic: true,
        // Turn off hash plugin in case if you are using it
        // as we don't want to change the url on slide change
        hash: false,
        // Do not allow users to close the gallery
        closable: false,
        // Add maximize icon to enlarge the gallery
        showMaximizeIcon: false,
        // Append caption inside the slide item
        // to apply some animation for the captions (Optional)
        // appendSubHtmlTo: ".lg-item",
        // Delay slide transition to complete captions animations
        // before navigating to different slides (Optional)
        // You can find caption animation demo on the captions demo page
        slideDelay: 200,
        plugins: [lgZoom, lgThumbnail, lgVideo],
        dynamicEl: mediaArr,
        iframe: true,
        // Completely optional
        thumbWidth: 60,
        thumbHeight: "60px",
        // thumbMargin: 4
    });

    setTimeout(() => {
        inlineGallery.openGallery();
    }, 200);
}

export function ImageItems(images){
    let arr = GetImageArr(images);

    return arr.map(d=>`
        <img src="${GetImageURL(d)}">
        `).join('');
}


