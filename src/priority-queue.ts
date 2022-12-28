export class PriorityQueue<T> 
{
  private _heap: PriorityQueueNode<T>[] = []

  public get isEmpty() 
  {
    return this._heap.length == 0;
  }

  public get size() {
    return this._heap.length;
  }
  public get length() {
    return this._heap.length;
  }

  public peek() {
    return this._heap.length === 0 ? null : this._heap[0].value;
  }

  public insert(item: T, priority: number)
  {
    this._heap.push({priority: priority, value: item});
    let i = this._heap.length -1;
    while(i > 0) {
      const p = this.parent(i)
      if(this._heap[p].priority < this._heap[i].priority) break
      const tmp = this._heap[i]
      this._heap[i] = this._heap[p]
      this._heap[p] = tmp
      i = p
    }
  }

  populate(items: T[], priorityFunc: (item: T) => number)
  {
    for(const x of items)
    {
      this.insert(x, priorityFunc(x));
    }
  }
      
  public pop() : T | null
  {
    if(this._heap.length == 0) return null
    
    this.swap(0, this._heap.length - 1)
    const item = this._heap.pop()!;

    let current = 0
    while(this.hasLeft(current)) {
      let smallerChild = this.left(current)
      if(this.hasRight(current) && this._heap[this.right(current)].priority < this._heap[this.left(current)].priority) 
        smallerChild = this.right(current)

      if(this._heap[smallerChild].priority > this._heap[current].priority) break

      this.swap(current, smallerChild)
      current = smallerChild
    }

    return item.value
  }

  /*****/
  private parent(index: number) {
    return Math.floor((index - 1) / 2);
  }

  private left(index: number) {
    return 2 * index + 1;
  } 
  private right(index: number) {
    return 2 * index + 2;
  }
  private hasLeft(index: number) { 
    return this.left(index) < this._heap.length;
  }
  private hasRight(index: number) {
    return this.right(index) < this._heap.length;
  }

  private swap(a: number, b: number)
  {
    const tmp = this._heap[a];
    this._heap[a] = this._heap[b];
    this._heap[b] = tmp;
  }
}

interface PriorityQueueNode<T> {
  value: T,
  priority: number,
}