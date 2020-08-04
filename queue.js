import Queue from './queue-sll.js';
// import Queue from './queue-dll.js';
// import Queue from './queue-stack.js';

function peek(queue) {
  return queue.first.data;
}

function isEmpty(queue) {
  return queue.first === null;
}

function display(queue) {
  let currNode = queue.first;
  let outputString = '';
  while (currNode !== queue.last) {
    outputString += `${currNode.data} <- `;
    currNode = currNode.next;
  }
  outputString += queue.last.data;
  console.log(outputString);
}

function squareDancePairOff() {
  // initialize queue for spares
  const spares = new Queue();

  function getLengthOfSpares() {
    let currNode = spares.first;
    let length = 0;
    while (currNode !== null) {
      length += 1;
      currNode = currNode.next;
    }
    return length;
  }

  function parseGenderFromString(inputString) {
    return inputString[0];
  }

  function parseNameFromString(inputString) {
    return inputString.substring(2, inputString.length);
  }

  function getGenderOfSpares() {
    if (spares.first === null) {
      return null;
    }
    return parseGenderFromString(peek(spares));
  }

  // initialize log for displaying state of dance floor
  let logOfPairs = '';

  function formCurrentWaitingString(numSpares, genderOfSpares) {
    const outputGender = genderOfSpares === 'M' ? 'male' : 'female';
    return `There are ${numSpares} ${outputGender} dancers waiting to dance`;
  }

  function addPairToLog(femaleDancer, maleDancer) {
    logOfPairs += `Female dancer is ${femaleDancer}, and the male dancer is ${maleDancer}\n `;
  }

  // dancer = 'M John'
  function addNewDancer(dancer) {
    const currDancerGender = parseGenderFromString(dancer);
    const currDancerName = parseNameFromString(dancer);
    let numSpares = getLengthOfSpares();
    let genderOfSpares = numSpares > 0 ? getGenderOfSpares() : null;

    // IF (no spares available || spares available are same gender)
    // THEN add dancer to spares queue
    if (numSpares === 0 || genderOfSpares === currDancerGender) {
      spares.enqueue(dancer);
      numSpares += 1;
      genderOfSpares = currDancerGender;
    } else {
      // Handle pairing dancers. Remove from spares queue if applicable. Log.
      const femaleDancer =
        currDancerGender === 'F'
          ? currDancerName
          : parseNameFromString(spares.dequeue());
      const maleDancer =
        currDancerGender === 'M'
          ? currDancerName
          : parseNameFromString(spares.dequeue());
      numSpares -= 1;
      addPairToLog(femaleDancer, maleDancer);
    }
    const logOfPairsOutput = logOfPairs === '' ? '' : `${logOfPairs}\n`;
    const currentWaitingOuput =
      numSpares > 0
        ? `${formCurrentWaitingString(numSpares, genderOfSpares)}\n`
        : '';
    console.log(
      'CURRENT STATE OF DANCE FLOOR:\n',
      logOfPairsOutput,
      currentWaitingOuput,
      '\n'
    );
  }

  addNewDancer('F Jane');
  addNewDancer('M Frank');
  addNewDancer('M John');
  addNewDancer('M Sherlock');
  addNewDancer('F Madonna');
  addNewDancer('M David');
  addNewDancer('M Christopher');
  addNewDancer('F Beyonce');
}

function sampleOphidianBankModel() {
  // initialize line with customers
  const line = new Queue();
  line.enqueue('Jerry');
  line.enqueue('Teresa');
  line.enqueue('Marcus');
  line.enqueue('Jennifer');
  line.enqueue('John');

  // define base functions:
  function processCustomer() {
    const currentCustomer = line.dequeue();

    // reviewPaperwork
    console.log(`  ${currentCustomer} is getting their paperwork reviewed`);
    const percentWithProperPaperwork = 75;
    const isPaperworkCorrect =
      Math.floor(Math.random() * 100 + 1) < percentWithProperPaperwork;

    if (isPaperworkCorrect === false) {
      // if paperwork incorrect, send to back of line
      // console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
      console.log(
        `%c    ${currentCustomer} is being sent to the back of line due to incorrect paperwork`,
        'color: #ff0033'
      );
      line.enqueue(currentCustomer);
    } else {
      // if paperwork correct, process
      console.log(`%c    ${currentCustomer} has been served`, 'color: #2E8B57');
    }
  }

  function addNewCustomer(name) {
    line.enqueue(name);
    console.log(`  A new customer, ${name}, has joined the line.`);
  }

  function displayCurrentStatus() {
    console.log('\n');
    console.log('The current state of the line: '.toUpperCase());
    display(line);
    console.log('\n');
  }

  // create sample of a few minutes at the bank's lobby
  displayCurrentStatus();
  processCustomer();
  addNewCustomer('Tim');
  displayCurrentStatus();
  processCustomer();
  processCustomer();
  displayCurrentStatus();
  processCustomer();
  addNewCustomer('Helen');
  displayCurrentStatus();
  processCustomer();
  addNewCustomer('Terrence');
  processCustomer();
  displayCurrentStatus();
}

function main() {
  // const starTrekQ = new Queue();
  // starTrekQ.enqueue('Kirk');
  // starTrekQ.enqueue('Spock');
  // starTrekQ.enqueue('Uhura');
  // starTrekQ.enqueue('Sulu');
  // starTrekQ.enqueue('Checkov');
  // // console.log(peek(starTrekQ));
  // // console.log(isEmpty(starTrekQ));
  // // const emptyQueue = new Queue();
  // // console.log(isEmpty(emptyQueue));
  // starTrekQ.dequeue();
  // starTrekQ.dequeue();
  // display(starTrekQ);
  // console.log(starTrekQ);
  squareDancePairOff();
  // sampleOphidianBankModel();
}

main();
