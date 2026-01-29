pdfjsLib.GlobalWorkerOptions.workerSrc = '../vendor/pdfjs/pdf.worker.min.js';

const params = new URLSearchParams(window.location.search);
const doc = params.get("doc");
const map = {
  "agriculture/crop": "../content/agriculture/asset.pdf"
};
const url = map[doc];
const container = document.getElementById("pdfContainer");
const pageNav = document.getElementById("pageNav");

let scale = 1.2;
const zoomValue = document.getElementById("zoomValue");
document.getElementById("zoomIn").addEventListener("click", ()=>{
  scale +=0.1; zoomValue.textContent = scale.toFixed(1)+"x"; renderPDF();
});
document.getElementById("zoomOut").addEventListener("click", ()=>{
  if(scale>0.5) scale-=0.1; zoomValue.textContent = scale.toFixed(1)+"x"; renderPDF();
});

let pdfDoc = null;
function renderPDF(){
  if(!pdfDoc) return;
  container.innerHTML=""; pageNav.innerHTML="";
  for(let i=1;i<=pdfDoc.numPages;i++){
    pdfDoc.getPage(i).then(page=>{
      const viewport = page.getViewport({scale});
      const canvas=document.createElement("canvas");
      const ctx=canvas.getContext("2d");
      canvas.width=viewport.width;
      canvas.height=viewport.height;

      page.render({canvasContext:ctx, viewport}).promise.then(()=>{
        ctx.font="20px Arial";
        ctx.fillStyle="rgba(200,200,200,0.3)";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillText("fb:@krisishikkha.com",canvas.width/2,canvas.height/2);
      });

      container.appendChild(canvas);

      const navBtn=document.createElement("button");
      navBtn.textContent=i;
      navBtn.addEventListener("click",()=>{canvas.scrollIntoView({behavior:"smooth"})});
      pageNav.appendChild(navBtn);
    });
  }
}

pdfjsLib.getDocument(url).promise.then(pdf=>{pdfDoc=pdf; renderPDF();});
