const input = document.querySelector('#input')
const grid = document.querySelector('.grid')

//change theme based on whether day or night
window.addEventListener('load', dayNightMode)

function dayNightMode() {
    const date = new Date()
    const hour = date.getHours()

    if (hour >= 7 && hour <= 19){
        document.body.style.backgroundColor = 'white'
        document.body.style.color = 'black'
    } else {
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'white'
    }
}

input.addEventListener('keydown', function(event) {
    if(event.key === 'Enter'){
        loadImg()
    }
})


function loadImg(){
    removeImages() // when new request made old images are deleted from the screen

    //connect to unsplash api endpoint
    const url = 'https://api.unsplash.com/search/photos/?query='+input.value+'&per_page=9&client_id=API_Key'
    //make request to url using fetch
    fetch(url)
    // use promise to make the request
    .then(response=>{
        if(response.ok){ //check if response is true
            return response.json() //send over data received from request
        } else { //otherwise display message explaining why was not successful
            alert(response.status)
        }
    })

    // another promise that returns the data
    .then(data=>{
        //data retrieved and placed in an array imageNodes
        const imageNodes = []
        //for loop goes through data places each image in its own div element
        for (let i=0; i<data.results.length;i++){ //loop through data and place each image in its own div element
            imageNodes[i] = document.createElement('div')
            imageNodes[i].className = 'img' //each div elem gets an img class name
            imageNodes[i].style.backgroundImage = 'url('+data.results[i].urls.raw+')'
            //add event listener so when double click on img it opens it up in another page and can be downloaded
            imageNodes[i].addEventListener('dblclick', function(){
                window.open(data.results[i].links.download, '_blank')
            })
            grid.appendChild(imageNodes[i])
        }
    })
}

function removeImages() {
    grid.innerHTML = ''
}



