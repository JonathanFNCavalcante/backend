const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml'); 
const path = require('path');
const router = express.Router();

const swaggerFilePath = path.join(__dirname, '../swagger.yaml');
const file = fs.readFileSync(swaggerFilePath, 'utf8');

const swaggerDocument = YAML.parse(file);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;