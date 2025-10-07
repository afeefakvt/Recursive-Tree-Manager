import React, { useState } from "react";
import { ChevronRight, ChevronDown, Trash } from "lucide-react";
import { Button } from "../ui/button";
import InputField from "../input/Input";
import { createNode,deleteNode } from "../../api/nodeApi";
import toast from "react-hot-toast";

interface TreeNodeProps {
  node: any;
  refreshTree: () => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, refreshTree }) => {
  const [expanded, setExpanded] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newNodeName.trim()) return;
    setLoading(true);
    try {
      await createNode(newNodeName);
      toast.success("Node added!");
      setNewNodeName("");
      refreshTree();
    } catch {
      toast.error("Failed to add node");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this node and all its children?")) return;
    setLoading(true);
    try {
      await deleteNode(node._id);
      toast.success("Node deleted");
      refreshTree();
    } catch {
      toast.error("Failed to delete node");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-4 border-l border-gray-300">
      <div className="flex items-center gap-2 py-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="p-1"
        >
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </Button>
        <span className="font-medium">{node.name}</span>
        <Button variant="ghost" size="icon" onClick={handleDelete} disabled={loading}>
          <Trash size={16} />
        </Button>
      </div>

      {expanded && (
        <div className="ml-6">
          {node.children?.map((child: any) => (
            <TreeNode key={child._id} node={child} refreshTree={refreshTree} />
          ))}
          <InputField
            placeholder="Add child..."
            value={newNodeName}
            onChange={setNewNodeName}
            onSubmit={handleAdd}
          />
        </div>
      )}
    </div>
  );
};

export default TreeNode;
