class Day3Part2 {
  constructor() {
    this.init();
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

    this.createGroups(backpackItems);
    this.givePrio(this.commonLetters);
  }

  async createGroups(rucksacks) {
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

    this.groupsArray.push(group);
    this.splitGroups(this.groupsArray);
  }

  splitGroups(groups) {
    for (let index = 0; index < groups.length; index++) {
      const group = groups[index];
      this.findBadge(group[0], group[1], group[2]);
    }
  }

  findBadge(arr1, arr2, arr3) {
    let common = [];

    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          common.push(arr1[i]);
        }
      }
    }

    for (let i = 0; i < common.length; i++) {
      for (let j = 0; j < arr3.length; j++) {
        if (common[i] === arr3[j]) {
          return this.commonLetters.push(common[i]);
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
    console.log(this.total);
  }
}

export default Day3Part2;
