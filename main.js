// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      for (let i = 0; i < this.dna.length; i++) {
        let randBase = returnRandBase();
        while (this.dna[i] === randBase) {
          randBase = returnRandBase();
        }
        this.dna[i] = randBase;
      }
      return this.dna;
    },
    compareDNA(pAequor) {
      let identicalBaseCount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        for (let j = 0; j < pAequor.dna.length; j++) {
          if (this.dna[i] === pAequor.dna[j] && i === j) {
            identicalBaseCount += 1;
          }
        }
      }
      console.log(`specimen #1 and specimen #2 have ${(identicalBaseCount / this.dna.length * 100).toFixed(2)}% DNA in common`);
    },
    willLikelySurvive() {
      let survivalBasesCount = 0;
      if (this.dna.indexOf('C') !== -1 || this.dna.indexOf('G' !== -1)) {
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === 'C' || this.dna[i] === 'G') {
            survivalBasesCount += 1;
          }
        }
        return ((survivalBasesCount / this.dna.length * 100) >= 60);
      }
    },

  }
};

// const ex1 = pAequorFactory(1, mockUpStrand());
// console.log(ex1);

// const ex2 = pAequorFactory(2, mockUpStrand());
// console.log(ex2);

// ex1.compareDNA(ex2);

// console.log(ex1.willLikelySurvive());

const ableToSurviveInstances = numOfInstances => {
  let ableToSurviveArray = [];
  for(let i = 0; i < numOfInstances; i++) {
    let instance = pAequorFactory(i + 1, mockUpStrand());
    let j = 0;
    while (!instance.willLikelySurvive()) {
      instance = pAequorFactory(i + 1, mockUpStrand());
      j++;
    }
    ableToSurviveArray.push(instance);
  }
  return ableToSurviveArray;
};

// // Testing function:
// const survived = ableToSurviveInstances(30);

// const checkingSurvival = () => {
//   let survivalArray = [];
//   for (let i = 0; i < survived.length; i++) {
//     survivalArray.push(survived[i].willLikelySurvive());
//   }
//   return survivalArray;
// }
// console.log(checkingSurvival());