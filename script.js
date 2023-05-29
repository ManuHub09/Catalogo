

const DOM = {
    Filtro: document.getElementById("Filtro"),
    BtnBorrar: document.getElementById("borrar"),
    Categorias: document.getElementById("categorias"), //del borrado
    Guardar:document.getElementById("guardar"),
    BtnAnnadir: document.getElementById("Annadir"), 
    InptLink: document.getElementById("IntroLink"),
    InptCate: document.getElementById("categoriasAnnadir"),
    InptEquipo: document.getElementById("IntroEquipo"),
    btnModificar: document.getElementById("Modificar"),
    DivCrud: document.getElementById("CRUD"),
     error : document.getElementById("error")
    
    
};
let lista_imagenes = document.createElement('div');
lista_imagenes.setAttribute("id","lista-imagenes");
DOM.Filtro.insertAdjacentElement("afterend", lista_imagenes);
var categorias;
var catalogo;
// Añade 2 categorías más de temas que  quieras
var strCategorias='[{"nombre":"Premier League"}, {"nombre":"La Liga"}, {"nombre":"Bundesliga"} ]';
// Añade 3 imágenes a cada categorías para tenerlas ya desde el comienzo
var strCatalogo = '[{"id":1,"src":"https://resources.premierleague.com/premierleague/badges/t3.svg","equipo":"Arsenal","categoria":"Premier League"},{"id":2,"src":"https://resources.premierleague.com/premierleague/badges/t43.svg","equipo":"City","categoria":"Premier League"}, {"id":3,"src":"https://resources.premierleague.com/premierleague/badges/t1.svg","equipo":"United","categoria":"Premier League"},{"id":4,"src":"https://e00-marca.uecdn.es/assets/sports/logos/football/png/144x144/178.png","equipo":"Barcelona","categoria":"La Liga"}, {"id":5,"src":"https://e00-marca.uecdn.es/assets/sports/logos/football/png/144x144/186.png","equipo":"Madrid","categoria":"La Liga"},{"id":6,"src":"https://e00-marca.uecdn.es/assets/sports/logos/football/png/144x144/175.png","equipo":"Atletico","categoria":"La Liga"}, {"id":7,"src":"https://www.bundesliga.com/assets/clublogo/DFL-CLU-00000G.svg","equipo":"Bayern","categoria":"Bundesliga"},{"id":8,"src":"https://www.bundesliga.com/assets/clublogo/DFL-CLU-000007.svg","equipo":"Dortmund","categoria":"Bundesliga"}, {"id":9,"src":"https://www.bundesliga.com/assets/clublogo/DFL-CLU-000017.svg","equipo":"Leipzig","categoria":"Bundesliga"}]';

//'afterend': Después del elementoObjetivo.
// Esta función debes sustituirla por IIFE y quitar la llamada a esta función en index.html
 (function(){
    categorias=JSON.parse(localStorage.getItem("categorias"));
    if (categorias ===null){
        localStorage.setItem('categorias', strCategorias);
    }
    else{
        categorias=JSON.parse(strCategorias);

    }

    // Obtenemos el catálogo del localStorage ... y si no hay lo cargamos del string JSON
    catalogo=JSON.parse(localStorage.getItem("catalogo"));
    if (catalogo === null){
        localStorage.setItem('catalogo',strCatalogo);
        catalogo=JSON.parse(localStorage.getItem("catalogo"));
        imagenesInicio(catalogo);
       
    }
    else{
        imagenesInicio(catalogo); 
    }
    DOM.BtnBorrar.addEventListener('click', inicialAnimacion);
    DOM.Categorias.addEventListener('click', MostrarImagenes); 
    DOM.Guardar.addEventListener('click',Save);
    DOM.BtnAnnadir.addEventListener('click', AnnadirImagen);
    DOM.btnModificar.addEventListener('click', Editar);
    
  
    

 })();
