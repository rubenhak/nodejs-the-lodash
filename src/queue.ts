export class Queue<T> 
{
  private _queue: T[] = [];

  public get isEmpty() : boolean
  {
    return this._queue.length === 0;
  }

  public get size() {
    return this._queue.length;
  }
  public get length() {
    return this._queue.length;
  }

  public peek() : T | null {
    return this._queue.length === 0 ? null : this._queue[0];
  }

  public get rawStack() 
  {
    return this._queue;
  }

  public push(item: T)
  {
    this._queue.push(item);
  }
      
  public pop() : T | null
  {
    return this._queue.shift() ?? null;
  }

  public print()
  {
    console.log(">>> -= Queue =-");
    console.log(`>>> COUNT: ${this.length}`);
    for(const x of this._queue)
    {
      console.log(`|- ${x}`);
    }
    console.log(">>> --------------------");
  }

}

