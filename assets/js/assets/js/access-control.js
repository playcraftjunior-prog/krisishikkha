document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e=>{
  if(e.ctrlKey) e.preventDefault();
});
document.body.style.userSelect="none";
