import { Offline, Online } from 'react-detect-offline'

import React, { Component } from "react"; 
import zango from 'zangodb'
import {DbCollections} from './database/DB.js'
class Form extends Component {
    constructor(){
        super()
        this.state = {
            documents:[]
        }
    }
    handleAction = () => {
        let docs = [
            { name: 'Frank', age: 20 },
            { name: 'Thomas', age: 33 },
            { name: 'Todd', age: 33 },
            { name: 'John', age: 28 },
            { name: 'Peter', age: 33 },
            { name: 'George', age: 28 }
    ]        
    let db = new zango.Db('mydb', { people: ['age'] })
    let people = db.collection('people');
    let arr2 = []
    people.insert(docs).then(() => {
        return people.find({
            name: { $ne: 'John' },
            age: { $gt: 20 }
        }).group({
            _id: { age: '$age' },
            count: { $sum: 1 }
        }).project({
            _id: 0,
            age: '$_id.age'
        }).sort({
            age: -1
        }).forEach(doc =>   {arr2.push(doc)})
    }).catch(error => console.error(error))

    this.setState({documents:arr2})
    } 
    renderObj = (documents) => { 
        console.log(documents)
        let obj
        let o
        for(obj of documents ){
            for(o in obj){
              console.log(o,obj[o])
            }
        }
    }
    render() {
        let {documents} = this.state
        return (
        <div>
            <button onClick={this.handleAction}><h1>BTN!!11</h1></button>

            <>
                {this.renderObj(documents)}
            </>
        </div>
    )
  }
}

export default Form;