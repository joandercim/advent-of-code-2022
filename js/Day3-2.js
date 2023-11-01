class Day3Part2 {
  constructor() {
    this.init();
    this.matchingItems = [];
    this.alpabetCaps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    this.alpabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    this.total = 0;
    this.groupsArray = [];
  }

  async init() {
    const res = await fetch('../txt-files/day-3.txt');
    const text = await res.text();

    const backpackItems = text.split(/\r?\n/);

    const itemsTest = [
      'elf one',
      'elf two',
      'elf three',
      'elf four',
      'elf five',
      'elf six',
      'elf seven',
      'elf eight',
      'elf nine',
      'elf ten',
      'elf eleven',
      'elf twelve',
      'elf thirteen',
      'elf fourteen',
      'elf fifteen',
    ];

    //   this.splitArrays(backpackItems);
    this.splitGroups(itemsTest);

    this.givePrio(this.matchingItems);
    console.log(`The answer for part one is ${this.total}`);
  }

  async splitGroups(rucksacks) {
    let count = 0;
    let group = [];
    for (let i = 0; i < rucksacks.length; i++) {
      const elf = rucksacks[i];
      if (count < 3) {
        count++;
        group.push(elf);
      } else {
        count = 1;
        this.groupsArray.push(group);
        group = [];
        group.push(elf);
      }
    }
    console.log(this.groupsArray);
    //   console.log(this.groupsArray);
  }

  // async splitArrays(backpackItems) {
  //   for (let i = 0; i < backpackItems.length; i++) {
  //     // Split array in half
  //     const firstPart = backpackItems[i].split('');
  //     const splitPoint = firstPart.length / 2;
  //     const secondPart = firstPart.splice(splitPoint);
  //     // Compare array and check if a letter is in both arrays
  //     this.compareCompartments(firstPart, secondPart);
  //   }
  // }

  async compareCompartments(arr1, arr2) {
    // This functions pushes matching elements into the matchingarray.
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          return this.matchingItems.push(arr1[i]);
        }
      }
    }
  }

  givePrio(array) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];

      if (element === element.toLowerCase()) {
        for (let index = 0; index < this.alpabetCaps.length; index++) {
          if (element === this.alpabet[index]) {
            this.total += index + 1;
          }
        }
      }

      if (element === element.toUpperCase()) {
        for (let index = 0; index < this.alpabetCaps.length; index++) {
          if (element === this.alpabetCaps[index]) {
            this.total += index + 27;
          }
        }
      }
    }
  }
}

export default Day3Part2;
