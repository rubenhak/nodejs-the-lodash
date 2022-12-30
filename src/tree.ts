export class Node<T>
{
    public value : T;
    public left : Node<T> | null;
    public right : Node<T> | null;

    constructor(value : T, left : Node<T> | null, right : Node<T> | null) {
      this.value = value;
      this.left = left ?? null;
      this.right = right ?? null;
    }
}

export type NodeHandler<T> = (value: T, node: Node<T>) => void;
  
export function traverseTreeInOrder<T>(node : Node<T> | null, handler: NodeHandler<T>)
{
    if (node == null) {
        return;
    }
    traverseTreeInOrder(node.left, handler);
    handler(node.value, node);
    traverseTreeInOrder(node.right, handler);
}

export function traverseTreePreOrder<T>(node : Node<T> | null, handler: NodeHandler<T>) {
    if (node == null) {
        return;
    }
    handler(node.value, node);
    traverseTreeInOrder(node.left, handler);
    traverseTreeInOrder(node.right, handler);
}

export function traverseTreePostOrder<T>(node : Node<T> | null, handler: NodeHandler<T>)
{
    if (node == null) {
        return;
    }
    traverseTreeInOrder(node.left, handler);
    traverseTreeInOrder(node.right, handler);
    handler(node.value, node);
}

export function depthFirstSearch<T>(node : Node<T> | null, target: T) : Node<T> | null
{
    if (!node) return null;
    if (node.value === target)
        return node;
    
    const left = depthFirstSearch(node.left, target);
    if (left != null)
        return left;

    const right = depthFirstSearch(node.right, target);
    return right;
}