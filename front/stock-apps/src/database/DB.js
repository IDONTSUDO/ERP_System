import zango from 'zangodb'


export const DbCollections = async (docs) =>{
    let db = new zango.Db('mydb', { people: ['age'] })
    let people = db.collection('people');
   
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
        }).forEach(doc =>   {console.log(doc)})
    }).catch(error => console.error(error))
}
