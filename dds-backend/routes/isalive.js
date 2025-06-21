import express from 'express';
const router = express.Router();

router.get('/_isalive', (req, res) => {
  res.status(200).send(`Ejecutandose desde: ${process.cwd()}`);
});

export default router;