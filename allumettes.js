let readline = require('readline');

const star = 0
const match = 1
const space = 2
let board = [
    [star, star, star, star, star, star, star, star, star], 
    [ star, space, space, space, match, space, space, space,star ],
    [ star, space, space, match, match, match, space, space, star],
    [ star, space, match, match, match, match, match, space, star],
    [star ,match, match, match, match, match, match, match, star],
    [star, star, star, star, star, star, star, star, star]
];

let jeu = ""


const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
    }
)

 function askLine() {
    return new Promise((resolve, reject) => {
    rl.question('Line: ', (input) => resolve(input) );
    });
 }

 function askNumberMatches() {
     return new Promise((resolve, reject) => {
         rl.question('Matches: ',(input) => resolve(input) );
     });
 }

 /*function countOccurence(array, value) {
    let count = 0
    
    for(let i = 0; i<array.length; i++ ){
      if (array[i] === value){
        count++;
      }
    }
    return count++;
  }*/

function display(board) {
    const rows = board.length;
    const columns = 9;
    
  
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
            const element = board[x][y]
            switch (element) {
                case star:
                    jeu += "*";
                  break;

                case match:
                    jeu += "|";
                  break;

                case space: 
                    jeu += " ";
                  break;

                default: 
                    jeu += " ";
            }
        }
        jeu += "\n"
    }
    console.log(jeu)
}



//TODO rename to launchGame()
async function launchGame (board){
    let numbermatchesmax = 16;
    let round = 0; 
    let enteredLine = 0;
    let enteredMatches = 0; 
    let matchAmount = 0; 
    let isLineContainsMatch = 0;
    let deletedCount = 0

    const firstAuthorizedLine = 1;
    const lastAuthorizedLine = 4;
   
    let NextRound = true;
    let isLineAuthorized = false;
    let IsNumberAuthorized = false;
    let nombre = false;

    while (NextRound == true) {

        isLineAuthorized = false;
        IsNumberAuthorized = false;
        nombre = false;

        display(board)

        if (round % 2 == 0){
            //Tour du joueur
            console.log("Your turn:");
            
            //ligne
            while(isLineAuthorized === false) { 
                    let value = await askLine()
                    enteredLine = value

                    if (enteredLine >= firstAuthorizedLine && enteredLine <= lastAuthorizedLine){
                    isLineContainsMatch = board[enteredLine].includes(match);
                    
                    if ( isLineContainsMatch == true) {
                        isLineAuthorized = true;
                    } else {
                        console.log("Error: this line is empty");
                    }
                    } else {
                        console.log("Error: this line is out of range");
                    }
                }
            
            
            // nombre 
            while(IsNumberAuthorized == false) {
                let val = await askNumberMatches()
                    enteredMatches = val;

                    
                
                       if (enteredMatches == 1 ){
                          
                          numbermatchesmax-= enteredMatches;
                          matchAmount = board[enteredLine].filter(x => x==match).length;
                          //countOccurence(board[enteredLine], match)
                          console.log(matchAmount);
                          if( matchAmount >= 1){
                              //toute cette boucle for ne marche pas
                            for(let n=0; n < board[enteredLine].length; n++){
                                if (board[enteredLine][n] === match){
                                    match = space;
                                    deletedCount ++;

                                    if (deletedCount == enteredMatches){
                                        IsNumberAuthorized = true;
                                        break;
                                    }
                                }
                            }
                            console.log ("Player removed "+ enteredMatches +" match(es) from line "+ enteredLine);
                            numbermatchesmax -= enteredMatches;
                          }
                       }

                        if (enteredMatches == 2 ){
                          IsNumberAuthorized = true;
                          numbermatchesmax -= enteredMatches;
                          matchAmount = board[enteredLine].filter(x => x==match).length;
                          console.log ("Player removed "+ enteredMatches +" match(es) from line "+ enteredLine);

                          if( matchAmount >= 2){
                            
                            console.log(matchAmount);



                            numbermatchesmax -= enteredMatches;

                               }
                    
                        } else {
                        console.log("Error: not enough matches on this line");
                    }
                }
            

        } else {

//Tour du Bot

//j'attend de finir le player pour le commencer, c'est presque du copier coller sauf qu'il y a des randoms a la place des ask()
            console.log(" AI’s turn...");
            
            //ligne
           while(isLineAuthorized === false) { 
                
                enteredLine = Math.floor((Math.random() * 4) + 1);
                isLineContainsMatch = board[enteredLine].includes(match);
                    

                if (enteredLine >= firstAuthorizedLine && enteredLine <= lastAuthorizedLine && isLineContainsMatch == true) {
                    isLineAuthorized = true;
                } else {
                    console.log("Error: this line is out of range");

                    
                }
            }
            
            
            // nombre 
            while(IsNumberAuthorized == false){
                enteredMatches = Math.floor((Math.random() * 2) + 1);
                
                
                if (enteredMatches == 1 || matchAmount >= 1){
                    IsNumberAuthorized = true;
                    allum -= enteredMatches;
                }
            }
            
        }
        if (numbermatchesmax == 0){
            NextRound = false;
        }
        
        round += 1;
    }

    if(round % 2 == 0){
        console.log("I lost.. snif.. but I’ll get you next time!!");
    } else {
        console.log("You lost, too bad..");
    }
}


launchGame (board)