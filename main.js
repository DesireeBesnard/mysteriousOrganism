// STEP 1: Create pAequors arrays that will contain the created objects

let serialNumber = 0; //Each obj have a unique id
let pAequorsDB = [];
let viablepAequorsDB = []; //Organism that are most likely to survive



// STEP 2: I use a constructor function to generate the same type of objects

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
    this.mutate = () => { //Simulates a mutation

        const mutationPosition = Math.floor(Math.random() * this.dna.length);
        let mutationBase = returnRandBase();

        while (this.dna[mutationPosition] === mutationBase) {
            mutationBase = returnRandBase();
        }
        this.dna[mutationPosition] = mutationBase;

        return this.dna;
    },
    this.compareDNA = (ident, db) => { //Compare two dna strands, giving the rate of mutation and their positions

        if (ident < 1) {
            window.alert("L'identifiant doit être positif");
        }

        const comparedDNA = db[ident-1];

        let simCounter = 0;
        let simPositions = [];
        for (let i = 0; i < this.dna.length; i++) {
            if (this.dna[i] === comparedDNA.dna[i]) {
                simCounter++;
                simPositions.push(i);
            }
        }

        console.log(`this.specimenNum = ${this.dna}`);
        console.log(`comparedDna.specimenNum = ${comparedDNA.dna}`);
        console.log(`Similarities positions: ${simPositions}`);

        const resultsInPourcentage = Math.round((simCounter/this.dna.length) * 10000) / 100;

        console.log(`The percentage of similarity between pAequor${this.specimenNum} and pAequor${comparedDNA.specimenNum} is ${resultsInPourcentage}%`);
        return simCounter, simPositions, resultsInPourcentage;
    },
    this.willLikelySurvive = () => { //Checks the potential survival of an organism (if dna is made of at least 60% of C or G )

        let survivalCounter = 0;
        for (let i = 0; i < this.dna.length; i++) {
            if (this.dna[i] === "C" || this.dna[i] === "G") {
                survivalCounter++;
            }
        }
            
        const survivalPourcentage = Math.round((survivalCounter / this.dna.length) * 10000) / 100;

        if (survivalPourcentage >= 60) {
            return console.log(`Will likely survive: ${true}`);
        } else {
            return console.log(`Will likely survive: ${false}`);
        }
    },
    this.complementStrand = () => { //Gives the complementary strand

        const matchedBase = (base) => {
            const pairing = {A: "T", T: "A", C: "G", G: "C"};
            return pairing[base];
        }
        console.log(`Original strand = ${this.dna}`);

        return console.log(this.dna.map(x => matchedBase(x)));
    }        
}

const mostRelated = (db) => { //gives the two organisms with the highest rate of DNA similarity 

    let array = [];
    let coupleArray = [];
    let result;

    db.map(x => {

        for (let i = 0; i < db.length; i++) {
            if(x.specimenNum !== db[i].specimenNum) {

                let rate = pAequor(x.specimenNum, db).compareDNA(db[i].specimenNum, db); 

                let couple = {
                    specimenNum: x.specimenNum,
                    comparedSpecimen: db[i].specimenNum,
                    rate: rate
                };

                array.push(rate);
                coupleArray.push(couple);
            }
        }
        return array, coupleArray;
    });

    result = coupleArray[array.indexOf(Math.max(...array))];

    return console.log(`The highest rate of similarity is between pAequor${result.specimenNum} and pAequor${result.comparedSpecimen} with a rate of ${result.rate}%.`);
}


// Generates one new organism
const newpAequor = () => {
    serialNumber++;
    const specimenNum = serialNumber;
    const dna = mockUpStrand();
    const object = new Paequor(specimenNum, dna);
    return object;
}

// Generates a chosen number of organisms
const pAequorFactory = (nb) => {
    for (let i = 0; i < nb; i++) {
        let object = newpAequor();
        pAequorsDB.push(object);
    }
    console.log(pAequorsDB);
    return pAequorsDB;
}

// Generates a chosen number of organisms that are most likely to survive
const viablePAequorFactory = (nb) => {

    while (viablepAequorsDB.length < nb) {  

        let object = newpAequor();

        if (object.willLikelySurvive() === true) {
            viablepAequorsDB.push(object);
        }

    }
    console.log(viablepAequorsDB);
}

// Call one specific organism
const pAequor = (ident, db) => {

    if (ident < 1) {
        window.alert("L'identifiant doit être positif");
    }

    const organism = db[ident-1];
    // console.log(organism);
    return organism;
}


// pAequorFactory(5);
// pAequor(1,pAequorsDB).mutate();
// pAequor(1,pAequorsDB).compareDNA(2,pAequorsDB);
// pAequor(1,pAequorsDB).willLikelySurvive();
// pAequor(1,pAequorsDB).complementStrand();

// pAequorFactory(5);
// mostRelated(pAequorsDB);










