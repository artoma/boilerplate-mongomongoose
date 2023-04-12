require('dotenv').config();
let mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  const Martin = new Person({
    name: 'Martin',
    age: 46,
    favoriteFoods: ['eggs', 'water', 'brad']
  })
  Martin.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};

const arrayOfPeople = [
  {name: 'Borko', age: 44, favoriteFoods: ['fish', 'meal']},
  {name: 'Peshko', age: 24, favoriteFoods: ['cake', 'ice']},
  {name: 'Mirko', age: 34, favoriteFoods: ['wind', 'water']},
  {name: 'Mishko', age: 45, favoriteFoods: ['jelo', 'tosh']}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, person) => {
    if (err) return console.log(err)
    done(null, person);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, person) => {
    if (err) return console.log(err)
    done(null, person);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err);
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    person.favoriteFoods.push(foodToAdd);
    person.save((err, savedPerson) => {
      if(err) return console.log(err)
      done(null, savedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{age:ageToSet}, {new: true}, (err, person) => {
    if(err) return console.log(err)
    done(null , person);
  });

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if(err) return console.log(err)
    done(null, person)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, result) => {
    if(err) return console.log(err)
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({name: 1, age: 0, favoriteFoods: 1}).exec((err, result) => {
    if(err) return console.log(err)
    done(err, result);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
