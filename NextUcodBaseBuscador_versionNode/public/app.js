
//Inicializador del elemento Slider
var jsonData = []


//traer datos
$(document).ready(function () {
  $('select:not([multiple])').material_select();
  $.get("http://localhost:3000/casas/", function (data, status) {

    for (let i = 0; i < data.length; i++) {
      data[i].Precio = parseInt((data[i].Precio).replace("$", "").replace(",", ""))
    }
    jsonData = data
  });

  $("#buscar").click(function () {
    renderCasas(jsonData);
  });

})

$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
<<<<<<< HEAD
  prefix: "$",

  onFinish: function (data) {
    let desde = data.from
    let hasta = data.to


    let rangoCasas = [];
    
    for (let i = 0; i < jsonData.length; i++) {
      console.log(jsonData[i].Precio)
      if (jsonData[i].Precio > desde && jsonData[i].Precio < hasta) {

        jsonData[i].Precio = (new Intl.NumberFormat('ja-JP', {
          style: 'currency',
          currency: 'USD'
        }).format(jsonData[i].Precio))

        rangoCasas.push(jsonData[i]);

      }
    }

console.log(rangoCasas)
    limpiarBusqueda()
    renderCasas(rangoCasas)
    

  }
=======
  prefix: "$"
>>>>>>> parent of a580acd (BusquedaRango)
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


<<<<<<< HEAD

=======
//traer datos



  $(document).ready(function(){
    $("#buscar").click(function(){
      $.get("http://localhost:3000/casas/", function(data, status){
>>>>>>> parent of a580acd (BusquedaRango)

      //console.log(JSON.stringify(data))


        //alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);

        $("#l1").append(`

        <div class="card horizontal">
        <div class="card-image">
          <img src="img/home.jpg">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <div>
              <b>Direccion: ${data[0].Direccion} </b><p>  </p>
            </div>
            <div>
              <b>Ciudad: ${data[0].Ciudad} </b><p>  </p>
            </div>
            <div>
              <b>Telefono: ${data[0].Telefono} </b><p></p>
            </div>
            <div>
              <b>Código postal: ${data[0].Codigo_Postal} </b><p></p>
            </div>
            <div>
              <b>Precio: ${data[0].Precio} </b><p></p>
            </div>
            <div>
              <b>Tipo: ${data[0].Casa}</b><p></p>
            </div>
          </div>
          <div class="card-action right-align">
            <a href="#">Ver más</a>
          </div>
        </div>
      </div>
        
        `)


      });
    });
  



})

