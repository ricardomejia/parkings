var superagent = require('superagent')
var expect = require('expect.js')

describe('express rest api server', function(){
  var id

  it('posts an object', function(done){
    superagent.post('http://localhost:3000/collections/parkings')
      .send({ "nombre" : "nombre parking 4",
        "hora_apertura" : "07:00",
        "hora_cierre" : "20:00",
        "plazas_totales" : 300,
        "plazas_libres" : 20,
        "dias_abierto" : [
          "lunes",
          "martes",
          "miercoles",
          "jueves",
          "viernes",
          "sabado",
          "domingo"
        ],
        "latitud_gps" : 50.455,
        "longitud_gps" : 10.672
    })
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.eql(1)
        expect(res.body[0]._id.length).to.eql(24)
        id = res.body[0]._id
        done()
      })
  })

  it('retrieves an object', function(done){
    superagent.get('http://localhost:3000/collections/parkings/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)
        expect(res.body._id).to.eql(id)
        done()
      })
  })

  it('retrieves a collection', function(done){
    superagent.get('http://localhost:3000/collections/parkings')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.be.above(0)
        expect(res.body.map(function (item){return item._id})).to.contain(id)
        done()
      })
  })

  it('updates an object', function(done){
    superagent.put('http://localhost:3000/collections/parkings/'+id)
      .send({ "nombre" : "nombre parking 5",
        "hora_apertura" : "07:00",
        "hora_cierre" : "20:00",
        "plazas_totales" : 300,
        "plazas_libres" : 20,
        "dias_abierto" : [
          "lunes",
          "martes",
          "miercoles",
          "jueves",
          "viernes",
          "sabado",
          "domingo"
        ],
        "latitud_gps" : 50.455,
        "longitud_gps" : 10.672
    })
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.msg).to.eql('success')
        done()
      })
  })

  it('checks an updated object', function(done){
    superagent.get('http://localhost:3000/collections/parkings/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)
        expect(res.body._id).to.eql(id)
        expect(res.body.nombre).to.eql('nombre parking 4')
        done()
      })
  })
  it('removes an object', function(done){
    superagent.del('http://localhost:3000/collections/parkings/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.msg).to.eql('success')
        done()
      })
  })
})
