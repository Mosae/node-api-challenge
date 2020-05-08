const express = require('express');
const Projects = require('../data/helpers/projectModel');
//const Projects = require('../data/seeds/01-projects');
const Actions = require('../data/helpers/actionModel');
const router = express.Router();

//GET
router.get('/', (req, res) => {
	Projects.get()
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((error) => {
			res.status(500).json({ errorMessage: 'Error getting projects' });
		});
});

//POST
router.post('/', (req, res) => {
	if (!req.body.name || !req.body.description) {
		res
			.status(400)
			.json({ errorMessage: 'Please provide name and description' });
	} else {
		Projects.insert(req.body)
			.then((project) => {
				res.status(200).json({ message: ' Created' });
			})
			.catch((error) => {
				console.log(err);
				res.status(400).json({
					errorMessage: 'There was a problem creating this post',
				});
			});
	}
});

//router.put('/:id')
module.exports = router;
//
//
