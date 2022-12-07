const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');

window.addEventListener ('load', function() {
  document.getElementById("agregar").addEventListener("click", function() {
    alert("Tu actividad fue agregada!");
  })
})




let arrayActividades = [];


const CrearItem = (actividad) => {
  let item = {
    actividad: actividad,
    estado: false
  }

  arrayActividades.push(item);

  return item;

}







const GuardarDB = () => {

  localStorage.setItem('Rutina', JSON.stringify(arrayActividades));

  PintarDB();

}

const PintarDB = () => {

  listaActividadesUI.innerHTML = '';

  arrayActividades = JSON.parse(localStorage.getItem('Rutina'));

  
  if(arrayActividades === null){
    arrayActividades = [];
  }else{
    arrayActividades.forEach(element => {
      console.log('element');

      if(element.estado){
        listaActividadesUI.innerHTML += `<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }else{
        listaActividadesUI.innerHTML += `<div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }
    });
  
  }
}



const EliminarDB = (actividad) => {
  let indexArray;
  arrayActividades.forEach((elemento, index) => {
    
    if(elemento.actividad === actividad){
      indexArray = index;
    }
    
  });

  arrayActividades.splice(indexArray,1);
  GuardarDB();

}

const EditarDB = (actividad) => {

  let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);

  arrayActividades[indexArray].estado = true;

  GuardarDB();

}


formularioUI.addEventListener('submit', (e) => {

  e.preventDefault();
  let actividadUI = document.querySelector('#actividad').value;

  console.log(actividadUI);

  CrearItem(actividadUI);
  GuardarDB();

  formularioUI.reset();

});

document.addEventListener('DOMContentLoaded', PintarDB);

listaActividadesUI.addEventListener('click', (e) => {

  e.preventDefault();

  if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
    let texto = e.path[2].childNodes[1].innerHTML;
    if(e.target.innerHTML === 'delete'){
      EliminarDB(texto);
    }
    if(e.target.innerHTML === 'done'){
      EditarDB(texto);
    }
  }

});

