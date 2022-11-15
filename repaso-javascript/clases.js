class Coche {
  constructor(modelo, velocidad, antiguedad) {
    this.modelo = modelo;
    this.velocidad = velocidad;
    this.antiguedad = antiguedad;
  }

  aumentarVelocidad() {
    this.velocidad += 1;
  }

  reducirVelocidad() {
    this.velocidad -= 1;
  }
}

var coche1 = new Coche("BMW", 200, 2017);
var coche2 = new Coche("Audi", 100, 2018);
var coche3 = new Coche("Mercedes", 200, 2017);
var coche4 = new Coche("Mustang", 200, 2017);

console.log(coche1.velocidad);
coche1.aumentarVelocidad();
console.log(coche1.velocidad);
