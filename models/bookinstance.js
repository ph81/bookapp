const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

//enum: This allows us to set the allowed values of a string. In this case, we use it to specify the availability status of our books
// default: We use default to set the default status for newly created bookinstances to maintenance and the default due_back date to now
const BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/bookinstance/' + this._id;
});

// Virtual for due_back_formatted
BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return this.due_back ? moment(this.due_back).format('YYYY-MM-DD') : '';
});



//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);