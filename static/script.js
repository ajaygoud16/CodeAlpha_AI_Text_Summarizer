function summarizeText(){

let text=document.getElementById("inputText").value;
let output=document.getElementById("summary");

if(text.length===0){
alert("Please enter text");
return;
}

output.innerHTML="Generating summary...";

fetch("/summarize",{
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body:"text="+encodeURIComponent(text)
})
.then(response=>response.json())
.then(data=>{
output.innerHTML=data.summary;
});

}

function countCharacters(){
let text=document.getElementById("inputText").value;
document.getElementById("count").innerHTML=text.length+" Characters";
}

function copyText(){
let text=document.getElementById("summary").innerText;
navigator.clipboard.writeText(text);
alert("Copied!");
}

function clearText(){
document.getElementById("inputText").value="";
document.getElementById("summary").innerHTML="";
document.getElementById("count").innerHTML="0 Characters";
}