//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$",

  onFinish: function (data) {
    let desde = data.from
    let hasta = data.to



    $.get("http://localhost:3000/casas/", function (data, status) {


      let rangoCasas = [];
      let jsonData = data;
      
      for (let i = 0; i < jsonData.length; i++) {
        jsonData[i].Precio = parseInt((jsonData[i].Precio).replace("$", "").replace(",", ""))
        if (jsonData[i].Precio > desde && jsonData[i].Precio < hasta) {
          
         
          jsonData[i].Precio = (new Intl.NumberFormat('ja-JP',{style: 'currency', currency: 'USD'}).format(jsonData[i].Precio))

          rangoCasas.push(jsonData[i]);


        }
      }

      

      limpiarBusqueda()
      renderCasas(rangoCasas)


    });

  }
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()


//traer datos
$(document).ready(function () {
  $('select:not([multiple])').material_select();
  $("#buscar").click(function () {

    $.get("http://localhost:3000/casas/", function (data, status) {

      renderCasas(data);

    });
  });

})

function limpiarBusqueda() {

  $("#l1").empty();
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