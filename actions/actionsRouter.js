const express = require('express');
const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
	Actions.get()
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((error) => {
			res.status(500).json({ errorMessage: 'Error getting actions' });
		});
});

router.post('/:id', validateProjectId, validateProject, (req, res) => {
	req.body.project_id = req.projects.id;
	Projects.insert(req.body)
		.then((posted) => {
			res.status(201).json({ message: 'Created' });
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: ' an error occured while making new action' });
		});
});

//custom middleware
function validateProjectId(req, res, next) {
	const { id } = req.params;
	Projects.getProjectActions(id).then((user) => {
		if (user) {
			req.user = user;
			next();
		} else {
			res.status(400).json({ errorMessage: 'invalid id' });
		}
	});
}

function validateProject(req, res, next) {
	if (!Object.keys(req.body).length === 0) {
		res.status(400).json({ message: 'missing project data' });
	} else if (!req.body.project_id || !req.body.description || !req.body.notes) {
		res
			.status(400)
			.json({ message: 'missing required name and desctiption and notes' });
	} else {
		next();
	}
}

module.exports = router;
