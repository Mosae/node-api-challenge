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

router.post('/', validateProjectId, validateBody, (req, res) => {
	Actions.insert(req.body)
		.then((posted) => {
			if (posted) {
				res.status(201).json({ message: 'Action Created' });
			}
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: 'an error occured while making new action' });
		});
});

router.put('/:id', validateProjectId, validateBody, (req, res) => {
	const { id } = req.params;
	Actions.update(id, req.body)
		.then((posted) => {
			if (posted) {
				res.status(201).json(posted);
			}
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: ' an error occured while making new action' });
		});
});

router.delete('/:id', validateProjectId, (req, res) => {
	Actions.remove(req.params.id)
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((err) => {
			res
				.status(400)
				.json({ errorMessage: 'There was a problem deleting actions' });
		});
});

//custom middleware
function validateProjectId(req, res, next) {
	const { id } = req.params;
	Projects.get(req.body.project_id)
		.then((data) => {
			if (data) {
				req.project = data;
				next();
			} else {
				res.status(400).json({ errorMessage: 'invalid id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'error getting project' });
		});
}

function validateBody(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: 'missing data' });
		return true;
	}
	if (!req.body.notes || !req.body.description) {
		res.status(400).json({ message: 'missing required field' });
		return true;
	}
	if (req.body.description.length > 128) {
		res.status(400).json({ message: 'description is too long' });
		return true;
	}
	if (req.body.completed !== undefined) {
		req.body.completed = !!Number(req.body.completed);
	}
	next();
}

module.exports = router;
