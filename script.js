const title = document.getElementsByClassName("title")[0];
const link = "https://restcountries.eu/rest/v2/all";

let data = [];

let getData = async (link) => {
    const res = await fetch(link);

    const final = await res.json();

    final.forEach(e => {
        data.push(e)
    });
}


getData(link)
setTimeout(() => {
    console.log(data)
}, 2000);

// Title 

let titleLetters = document.getElementsByTagName("span");
const colors = ["red", "green", "royalblue", "purple", "orange"];

const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

for (let i = 0; i < titleLetters.length; i++) {
    titleLetters[i].style.color = colors[getRandom(0, colors.length)]
}

// // Content page
setTimeout(() => {
    let img = document.getElementsByClassName('test')[0];
    let par = document.getElementsByTagName("p")
    img.setAttribute("src", data[0].flag)
    par[0].innerText = data[0].capital
    par[1].innerText = data[0].currencies[0].name;
    data[0].languages.forEach(e => par[2].innerText += e.name + "\n")
    par[3].innerText = data[0].population.toLocaleString();
}, 2000);



