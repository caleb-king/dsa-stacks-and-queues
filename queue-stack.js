class _Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    this.top = new _Node(data, this.top);
  }

  pop() {
    const popValue = this.top.data;
    this.top = this.top.next;
    return popValue;
  }
}

// helper function for stack - check if stack is empty
function isEmpty(stack) {
  return stack.top === null;
}

class Queue {
  constructor() {
    this.mainStack = new Stack();
    this.helperStack = new Stack();
  }

  enqueue(data) {
    return this.mainStack.push(data);
  }

  dequeue() {
    if (isEmpty(this.mainStack)) {
      return null;
    }

    // move all items over to helper stack so that you can dequeue bottom item
    while (!isEmpty(this.mainStack)) {
      this.helperStack.push(this.mainStack.pop());
    }

    // remove item to dequeue and store value to return
    const returnData = this.helperStack.pop();

    // move all items back over to mainStack
    while (!isEmpty(this.helperStack)) {
      this.mainStack.push(this.helperStack.pop());
    }
    return returnData;
  }
}

export default Queue;
