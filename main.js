// STEP 1: pAequors array will contain the objects created
pAequorsDB = [];


// STEP 2: I built a constructor function to create as many object i want and store them in an array

// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] ;
}
 
// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {

    const newStrand = [];
  
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand;
}

// pAequors constructor function
function Paequor(specimenNum, dna) {
    
        this.specimenNum = specimenNum;
        this.dna = dna,
        this.mutate = () => {

            const mutationPosition = Math.floor(Math.random() * this.dna.length);
            let mutationBase = returnRandBase();

            while (this.dna[mutationPosition] === mutationBase) {
                mutationBase = returnRandBase();
            }
            this.dna[mutationPosition] = mutationBase;

            return this.dna;
        },
        this.compareDNA = (ident) => {

            if (ident < 1) {
                window.alert("L'identifiant doit être positif");
            }

            const comparedDNA = pAequorsDB[ident-1];

            let simCounter = 0;
            let simPositions = [];
            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === comparedDNA.dna[i]) {
                    simCounter++;
                    simPositions.push(i);
                }
            }
            console.log(`Similarities counter = ${simCounter}`);
            console.log(`Similarities positions: ${simPositions}`);

            // Then I round the result to the hundredth
            const resultsInPourcentage = Math.round((simCounter/this.dna.length) * 10000) / 100;

            console.log(`The percentage of similarity between pAequor${this.specimenNum} and pAequor${comparedDNA.specimenNum} is ${resultsInPourcentage}%`);
            return simCounter, simPositions, resultsInPourcentage;
        },
        this.willLikelySurvive = () => {

            let survivalCounter = 0;
            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === "C" || this.dna[i] === "G") {
                    survivalCounter++;
                }
            }
            
            console.log(`Survival Counter = ${survivalCounter}`);
            const survivalPourcentage = Math.round((survivalCounter / this.dna.length) * 10000) / 100;
            console.log(`Survival Pourcentage = ${survivalPourcentage}`);

            if (survivalPourcentage >= 60) {
                return true;
            } else {
                return false;
            }
        }

}

// Each individual will be unique thanks to a serial number
let serialNumber = 0;
const increment = () => {
    serialNumber++;
    return serialNumber;
}

// Generates thanks to the class an organism with a unique serial number
const newpAequor = () => {
    serialNumber++;
    const specimenNum = serialNumber;
    const dna = mockUpStrand();
    const object = new Paequor(specimenNum, dna);
    pAequorsDB.push(object);
    return pAequorsDB;
}

// STEP 3 function to get one specific object
const pAequor = (ident) => {
    const organism = pAequorsDB[ident-1];
    // console.log(organism);
    return organism;
}


// To test the compareDNA method
// newpAequor();
// newpAequor();
// console.log(pAequorsDB);
// pAequor(2).compareDNA(1);
// console.log(pAequor(2).willLikelySurvive());

