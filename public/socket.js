console.log("hi")
const socket = io('http://10.20.1.201:4000', { transports : ['websocket'] })




function createTable(m,id){
let col = [];
 for (let i = 0; i < m.length; i++) {
   for (let key in m[i]) {
     delete m[i]['fillColor']
     if (col.indexOf(key) === -1) {

       col.push(key);
     }
   }
 }

 const table = document.createElement("table");
 table.setAttribute('id',"m"+id);
 table.classList.add('classname');
 let tr = table.insertRow(-1);                   // table row.

for (let i = 0; i < col.length; i++) {
  let th = document.createElement("th");      // table header.
  th.innerHTML = col[i];
  tr.appendChild(th);
}


for (let i = 0; i < m.length; i++) {

   tr = table.insertRow(-1);

   for (let j = 0; j < col.length; j++) {
     let tabCell = tr.insertCell(-1);
     tabCell.innerHTML = m[i][col[j]];
   }
 }
table.style.display="none";

const divShowData = document.getElementById('dialog-modal');
divShowData.appendChild(table);
let btn = document.createElement("button");
btn.style.float = "right";
btn.innerHTML = "Reject Loan";
btn.onclick = function(){
  document.getElementsByClassName("ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close")[0].click();

}
table.appendChild(document.createElement("br"));
table.appendChild(btn);


let btn2 = document.createElement("button");
btn2.innerHTML = "Approve Loan";
btn2.style.float="left"
btn2.onclick = function(){
document.getElementsByClassName("ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close")[0].click();
};

table.appendChild(btn2);
}




function createArticleNode(data, dataArray){
  console.log(data["Customer"])
  const node = document.createElement("article");
  node.classList.add("leaderboard__profile");

  const span = document.createElement("span");
  span.classList.add("leaderboard__name")

  const img = document.createElement("img")
  img.classList.add("leaderboard__picture")
  img.src = "https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-1024.png"

  const textnode = document.createTextNode(data["Customer"]);

  const spanTwo = document.createElement("span")
  var spanTwoText;
  if(data["CREDIT_LMT"] === null){
    spanTwoText = document.createTextNode("2.5B");
  }else{
     spanTwoText = document.createTextNode(data["CREDIT_LMT"]);
  }

  spanTwo.classList.add("leaderboard__value")
  spanTwo.appendChild(spanTwoText)


  span.appendChild(textnode);
  node.appendChild(img)
  node.appendChild(span)
  node.appendChild(spanTwo)
  createTable(dataArray,data["persistentId"])
  node.setAttribute("id",data["persistentId"])
  node.setAttribute("href","#")





  document.getElementById("test").appendChild(node);

  $( "#"+data["persistentId"]).on("click", function(){
      $( "#dialog-modal" ).dialog({
         height: 340,
         width:1000,
         modal: true
       });

      $( "#dialog-modal" ).show();
      //$("#"+data["persistentId"]).show();


      const divShowData = document.getElementById('dialog-modal');

      var divsToHide = document.getElementsByClassName("classname"); //divsToHide is an array
          for(var i = 0; i < divsToHide.length; i++){
              // or
              divsToHide[i].style.display = "none"; // depending on what you're doing
        }
      document.getElementById("m"+data["persistentId"]).style.display="block"

   });
}



socket.on('test',data=>{
  console.log(data)
  if (data.length > 0) {

    createArticleNode(data[0],data)
  }

})
