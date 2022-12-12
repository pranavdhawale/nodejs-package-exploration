const mongoose = require('mongoose')
const Schema = mongoose.Schema

// // Schema -> "what will the data in this collection look like?" 
// // Model -> "Add a new document to the collection"

// const personSchema = new Schema({
//     name: {
//         first: String,
//         last: String
//     }
// })

// const Person = mongoose.model('Person', personSchema)
// const pranav = new Person({
//     name: {
//         first: 'Pranav',
//         last: 'Dhawale'
//     }
// })

// console.log(pranav.name.first, pranav.name.last);


const personSchema = new Schema({
    name: {
      first: String,
      last: String
    }
  }, {
    virtuals: {
      fullName: {
        get() {
          return this.name.first + ' ' + this.name.last;
        }
      }
    }
  });

const Person = mongoose.model('Person', personSchema)
const pranav = new Person({
    name: {
        first: 'Pranav',
        last: 'Dhawale'
    }
})

// Or by using the virtual method as following:  
personSchema.virtual('fullName').get(function() {
    return this.name.first + ' ' + this.name.last;
});

console.log(pranav.fullName);