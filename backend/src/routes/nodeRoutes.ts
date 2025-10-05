import express from 'express';
import { createNode,getTree,deleteNode } from '../controllers/nodeController';

const nodeRouter = express.Router()

nodeRouter.post('/',createNode);
nodeRouter.get('/tree',getTree);
nodeRouter.delete('/:id',deleteNode);


export default nodeRouter