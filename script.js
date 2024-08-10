const fileInput= document.querySelector("input")
downloadBtn=document.querySelector("button")

downloadBtn.addEventListener("click", e => {
  e.preventDefault(); // preventing form from submitting
  downloadBtn.innerText = "Downloading File..."
  fetchFile(fileInput.value);
  
  });

function fetchFile(url){
  //fetching file and returning respose as blob
  fetch(url).then(res=>res.blob()).then(file=>{
    //URL.createObjectURL creates a URL of passed object
    let tempUrl=URL.createObjectURL(file)
    let aTag = document.createElement("a")
    aTag.href =tempUrl //passing tempUrl as href value of <a> tag
    //passing file last name and extension as download value of <a> tag
    aTag.download=url.replace(/^.*[\\\/]/,'')
    document.body.appendChild(aTag)//adding <a> tag inside body
    aTag.click() //clicking <a> tag so the file download
    aTag.remove() // removing <a> tag once file download
    URL.revokeObjectURL(tempUrl)
  }).catch(()=>{
    //catch method will call if any error comes during downloading
    downloadBtn.innerText = "Download File"
    alert("Failed to download File !")
  })
}