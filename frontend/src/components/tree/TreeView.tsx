import React, { useEffect, useState, Suspense } from "react";
import { getTree,createNode } from "../../api/nodeApi";
import toast from "react-hot-toast";
import { Card } from "../ui/card";
import { Loader } from "lucide-react";
import InputField from "../input/Input";

const TreeNode = React.lazy(() => import("./TreeNode"));

const TreeView: React.FC = () => {
  const [tree, setTree] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rootName, setRootName] = useState("");

  const fetchTree = async () => {
    setLoading(true);
    try {
      const res = await getTree();
      setTree(res.data.tree);
    } catch {
      toast.error("Failed to fetch tree");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTree();
  }, []);

  const handleAddRoot = async () => {
    if (!rootName.trim()) return;
    await createNode(rootName);
    toast.success("Root node added");
    setRootName("");
    fetchTree();
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto my-8 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Recursive Node Tree</h2>
      <InputField
        placeholder="Add root node..."
        value={rootName}
        onChange={setRootName}
        onSubmit={handleAddRoot}
      />
      {loading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <div className="mt-4">
            {tree.map((node) => (
              <TreeNode key={node._id} node={node} refreshTree={fetchTree} />
            ))}
          </div>
        </Suspense>
      )}
    </Card>
  );
};

export default TreeView;
