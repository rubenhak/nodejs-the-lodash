export class Stack<T> 
{
  private _stack: T[] = [];

  public get isEmpty() : boolean
  {
    return this._stack.length === 0;
  }

  public get size() {
    return this._stack.length;
  }
  public get length() {
    return this._stack.length;
  }

  public peek() : T | null {
    return this._stack.length === 0 ? null : this._stack[this._stack.length - 1];
  }

  public get rawStack() 
  {
    return this._stack;
  }

  public push(item: T)
  {
    this._stack.push(item);
  }
      
  public pop() : T | null
  {
    return this._stack.pop() ?? null;
  }

  public print()
  {
    console.log(">>> -= Stack =-");
    console.log(`>>> COUNT: ${this.length}`);
    for(const x of this._stack)
    {
      console.log(`|- ${x}`);
    }
    console.log(">>> --------------------");
  }

}

