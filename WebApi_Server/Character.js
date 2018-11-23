const mongoose = require('mongoose');
const db =
  'mongodb://ykwong997:ljyk180426@ds027761.mlab.com:27761/assignment_yeekhang';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  peopleId: { type: Number },
  name: { type: String },
  gender: { type: String },
  culture: { type: String },
  born: { type: String },
  aliases: { type: String },
  father: { type: String },
  mother: { type: String },
  spouse: { type: String },
  people_image: { type: String }
});

const Character = mongoose.model('Character', schema, 'PeopleList');

module.exports = Character;
