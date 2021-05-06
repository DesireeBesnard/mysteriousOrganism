// STEP 1: pAequors array will contain the objects created
pAequorsDB = [];
viablepAequorsDB = [];


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
       
            console.log(`Similarities positions: ${simPositions}`);

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
            
            const survivalPourcentage = Math.round((survivalCounter / this.dna.length) * 10000) / 100;

            if (survivalPourcentage >= 60) {
                return true;
            } else {
                return false;
            }
        },
        this.complementStrand = () => {

            const matchedBase = (base) => {
                const pairing = {A: "T", T: "A", C: "G", G: "C"};
                return pairing[base];
            }

            return this.dna.map(x => matchedBase(x));
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
    return object;
}

const pAequorFactory = (nb) => {
    for (let i = 0; i < nb; i++) {
        let object = newpAequor();
        pAequorsDB.push(object);
    }
    console.log(pAequorsDB);
}

// Function to create a chosen number of organisms
const viablePAequorFactory = (nb) => {

    while (viablepAequorsDB.length < nb) {  

        let object = newpAequor();

        if (object.willLikelySurvive() === true) {
            viablepAequorsDB.push(object);
        }

    }
    console.log(viablepAequorsDB);
}

// STEP 3 function to get one specific object
const pAequor = (ident, db) => {
    const organism = db[ident-1];
    // console.log(organism);
    return organism;
}

pAequorFactory(1);
// viablePAequorFactory(30);

console.log(pAequor(1, pAequorsDB).complementStrand());






