class Day3Part2 {
  constructor() {
    this.init();
    this.matchingItems = [];
    this.alpabetCaps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    this.alpabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    this.total = 0;
    this.groupsArray = [];
    this.commonLetters = [];
  }

  async init() {
    const res = await fetch('../txt-files/day-3.txt');
    const text = await res.text();

    const backpackItems = text.split(/\r?\n/);

    const itemsTest = [
      'vJrwpWtwJgWrhcsFMMfFFhFp',
      'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
      'PmmdzqPrVvPwwTWBwg',
      'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
      'ttgJtRGJQctTZtZT',
      'CrZsJsPPZsGzwwsLwLmpwMDw',
    ];

    //   this.splitArrays(backpackItems);
    this.splitGroups(backpackItems);

    this.givePrio(this.matchingItems);
  }

  async splitGroups(rucksacks) {
    let count = 0;
    let group = [];
    for (let i = 0; i < rucksacks.length; i++) {
      const elf = rucksacks[i];
      if (count <= 2) {
        count++;
        group.push(elf);
      } else {
        count = 1;
        this.groupsArray.push(group);
        group = [];
        group.push(elf);
      }
    }

    if (group.length > 0) {
      this.groupsArray.push(group);
    }

    this.findShortest(this.groupsArray);
  }

  findShortest(groups) {
    for (let index = 0; index < groups.length; index++) {
      const group = groups[index];
      let foundBadge = [];

      const elfOne = group[0].split('');
      const elfTwo = group[1].split('');
      const elfThree = group[2].split('');

      const shortestLength = Math.min(
        elfOne.length,
        elfTwo.length,
        elfThree.length
      );

      if (elfOne.length === shortestLength) {
        this.findBadge(elfOne, elfTwo, elfThree);
      } else if (elfTwo.length === shortestLength) {
        this.findBadge(elfTwo, elfOne, elfThree);
      } else {
        this.findBadge(elfThree, elfOne, elfTwo);
      }
    }
    console.log(this.commonLetters)
  }

  findBadge(shortest, arr2, arr3) {
    let common = [];
    // Find common items in shortes and arr2
    for (let i = 0; i < shortest.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (shortest[i] === arr2[j]) {
          common.push(shortest[i])
        }
      }
    }
    
    for (let i = 0; i < common.length; i++) {
      for (let j = 0; j < arr3.length; j++) {
        if (common[i] === arr3[j]) {
          return this.commonLetters.push(common[i])
        }
      }
    }
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
