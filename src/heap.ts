export type GenericHeapComparer<T> = (a: T, b: T) => boolean;

export class GenericHeap<T> 
{
  private _heap: T[] = [];
  private _comparer: GenericHeapComparer<T>;

  constructor(comparer: GenericHeapComparer<T>, items?: T[])
  {
    this._comparer = comparer;
    for(const item of items ?? [])
    {
      this.insert(item);
    }
  }

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

  public peek() : T | null {
    return this._heap.length === 0 ? null : this._heap[0];
  }

  public insert(item: T)
  {
    this._heap.push(item);
    let i = this._heap.length -1;
    while(i > 0) {
      const p = this.parent(i)
      if(this._comparer(this._heap[p], this._heap[i])) break;
      const tmp = this._heap[i]
      this._heap[i] = this._heap[p]
      this._heap[p] = tmp
      i = p
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
      if(this.hasRight(current) && this._comparer(this._heap[this.right(current)], this._heap[this.left(current)])) 
        smallerChild = this.right(current)

      if(!this._comparer(this._heap[smallerChild], this._heap[current])) break

      this.swap(current, smallerChild)
      current = smallerChild
    }

    return item;
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


export class MinHeap extends GenericHeap<number>
{
  constructor(items?: number[])
  {
    super((a, b) => a < b, items);
  }
}

export class MaxHeap extends GenericHeap<number>
{
  constructor(items?: number[])
  {
    super((a, b) => a > b, items);
  }
}

interface PriorityQueueNode<T> {
  priority: number,
  value: T,
}

export class HeapPriorityQueue<T> extends GenericHeap<PriorityQueueNode<T>>
{
  constructor(items?: PriorityQueueNode<T>[])
  {
    super((a, b) => a.priority < b.priority, items);
  }

  populate(items: T[], priorityFunc: (item: T) => number)
  {
    for(const x of items)
    {
      this.insert({ value: x, priority: priorityFunc(x)});
    }
  }
}