function Save (){
    localStorage.setItem('catalogo', JSON.stringify(catalogo)); 
}
function imagenesInicio(catalogo){
    lista_imagenes.innerHTML ="";
    catalogo.forEach(catalogo => {
        let divImagen = document.createElement('div');
        divImagen.classList.add('imagen');
        lista_imagenes.insertAdjacentElement("beforeend", divImagen);
        let imagen = document.createElement('img');
        imagen.setAttribute('src', catalogo.src)
        imagen.setAttribute('id', catalogo.categoria)
        divImagen.insertAdjacentElement("afterbegin", imagen);
        lista_imagenes.addEventListener('click', seleccionar);
        DOM.Filtro.addEventListener('click', MostrarImagenes);
        divImagen.addEventListener('animationend',borrarImg );
    });
}
 function MostrarImagenes(e){
    lista_imagenes.innerHTML ="";
    if(e.target.id =="Filtro"){
        DOM.Categorias.value = e.target.value;
    }
    if(e.target.id =="categorias"){
        DOM.Filtro.value = e.target.value;
    }
    if(e.target.value != "Todos"){
        catalogo.forEach(catalogo => {
            if(e.target.value == catalogo.categoria){
                let divImagen = document.createElement('div');
                divImagen.classList.add('imagen');
                lista_imagenes.insertAdjacentElement("beforeend", divImagen);
                let imagen = document.createElement('img');
                imagen.setAttribute('src', catalogo.src)
                imagen.setAttribute('id', catalogo.categoria)
                divImagen.insertAdjacentElement("afterbegin", imagen);
                divImagen.addEventListener('animationend',borrarImg );
            }
        });
    }
    else{
        imagenesInicio(catalogo);
    }
    

 }
 function seleccionar(e){
    let target = e.target;
    let imgSelect = document.querySelectorAll(".seleccionado");
    if(imgSelect.length>=1){
       DOM.DivCrud.setAttribute("hidden", true);
    }
    if(e.ctrlKey){

        if(target.tagName == 'IMG'){
            target.classList.toggle('seleccionado');
        }
    }
    else
    {
        
        imgSelect.forEach(e=>{
              e.classList.remove('seleccionado');
        })
        DOM.DivCrud.removeAttribute("hidden");
        if(target.tagName == 'IMG'){
            target.classList.toggle('seleccionado');

        }

    }
  }

function inicialAnimacion(){
    let imgSelect = document.querySelectorAll(".seleccionado");
    imgSelect.forEach(e=>{
        e.classList.add('InicioEliminar');  
    })
  

}
 function borrarImg(){
    let imgSelect = document.querySelectorAll(".seleccionado");
    imgSelect.forEach(e=>{
    if(e.classList.contains('InicioEliminar')){
          e.parentNode.remove(e);
          let pos = catalogo.findIndex(img=> img.src == e.src);
          catalogo.splice(pos, 1)  
      }
   })
   console.log(catalogo);
}

function AnnadirImagen(){
        let Link = DOM.InptLink.value;
        let Categoria= DOM.InptCate.value;
        let Equipo= DOM.InptEquipo.value;
        try {
            if(Link =="")
                throw "Campo obligatorio"
            if(Equipo=="")
                throw "Campo obligatorio"
            if(Categoria =="")
                 throw "Campo obligatorio"
            NuevaImagen ={id: catalogo.length+1, src:Link, equipo:Equipo, categoria:Categoria};
            catalogo.splice(catalogo.length,0,NuevaImagen);
            let divImagen = document.createElement('div');
            divImagen.classList.add('imagen');
            lista_imagenes.insertAdjacentElement("beforeend", divImagen);
            let imagen = document.createElement('img');
            imagen.setAttribute('src', NuevaImagen.src);
            imagen.setAttribute('id', NuevaImagen.categoria);
            divImagen.insertAdjacentElement("afterbegin", imagen);
        } catch (error) {
            mostrarError(error);
        }
}
function Editar(){
       let Link = DOM.InptLink.value;
        let Categoria= DOM.InptCate.value;
        let Equipo= DOM.InptEquipo.value;
        try {
            if(Link =="")
                throw "Campo obligatorio"
            if(Equipo=="")
                throw "Campo obligatorio"
            if(Categoria =="")
                 throw "Campo obligatorio"

            ImagenEditado ={id: catalogo.length+1, src:Link, equipo:Equipo, categoria:Categoria};
            let imgSelect = document.querySelector(".seleccionado");
            let pos = catalogo.findIndex(img=> img.src == imgSelect.src);
            catalogo.splice(pos,1,ImagenEditado);
            console.log(catalogo);
            imgSelect.src = ImagenEditado.src;
           // imagenesInicio(catalogo);
            
        } catch (error) {
            mostrarError(error);
        }

}
function mostrarError(msgError){ //funcion reutilizable de ejercicios anteriores
    DOM.error.innerHTML = `<span style="color:red">${msgError}</span>`
  }




