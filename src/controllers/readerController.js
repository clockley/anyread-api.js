const { JSDOM } = require('jsdom');
const Readability = require('readability');
const errors = require('request-promise-native/errors');
const parserRepository = require('../repositories/parserRepository');
const logger = require('../../utils/logger');

exports.parseUrl = async (req, res) => {
  const { query } = req;

  if (!query || !query.url) {
    const err = 'No URL provided';
    logger.log(err, 'debug');
    return res.status(400).send({
      error: err,
      success: false
    });
  }

  const { url } = query;

  try {
    const urlContent = await parserRepository.getUrlContent(url);
    const dom = new JSDOM(urlContent, { url });
    const parsedContent = new Readability(dom.window.document).parse();

    const response = {
      article: parsedContent,
      success: true
    };

    return res.status(200).send(response);
  }
  catch (e) {
    logger.log(e.stack, 'debug');

    if (e instanceof errors.RequestError) {
      if (e.message.includes('Invalid URI')) {
        return res.status(404).send({
          error: 'URL provided is not a valid URL',
          success: false
        });
      }
    }

    return res.status(500).send({
      error: 'Could not parse the URL provided',
      success: false
    });
  }
};

exports.parseFile = (req, res) => {
  const { query } = req;

  file = req.files.file;

  if (!query || !file) {
    const err = 'No file provided';
    logger.log(err, 'debug');
    return res.status(400).send({
      error: err,
      success: false
    });
  }

  try {
    const fileContent = file.data;
    const dom = new JSDOM(fileContent);
    const parsedContent = new Readability(dom.window.document).parse();

    const response = {
      article: parsedContent,
      success: true
    };

    return res.status(200).send(response);
  }
  catch (e) {
    logger.log(e.stack, 'debug');

    if (e instanceof errors.RequestError) {
      if (e.message.includes('Invalid URI')) {
        return res.status(404).send({
          error: 'URL provided is not a valid URL',
          success: false
        });
      }
    }

    return res.status(500).send({
      error: 'Could not parse the URL provided',
      success: false
    });
  }
};