import * as express from 'express'; //Express does routing
//Controllers : they contain the req. fucntions!
import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
//Models Contain Schema for insertions!
import Cat from './models/cat';
import User from './models/user';
import  * as generateSchema from 'generate-schema';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as mongodb from 'mongodb';
import * as GenerateSchema from 'generate-schema';
var MongoClient = mongodb.MongoClient;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




/** HTTP REQ TUTORIAL.

SINGLE REDIRECTION NO NEED FOR SERVER PROCESSES:
import { Router } from '@angular/router';
IF THERE IS ALREADY A CONSTRUCTOR then in the parameters,
add:  private router: Router
ex : constructor( private router: Router){ }
(also refer example mentioned in the next section)

then redirect with
this.router.navigate(['path'])

makesure path is mentioned client/app/routing.module.ts

CLIENT SIDE -->  SERVER SIDE processing:

In the component.ts/service.ts file :

import @angular componets
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

Then inside export class add the following

private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
private options = new RequestOptions({ headers: this.headers });

IF THERE IS ALREADY A CONSTRUCTOR then in the parameters,
add: , private http: Http

constructor( private http: Http){
..
}
 separate with commas if nessc.

 jsonData=JSON.parse('{"data" :"'+ <your_data> +'"}');

 return this.http.post('/api/<link>', jsonData).subscribe(
    res => {res.json();
      console.log(res.json());
      let resProc = res.json();
});

post req : this.http.post('api/url', JSON.stringify(data), this.options)
get req: return this.http.post('/api/url', JSON.stringify(data), this.options);

**/

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  //define routes & methods based on Controller"
  // cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  const schemagen = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    script: String,
    widgetData: [],
    ngarray: [String],
    quest: [String]
            });
// if model  name = mod then default collection name = mods
const  mod =  mongoose.model('mod', schemagen);

  //FormShowService
  router.route('/formgen').post(
      (req, res) => {
        console.log("data entered");
    //    console.log((req))
      console.log(req.body);
      let item = new mod();
      item.ngarray = req.body.ngarr;
      item.quest = req.body.ques;
      item.script = req.body.data;

      item.widgetData = req.body.jsonvals;
      console.log(item.widgetdata);
      item.script = req.body.data;

      item._id= new mongodb.ObjectID();
      //console.log(item);
      console.log('ITEM BELOW');
      console.log(item);

      item.save((err) => {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
              res.sendStatus(400);
            }
            if (err) {
              return console.error(err);
            }
            res.status(200).json(item);
          });
    }

  );

  router.route('/getInfo').post(
      (req, res) => {
        console.log('_______________');
        console.log(req.body.data);
        let item = new mod();
        item._id = new mongodb.ObjectID(req.body.data);
        console.log(item);
        mod.find({_id: item._id }, (err, docs) => {
            if (err){
              return console.log(err);
            } else{
              return res.status(200).json(docs);
            }

      });
    });

  let tempmod;

  router.route('/insert').post(
    (req, res)=>{
      console.log(req.body);
      delete mongoose.models['tempmod'];
      let tempschem= new mongoose.Schema(GenerateSchema.mongoose(req.body.data));
//      console.log(req.body.id);
      let id = 'tbl'+req.body.id
      // id = tbl3275678dsuhf
       tempmod = mongoose.model('tempmod', tempschem, id);

      let item= new tempmod(req.body.data);

      item.save((err) => {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
              res.sendStatus(400);
            }
            if (err) {
              return console.error(err);
            }
            res.status(200).json(item);
          });


    });

// FETCH Code

    router.route('/fetch').post(
      (req, res) => {
          let id = req.body.id;
          MongoClient.connect('mongodb://<shankar>:<1234>@ds149711.mlab.com:49711/learnmean', function(err: mongodb.MongoError, db: mongodb.Db) {
            if (err) throw err;
            id = 'tbl'+id;
            var collection = db.collection(id);
            // Locate all the entries using find
            collection.find({}).toArray(function(err: mongodb.MongoError, results: any) {
              res.status(200).json(results);
              //Let's close the db
              });
              db.close();
    }); //close connection

});
//end of fetch!

  // Apply the routes to our application with the prefix /api
  //this is used to direct all incoming http reqs to router, defined above
    app.use('/api', router);

}
