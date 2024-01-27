const hashLinks = document.querySelectorAll(".hash-route-link")
const appContainer = document.querySelector("#app")

const routes = {
  "": {
    title:"Home",
    isApi:false,
    data:"./home.html"
  },
  "#todos": {
    title:"Todo List",
    isApi:true,
    data: "https://jsonplaceholder.typicode.com/todos/"
  },
  "#contact": {
    title:"Contact",
    isApi:false,
    data:"./contact.html"
  },
  "#book-summaries": {
    title:"Book Summaries",
    isApi:false,
    data:"./book-summaries.html"
  },
  "#authors": {
    title:"Authors",
    isApi:false,
    data:"./authors.html"
  }
}

hashLinks.forEach(item => item.addEventListener("click", event => {
  checkRoute(item.hash)
  
} ))

function checkRoute(hash = window.location.hash) {
  document.title = routes[hash].title
  const dataUrl = routes[hash].data
  if(routes[hash].isApi == false){
    appContainer.innerHTML=""
    fetch(dataUrl).then(res => res.text()).then(res => appContainer.innerHTML = res)
  }
  if(routes[hash].isApi == true){
    appContainer.innerHTML=""
    const createUl = document.createElement("ul")
    appContainer.append(createUl)
    fetch(dataUrl).then(res => res.json()).then(data =>{
      data.forEach(item => {
        const createLi = document.createElement("li")
        createLi.innerHTML= item.title
        createUl.append(createLi)
      })
    })

  }
}
