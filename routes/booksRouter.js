const express = require('express');
const booksController = require('../controllers/booksController');

const router = express.Router();

//middleware for the router
router.param('id', booksController.checkID);

router.route('/').get(booksController.getAllBooks).post(booksController.checkPostFields, booksController.createBook);
router
	.route('/:id')
	.get(booksController.getBookById)
	.patch(booksController.checkPostFields, booksController.updateBook)
	.delete(booksController.deleteBook);

module.exports = router;
