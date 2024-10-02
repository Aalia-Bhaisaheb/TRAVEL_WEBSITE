
// let places = [{
//       place_id:1,
//       image_string:"./images/static/packages/andaman.jpg",
//       place_name:"Andaman",
//       link:"./Andaman.html"
//     },
//     {
//       place_id:2,
//       image_string:"./images/static/packages/rajasthan.jpg",
//       place_name:"Rajasthan",
//       link:"./Andaman.html"
//     },
//     {
//       place_id:3,
//       image_string:"./images/static/packages/kashmir.jpg",
//       place_name:"Kashmir",
//       link:"./Andaman.html"
//     },
//     {
//       place_id:4,
//       image_string:"./images/static/packages/kerela.jpg",
//       place_name:"Kerela",
//       link:"./Andaman.html"
//     },
//     {
//       place_id:5,
//       image_string:"./images/static/packages/goa.jpg",
//       place_name:"Goa",
//       link:"./Andaman.html"
//     },
//     {
//       place_id:6,
//       image_string:"./images/static/packages/ladakh.jpg",
//       place_name:"Ladakh",
//       link:"./Andaman.html"
//     },
//   ];
//   // <div class="card dest1 mx-2 card2" style="width: 16rem;">
//   //   <img src="./images/static/packages/ladakh.jpg" class="card-img-top dest1" alt="image">
//   //   <div class="overlay-text">Ladakh</div>
//   // </div>
//     for(let i=0;i<places.length;i++)
//     {
//       const place_div=document.createElement("div");
//       place_div.style.width="16rem";
//       place_div.className="card dest1 mx-2 card2";

//       const place_link = document.createElement("a");
//       place_link.setAttribute('href', places[i]["link"]);
//       place_link.setAttribute('target', '_blank');

//       const place_img=document.createElement("img");
//       place_img.setAttribute('src',places[i]["image_string"]);
//       place_img.className="card-img-top dest1";
//       const place_label=document.createElement("div");
//       place_label.className="overlay-text";
//       place_label.innerHTML=places[i]["place_name"];
//       place_div.appendChild(place_img);
//       place_div.appendChild(place_label);
//       place_div.appendChild(place_label);
//       document.getElementById("places-carousel").appendChild(place_div);
//     }

let places = [
  {
    place_id: 1,
    image_string: "./images/static/packages/andaman.jpg",
    place_name: "Andaman",
    link: "./Andaman.html"
  },
  {
    place_id: 2,
    image_string: "./images/static/packages/rajasthan.jpg",
    place_name: "Rajasthan",
    link: "./rajasthan.html"
  },
  {
    place_id: 3,
    image_string: "./images/static/packages/kashmir.jpg",
    place_name: "Kashmir",
    link: "./kashmir.html"
  },
  {
    place_id: 4,
    image_string: "./images/static/packages/kerela.jpg",
    place_name: "Kerela",
    link: "./kerela.html"
  },
  {
    place_id: 5,
    image_string: "./images/static/packages/goa.jpg",
    place_name: "Goa",
    link: "./goa.html"
  },
  {
    place_id: 6,
    image_string: "./images/static/packages/ladakh.jpg",
    place_name: "Ladakh",
    link: "./ladakh.html"
  }
];

for (let i = 0; i < places.length; i++) {
  const place_div = document.createElement("div");
  place_div.style.width = "16rem";
  place_div.className = "card dest1 mx-2 card2";

  const place_img = document.createElement("img");
  place_img.setAttribute('src', places[i]["image_string"]);
  place_img.className = "card-img-top dest1";

  const place_link = document.createElement("a");
  place_link.setAttribute('href', places[i]["link"]);
  place_link.setAttribute('target', '_blank');
  
  const place_label = document.createElement("div");
  place_label.className = "overlay-text";
  place_label.innerHTML = places[i]["place_name"];

  place_link.appendChild(place_img);
  place_div.appendChild(place_link);
  place_div.appendChild(place_label);

  document.getElementById("places-carousel").appendChild(place_div);
}



let places_m=[
  {
    m_id:1,
    m_img:"./images/static/packages/darjeeling.jpg",
    m_name:"Darjeeling"
  },
  {
    m_id:2,
    m_img:"./images/static/packages/matheran.png",
    m_name:"Matheran"
  },
  {
    m_id:3,
    m_img:"./images/static/packages/lonavla.png",
    m_name:"Lonavala"
  },
  {
    m_id:4,
    m_img:"./images/static/packages/saputara.png",
    m_name:"Saputara"
  },
  {
    m_id:5,
    m_img:"./images/static/packages/meghalaya.png",
    m_name:"Meghalaya"
  },
  {
    m_id:6,
    m_img:"./images/static/packages/coorg.png",
    m_name:"Coorg"
  }
]
for(let i=0;i<places_m.length;i++){
  const m_div=document.createElement("div");
  m_div.style.width="16rem";
  m_div.className="card dest1 mx-2 card2";
  const m_label=document.createElement("div");
  m_label.className="overlay-text";
  m_label.innerHTML=places_m[i]["m_name"];
  const m_img=document.createElement("img");
  m_img.setAttribute('src',places_m[i]["m_img"]);
  m_div.appendChild(m_img);
  m_div.appendChild(m_label);
  document.getElementById("monsoon-carousel").appendChild(m_div);
}

let places_t=[
  {
    t_id:1,
    t_img:"./images/static/packages/doodhpathri.png",
    t_name:"Bodpathri"
  },
  {
    t_id:2,
    t_img:"./images/static/packages/tarsar_marsar.png",
    t_name:"Bali Pass"
  },
  {
    t_id:3,
    t_img:"./images/static/packages/sandakphu.png",
    t_name:"Sandakphu"
  },
  {
    t_id:4,
    t_img:"./images/static/packages/goechala.png",
    t_name:"Goechala"
  },
  {
    t_id:5,
    t_img:"./images/static/packages/kedarkantha.png",
    t_name:"Kedarkantha"
  },
  {
    t_id:6,
    t_img:"./images/static/packages/hampta_pass.png",
    t_name:"Hampta"
  }
]
for(let i=0;i<places_t.length;i++){
  const t_div=document.createElement("div");
  t_div.style.width="16rem";
  t_div.className="card dest1 mx-2 card2";
  const t_label=document.createElement("div");
  t_label.className="overlay-text";
  t_label.innerHTML=places_t[i]["t_name"];
  const t_img=document.createElement("img");
  t_img.setAttribute('src',places_t[i]["t_img"]);
  t_div.appendChild(t_img);
  t_div.appendChild(t_label);
  document.getElementById("trekking-carousel").appendChild(t_div);
}