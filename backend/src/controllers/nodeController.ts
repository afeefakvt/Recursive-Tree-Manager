import { Request,Response,NextFunction } from "express";
import Node,{INode} from "../models/node";
import { createHttpError } from "../utils/httpError";
import { HttpStatus } from "../constants/httpStatus";
import { Types } from "mongoose";


interface ITreeNode extends INode {
  children?: ITreeNode[];
}

export const createNode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, parentId } = req.body;

    if (!name) {
      return next(createHttpError(HttpStatus.BAD_REQUEST, "Node name is required"));
    }

    const node = await Node.create({ name, parentId: parentId || null });
    res.status(HttpStatus.CREATED).json({ success: true, node });
  } catch (error) {
    next(error);
  }
};


export const getTree = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const nodes = await Node.find().lean();

    const buildTree = (parentId: string | null = null): ITreeNode[] => {
      return nodes
        .filter((node) => String(node.parentId || null) === String(parentId))
        .map((node) => ({
          ...node,
          children: buildTree(String(node._id)),
        }));
    };

    const tree = buildTree(null);
    res.status(HttpStatus.OK).json({ success: true, tree });
  } catch (error) {
    next(error);
  }
};


export const deleteNode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

     if (!id) {
      return next(createHttpError(HttpStatus.BAD_REQUEST, "Node ID is required"));
    }

    const node = await Node.findById(id);
    if (!node) {
      return next(createHttpError(HttpStatus.NOT_FOUND, "Node not found"));
    }

    const deleteRecursively = async (nodeId: string): Promise<void> => {
      const children = await Node.find({ parentId: nodeId });
      for (const child of children) {
        await deleteRecursively((child._id as Types.ObjectId).toString());
      }
      await Node.findByIdAndDelete(nodeId);
    };

    await deleteRecursively(id);

    res.status(HttpStatus.OK).json({ success: true, message: "Node and its children deleted" });
  } catch (error) {
    next(error);
  }
};