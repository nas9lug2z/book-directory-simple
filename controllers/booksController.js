const fs = require('fs');

const bestBooks = JSON.parse(fs.readFileSync(`${__dirname}/../data/best-books.json`));

//middleware
exports.checkID = (req, res, next) => {
	const id = Number(req.params.id);
	const book = bestBooks.find(elem => elem.id === id);
	if (!book) {
		return res.status(404).json({
			status: 'fail',
			message: 'ID not found',
		});
	}
	next();
};

exports.checkPostFields = (req, res, next) => {
	const id = Number(req.params.id);
	const changes = req.body;

	//leave only existing fields from JSON:
	const changesParams = Object.keys(changes);

	for (let parameter of changesParams) {
		if (!bestBooks[0].hasOwnProperty(parameter)) {
			return res.status(404).json({
				status: 'fail',
				message: 'Invalid parameter(s)',
			});
		}
	}
	next();
};

exports.getAllBooks = (req, res) => {
	res.status(200).json({
		status: 'sucess',
		results: bestBooks.length,
		data: {
			bestBooks,
		},
	});
};

exports.createBook = (req, res) => {
	const newID = bestBooks.length + 1;
	const newBook = Object.assign({ id: newID }, req.body);
	bestBooks.push(newBook);
	fs.writeFile(`${__dirname}/../data/best-books.json`, JSON.stringify(bestBooks), err => {
		res.status(201).json({
			status: 'sucess',
			message: {
				new_book: newBook,
			},
		});
	});
};

exports.getBookById = (req, res) => {
	const book = bestBooks.find(elem => elem.id === Number(req.params.id));
	res.status(200).json({
		status: 'sucess',
		data: {
			book: book,
		},
	});
};

exports.updateBook = (req, res) => {
	const id = Number(req.params.id);
	const book = bestBooks.find(elem => elem.id === id);
	const changes = req.body;

	//leave only existing fields from JSON:
	const changesParams = Object.keys(changes);
	for (let paramether of changesParams) {
		if (!book.hasOwnProperty(paramether)) {
			delete changes[paramether];
		}
	}

	const updatedBook = Object.assign(book, changes);
	bestBooks.splice(bestBooks.indexOf(book), 1, updatedBook);

	fs.writeFile(`${__dirname}/../data/best-books.json`, JSON.stringify(bestBooks), err => {
		res.status(201).json({
			status: 'sucess',
			message: 'The book has been updated.',
			new_data: updatedBook,
		});
	});
};

exports.deleteBook = (req, res) => {
	const id = Number(req.params.id);
	const book = bestBooks.find(elem => elem.id === id);
	// const index = bestBooks.indexOf(book);
	// delete bestBooks[index];

	bestBooks.splice(bestBooks.indexOf(book), 1);
	console.log(bestBooks);

	fs.writeFile(`${__dirname}/../data/best-books.json`, JSON.stringify(bestBooks), err => {
		res.status(201).json({
			status: 'sucess',
			message: 'The book has been deleted.',
		});
	});
};
