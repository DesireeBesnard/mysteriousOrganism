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
    console.log(newStrand);
    return newStrand;
}

  
const pAequorFactory = (specimenNum, dna) => {
    
    return {
        specimenNum,
        dna,
        mutate() {

            const mutationPosition = Math.floor(Math.random() * this.dna.length);
            let mutationBase = returnRandBase();

            while (this.dna[mutationPosition] === mutationBase) {
                mutationBase = returnRandBase();
            }
            this.dna[mutationPosition] = mutationBase;

            return this.dna;
        }
    }

}

  