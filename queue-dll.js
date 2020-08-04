class _Node {
  constructor(data, prev, next) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertLast(data) {
    const node = new _Node(data);

    // if empty list
    if (this.head === null) {
      this.head = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
    }
    this.tail = node;
  }

  deleteFirst() {
    if (this.head === null) {
      console.log('Error: list is empty. Nothing to delete');
      return null;
    }

    const returnData = this.head.data;

    // replace the head with the next node in list
    this.head = this.head.next;

    // if there was only one node, reset tail
    if (this.head === null) {
      this.tail = null;
    } else {
      this.head.previous = null;
    }

    return returnData;
  }
}

class Queue {
  constructor() {
    this.list = new DoublyLinkedList();
  }

  enqueue(data) {
    return this.list.insertLast(data);
  }

  dequeue() {
    return this.list.deleteFirst();
  }
}

export default Queue;
