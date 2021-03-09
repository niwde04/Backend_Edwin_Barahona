//Inicializador del elemento Slider
var dataJson = [];
var desde = 0;
var hasta = 0;

$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$",

  onFinish: function (data) {
    desde = data.from
    hasta = data.to

  },

  onStart: function (data) {
    desde = data.from
    hasta = data.to

  }

})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
      $('#buscar').text("Ver Todos")
    } else {
      this.customSearch = false
      $('#buscar').text("Busqueda Pesonalizada")
    }
    $('#personalizada').toggleClass('invisible')

  })
}

setSearch()


//traer datos
$(document).ready(function () {

  $.get("http://localhost:3000/casas/", function (data, status) {
    dataJson = data;


    let renderCiudad = llenarSelect(dataJson, "Ciudad");

    for (let i = 0; i < renderCiudad.length; i++) {

      $("#ciudad").append(`<option value= ${renderCiudad[i]} > ${renderCiudad[i]} </option>`)
    }

    let renderTipo = llenarSelect(dataJson, "Tipo");

    for (let i = 0; i < renderTipo.length; i++) {

      $("#tipo").append(`<option value= ${renderTipo[i]} > ${renderTipo[i]} </option>`)
    }


    $('select:not([multiple])').material_select();
  });


  $("#buscar").click(function () {

    limpiarBusqueda()


    if ($("#buscar").text() == "Ver Todos") {
      renderCasas(dataJson)

    } else {

      $.get("http://localhost:3000/casas/", function (data, status) {

        let rangoCasas = [];
        for (let i = 0; i < data.length; i++) {

          data[i].Precio = parseInt((data[i].Precio).replace("$", "").replace(",", ""))

          let ciudadBusqueda = $("#ciudad option:selected").text();
          let tipoBusqueda = $("#tipo option:selected").text();

          console.log((data[i].Ciudad).trim() +''+ ciudadBusqueda.trim())

          if ((  data[i].Precio > desde && data[i].Precio < hasta) && (data[i].Ciudad).trim() == ciudadBusqueda.trim() && (data[i].Tipo).trim() == tipoBusqueda.trim()) {
           console.log("entra")
            rangoCasas.push(data[i]);
          }
        }

      
        limpiarBusqueda()
        renderCasas(rangoCasas)

      })


    }

  });
})

function llenarSelect(data, h) {

  let ciudadBusqueda = [];

  for (i = 0; i < data.length; i++) {

    if (h == "Ciudad") {
      ciudadBusqueda.push(data[i].Ciudad);
    } else {
      ciudadBusqueda.push(data[i].Tipo);
    }

  }

  const unicos = ciudadBusqueda.filter((valor, indice) => {
    return ciudadBusqueda.indexOf(valor) === indice;
  })

  let ciudadOrdenada = unicos.sort()

  return ciudadOrdenada;
}




function renderCasas(data) {

  for (let i = 0; i < data.length; i++) {
    $("#l1").append(`

    <div class="card horizontal">
    <div class="card-image">
      <img src="img/home.jpg">
    </div>
    <div class="card-stacked">
      <div class="card-content">
        <div>
          <b>Direccion: ${data[i].Direccion} </b><p></p>
        </div>
        <div>
          <b>Ciudad: ${data[i].Ciudad} </b><p></p>
        </div>
        <div>
          <b>Telefono: ${data[i].Telefono} </b><p></p>
        </div>
        <div>
          <b>Código postal: ${data[i].Codigo_Postal} </b><p></p>
        </div>
        <div>
          <b>Precio: ${data[i].Precio} </b><p></p>
        </div>
        <div>
          <b>Tipo: ${data[i].Tipo}</b><p></p>
        </div>
      </div>
      <div class="card-action right-align">
        <a href="#">Ver más</a>
      </div>
    </div>
  </div>
    
    `)
  }

}

function limpiarBusqueda() {

  $("#l1").empty();


}