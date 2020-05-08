const express = require('express');
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
	Projects.get()
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((error) => {
			res.status(500).json({ errorMessage: 'Error getting projects' });
		});
});

module.exports = router;
