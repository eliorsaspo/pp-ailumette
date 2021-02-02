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

 function remove() {


    const xColumns = board[0].length
      board[4][xColumns] = space
      board[4][xColumns - 1] = space
    
    }

function display(board) {
    const rows = board.length
    const columns = 9
    
  
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

display(board)

//TODO rename to launchGame()
async function launchGame (board){
    let numbermatchesmax = 16;
    let round = 0; 
    let enteredLine = 0;
    let enteredMatches = 0; 
    let matchAmount = 0; 
    let isLineContainsMatch = 0;
    let isNumber

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

        if (round % 2 == 0){
            //Tour du joueur
            console.log("Your turn:");
            
            //ligne
            while(isLineAuthorized === false) { 
                await askLine().then((value) => {
                    enteredLine = value
                    isLineContainsMatch = board[enteredLine].includes(match);
                    
                    if (enteredLine >= firstAuthorizedLine && enteredLine <= lastAuthorizedLine && isLineContainsMatch == true) {
                        isLineAuthorized = true;
                    } else {
                        console.log("Error: this line is out of range");
                    }
                });
            }
            
            // nombre 
            while(IsNumberAuthorized == false) {
                await askNumberMatches().then((val) => {
                    enteredMatches = val;
                    matchAmount = board[enteredMatches].filter(x => x==2).length;
                    console.log(matchAmount);
                
                    if (enteredMatches == 1 || matchAmount >= 1){
                        IsNumberAuthorized = true;
                        numbermatchesmax-= enteredMatches;
                        console.log ("Player removed "+ enteredMatches +" match(es) from line "+ enteredLine);
                        
                        
                    }

                    if (enteredMatches == 2 || matchAmount >= 2){
                        IsNumberAuthorized = true;
                        numbermatchesmax -= enteredMatches;
                        console.log ("Player removed "+ enteredMatches +" match(es) from line "+ enteredLine);

                    } else {
                        console.log("Error: not enough matches on this line");
                    }
                });
            }

        } else {

//Tour du Bot

            console.log(" AI’s turn...");
            
            //ligne
           while(isLineAuthorized === false) { 
                
                enteredLine = Math.floor((Math.random() * 4) + 1);
                isLineContainsMatch = board[enteredLine].includes(match);
                    

                if (enteredLine >= firstAuthorizedLine && enteredLine <= lastAuthorizedLine && isLineContainsMatch == true) {
                    isLineAuthorized = true;
                } else {
                    console.log("Error: this line is out of range")
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
        display(board)
        round += 1;
    }

    if(round % 2 == 0){
        console.log("I lost.. snif.. but I’ll get you next time!!");
    } else {
        console.log("You lost, too bad..");
    }
}


launchGame (board)