const express = require('express');
const fs = require('fs');

const bestBooks = JSON.parse(fs.readFileSync(`${__dirname}/../data/best-books.json`));

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
	console.log(req.body);
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
	const oldBook = bestBooks.find(elem => elem.id === id);
	const changes = req.body;
	const updatedBook = Object.assign(oldBook, changes);
	bestBooks.splice(bestBooks.indexOf(oldBook), 1, updatedBook);
	console.log(bestBooks[bestBooks.indexOf(oldBook)]);

	fs.writeFile(`${__dirname}/../data/best-books.json`, JSON.stringify(bestBooks), err => {
		res.status(201).json({
			status: 'sucess',
			message: 'The book has been updated.',
			new_data: updatedBook,
		});
	});
};

exports.deleteBook = (req, res) => {};
