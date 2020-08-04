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

function peek(stack) {
  return stack.top.data;
}

function isEmpty(stack) {
  return stack.top === null;
}

function display(stack) {
  if (isEmpty(stack)) {
    console.log('stack is empty so nothing to display');
    return null;
  }
  let currNode = stack.top;
  while (currNode !== null) {
    console.log(currNode.data);
    currNode = currNode.next;
  }
}

function isPalindrome(inputString) {
  let string = inputString.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

  // if input string is odd number of characters, remove middle char
  if (string.length % 2 === 1) {
    const middleCharIndex = string.length / 2;
    string =
      string.slice(0, middleCharIndex) + string.slice(middleCharIndex + 1);
  }

  const indexToBeginComparing = string.length / 2;
  const palindromeStack = new Stack();
  for (let i = 0; i < string.length; i += 1) {
    if (i < indexToBeginComparing) {
      palindromeStack.push(string[i]);
    }
    if (i >= indexToBeginComparing) {
      if (palindromeStack.pop() !== string[i]) return false;
    }
  }
  return true;
}

function areParenthesesBalanced(expression) {
  const parenthesesStack = new Stack();
  for (let i = 0; i < expression.length; i += 1) {
    if (expression[i] === '(') {
      parenthesesStack.push({
        char: '(',
        index: i,
      });
    }
    if (expression[i] === ')') {
      if (isEmpty(parenthesesStack)) {
        console.log(`Error at index ${i}: missing opening parenthesis`);
        return false;
      }
      parenthesesStack.pop();
    }
  }
  if (!isEmpty(parenthesesStack)) {
    const topOfStack = parenthesesStack.pop();
    console.log(
      `Error at index ${topOfStack.index}: missing closing parenthesis`
    );
    return false;
  }
  return true;
}

function isSorted(stack) {
  let currNode = stack.top;
  while (currNode.next !== null) {
    if (currNode.data > currNode.next.data) return false;
    currNode = currNode.next;
  }
  return true;
}

function sortStack(inputStack) {
  const minAboveMax = inputStack;
  const maxAboveMin = new Stack();

  // until minAboveMax is sorted, move items back and forth between two stacks, sorting from both ends
  while (!isSorted(minAboveMax)) {
    // bubble the max value down while transfering from minAboveMax to maxAboveMin
    let currMax = minAboveMax.pop();
    while (!isEmpty(minAboveMax)) {
      if (peek(minAboveMax) > currMax) {
        maxAboveMin.push(currMax);
        currMax = minAboveMax.pop();
      } else {
        maxAboveMin.push(minAboveMax.pop());
      }
    }
    // handle value still stored in currMax
    minAboveMax.push(currMax);

    // bubble the min value down while transfering from maxAboveMin to minAboveMax
    let currMin = maxAboveMin.pop();
    while (!isEmpty(maxAboveMin)) {
      if (peek(maxAboveMin) < currMin) {
        minAboveMax.push(currMin);
        currMin = maxAboveMin.pop();
      } else {
        minAboveMax.push(maxAboveMin.pop());
      }
    }
    // handle value still stored in currMin
    minAboveMax.push(currMin);
  }
  return minAboveMax;
}

function main() {
  // const starTrek = new Stack();
  // starTrek.push('Kirk');
  // starTrek.push('Spock');
  // starTrek.push('McCoy');
  // starTrek.push('Scotty');
  // console.log(starTrek);
  // console.log(peek(starTrek));
  // console.log('should be false: ', isEmpty(starTrek));
  // const emptyStack = new Stack();
  // console.log('should be true: ', isEmpty(emptyStack));
  // display(emptyStack);
  // display(starTrek);
  // starTrek.pop();
  // starTrek.pop();
  // display(starTrek);
  // const palindromeInputString = 'A man, a plan, a canal: Panama';
  // console.log(isPalindrome(palindromeInputString));
  // const sampleExpression = ')(1 + 12) / (3 + 7)';
  // console.log(areParenthesesBalanced(sampleExpression));
  // const stackToSort = new Stack();
  // stackToSort.push(2);
  // stackToSort.push(-7);
  // stackToSort.push(4);
  // stackToSort.push(1);
  // stackToSort.push(3);
  // stackToSort.push(12);
  // console.log('stackToSort: ');
  // display(stackToSort);
  // const sortedStack = sortStack(stackToSort);
  // console.log('sortedStack: ');
  // display(sortedStack);
}

main();
