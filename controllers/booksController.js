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
