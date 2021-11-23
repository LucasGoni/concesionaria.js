const autos = require("./autos");
const personas = require("./personas");
const concesionaria = {
  autos: autos,
  personas: personas,
  buscarAuto: function (patente) {
    const autoBuscado = this.autos.find((auto) => auto.patente === patente);
    return autoBuscado ? autoBuscado : null;
    //
  },
  venderAuto: function (patente) {
    const auto = this.buscarAuto(patente);
    if (auto) {
      return (auto.vendido = true);
    } else {
      return null;
    }
  },

  autosParaLaVenta: function () {
    return this.autos.filter((auto) => auto.vendido === false);
    /* Ejemplo de un código más largo
    autosParaLaVenta: function () { 
    let autosParaLaVenta = this.autos.filter(function (elemento) {
      return elemento.vendido == false;
    });
    return autosParaLaVenta; 
  }*/
  },

  autosNuevos: function () {
    return this.autosParaLaVenta().filter((auto) => auto.km <= 100);
  },

  listaDeVentas: function () {
    let autosVendidos = this.autos.filter(function (elemento) {
      return elemento.vendido == true;
    });

    return autosVendidos.map((auto) => auto.precio);
  },

  totalDeVentas: function () {
    return this.listaDeVentas().reduce((acc, el) => acc + el, 0);
    /* Ejemplo de un código más largo
   totalDeVentas: function () { 
   let totalDeVentas = this.listaDeVentas().reduce(function (acc, el) {
      return acc + el;
    }, 0);
    return totalDeVentas;
  } 
  En ambos casos, agrego un 0 dentro de los parametros del reduce() para que no de error si la lista está vacía.
  */
  },

  puedeComprar: function (autos, personas) {
    if (
      autos.precio < personas.capacidadDePagoTotal &&
      personas.capacidadDePagoEnCuotas > autos.precio / autos.cuotas
    ) {
      return true;
    } else return false;
  },

  autosQuePuedeComprar: function (persona) {
    return this.autosParaLaVenta().filter((auto) =>
      this.puedeComprar(auto, persona)
    );
  },
};

console.log(
  concesionaria.puedeComprar(concesionaria.autos[0], concesionaria.personas[0])
);
