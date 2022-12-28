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

  public get rawHeap() 
  {
    return this._heap;
  }

  public peek() {
    return this._heap.length === 0 ? null : this._heap[0].value;
  }

  public insert(item: T, priority: number)
  {
    this._heap.push({priority: priority, value: item});
    let i = this._heap.length -1;
    while(i > 0) {
      const p = this._parent(i)
      if(this._heap[p].priority < this._heap[i].priority) break
      const tmp = this._heap[i]
      this._heap[i] = this._heap[p]
      this._heap[p] = tmp
      i = p
    }
  }

  public populate(items: T[], priorityFunc: (item: T) => number)
  {
    for(const x of items)
    {
      this.insert(x, priorityFunc(x));
    }
  }
      
  public pop() : T | null
  {
    if(this._heap.length == 0) return null
    
    this._swap(0, this._heap.length - 1)
    const item = this._heap.pop()!;

    let current = 0
    while(this._hasLeft(current)) {
      let smallerChild = this._left(current)
      if(this._hasRight(current) && this._heap[this._right(current)].priority < this._heap[this._left(current)].priority) 
        smallerChild = this._right(current)

      if(this._heap[smallerChild].priority > this._heap[current].priority) break

      this._swap(current, smallerChild)
      current = smallerChild
    }

    return item.value
  }

  public print()
  {
    console.log(">>> -= PRIORITY QUEUE =-");
    console.log(`>>> COUNT: ${this.length}`);
    for(const x of this._heap)
    {
      console.log(`|   [${x.priority}] -> ${x.value}`);
    }
    console.log(">>> --------------------");
  }

  /*****/
  private _parent(index: number) {
    return Math.floor((index - 1) / 2);
  }

  private _left(index: number) {
    return 2 * index + 1;
  } 
  private _right(index: number) {
    return 2 * index + 2;
  }
  private _hasLeft(index: number) { 
    return this._left(index) < this._heap.length;
  }
  private _hasRight(index: number) {
    return this._right(index) < this._heap.length;
  }

  private _swap(a: number, b: number)
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