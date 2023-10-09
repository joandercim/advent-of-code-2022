let elf = {
  id: 0,
  calories: 0,
};

async function getTxt() {
  const res = await fetch('/txt-files/cal.txt');
  const text = await res.text();
  const caloriesArray = text.split(/\r?\n/);

  let elfId = 0;
  let mostCals = 0;
  let calsArray = [];

  caloriesArray.forEach((row) => {
    if (row === '') {
      elfId++;
      elf = {
        id: elfId,
        calories: 0,
      };
    } else {
      elf.calories += +row;
    }

    calsArray.push(elf.calories);
  });

  let topThreeTotal = 0;

  let topThree = calsArray
    .sort((a, b) => b - a)
    .slice(0, 3)
    .filter((item, index) => index < 3)
    .forEach((item) => (topThreeTotal += item));
}

getTxt();
