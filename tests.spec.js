//var app = require('./server');
var nock = require('nock');
var chai = require('chai');
var request = require('supertest');
var bodyParser = require('body-parser')

var expect = chai.expect;

//var auth = {'Authorization': 'Token MW9S-E7SL-26DU-VV8V', 'Content-Type': 'application/json'};

describe('API tests', function() {
  it('should have return bart.gov api result', function(done) {
    request('api.bart.gov')
      //.get('/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
   //   nock('api.bart.gov')
      .get('/api/stn.aspx?cmd=stninfo&orig=24th&key=MW9S-E7SL-26DU-VV8V&json=y')
      //.get('/api/sched.aspx?cmd=stnsched&orig=12th&key=MW9S-E7SL-26DU-VV8V&l=1&json=y')
      .end(function(err, res) {
      console.log("res.body");
      console.log(res.body);
      //console.log(res.body)
      console.log("stringyfy json");
      console.log(JSON.stringify(res.body));
      var jsonResponse = res.body;
      var info = jsonResponse['root'].stations.station;
     // var info = jsonResponse['root'].stations.station.north_routes.route[0];
     //var info;
//     for(var i=0;i<10;i++)
//     {
//      info = jsonResponse['root'].station.item[i];
//      console.log("extract info trains");
//       console.log(info);
//       info = 0;
//     }

   // info = jsonResponse['root'].station.item[0];
    console.log("extract info trains");
    console.log(info);
    expect(res.statusCode).to.be.equal(200);
    console.log(info.name);
    //expect(info.name).to.be.equal('24th St. Mission');
//


      //var jsonRes = bodyParser.json();
      //console.log("jsonRes");
      //console.log(jsonRes);
      //JSONParser parse = new JSONParser();

      //JSONObject jObj = (JSONObject)parse.parse(jsonResponse);
      //jsonResponse[stations[0]];
        //expect(res.body.version).to.be.ok;
       //expect(res.body.message).to.be.equal('Success');
        done();
      });
  });

  it('should have return bart.gov api mock result', function(done) {
        nock('http://api.bart.gov')
        .get('/api/stn.aspx?cmd=stninfo&orig=24th&key=MW9S-E7SL-26DU-VV8V&json=y')
        .reply(200, {
                "status": 200,
                "message": "This is a mocked bart api response"
              });

            request('http://api.bart.gov')
            .get('/api/stn.aspx?cmd=stninfo&orig=24th&key=MW9S-E7SL-26DU-VV8V&json=y')
            .end(function (err, res) {
            console.log(res.body.status);
            console.log(res.body.message);
            //assert that the mocked response is returned
            expect(res.body.status).to.equal(200);
            expect(res.body.message).to.equal("This is a mocked bart api response");
           done();
           });
        });

});
