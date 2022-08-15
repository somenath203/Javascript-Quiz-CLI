#!/usr/bin/env node 

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;


const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));


const welcome = async () => {

    const rainbowTitle = chalkAnimation.rainbow('Welcome to the Javascript Quiz');

    await sleep(); 

    rainbowTitle.stop();


    console.log(`
        ${chalk.bgBlue('RULES OF THE GAME')}

        01) There will be 5 questions in total

        02) You need to answer all the five questions correctly in order to ${chalk.bgGreen('win')} the game
        
        03) If you answer one question wrong, then, you will be automatically ${chalk.bgRed('terminated')} from the game

        04) (Optional) Play the game in full screen for better exprience

       
        All the best ✌️

    `);

};

console.log();
console.log();

const askNameInput = async () => {

    const pName = await inquirer.prompt({
        name: 'player_name', 
        type: 'input',
        message: 'Enter your full name',
        default() {
            return 'Test Player' 
        }
    });

    playerName = pName.player_name;

}

console.log();
console.log();

const loadingGame = async () => {

    const loadGameSpinner = createSpinner('Loading Game...').start();

    await sleep();

    loadGameSpinner.success();


}

const handleAnswer = async (isCorrect) => {

    const spinner = createSpinner('Checking answer...').start();

    if(isCorrect) {

        spinner.success({ text: `Nice work ${playerName}`});

    } else {

        spinner.error({ text: `Dear ${playerName}, you are terminated from the game for giving wrong answer.`});

        process.exit(1);

    }
}

const questionOne = async () => {

    const firstQuestion = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: '01) What if you use parseInt() to convert a string containing decimal value?\n',
        choices: [
          'Throws Error',
          'It returns the decimal values in string form',
          'If returns only the integer portion of the number',
          'None of the listed option',
        ],
      });
    
      return handleAnswer(firstQuestion.question_1 === 'Throws Error');

}

const questionTwo = async () => {

    const secondQuestion = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: '02) Which of the following is not the properties of screen objects in JavaScript?\n',
        choices: [
          'First-class functions',
          'Encapsulated-class functions',
          'Fixed-class functions',
          'All of the above',
        ],
      });
    
      return handleAnswer(secondQuestion.question_2 === 'First-class functions');

}

const questionThree = async () => {

    const thirdQuestion = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: '03) Which of the following is not the properties of screen objects in JavaScript?\n',
        choices: [
          'AvailHeight',
          'ColorsDepth',
          'AvailWidth',
          'ColorDepth',
        ],
      });
    
      return handleAnswer(thirdQuestion.question_3 === 'ColorsDepth');

}

const questionFour = async () => {

    const fourthQuestion = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: '04) What are the three important manipulations done in a for loop on a loop variable in javascript?\n',
        choices: [
          'the initialization, the Incrementation, and update',
          'the initialization, the test, and the update',
          'the initialization, the test, and Incrementation',
          'All of the above',
        ],
      });
    
      return handleAnswer(fourthQuestion.question_4 === 'the initialization, the test, and the update');

}

const questionFive = async () => {

    const fifthQuestion = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: '05) How do we define the term Thread?\n',
        choices: [
          'Device that controls input',
          'Variable that controls movement',
          'Controlled execution of applications',
          'None of the above',
        ],
      });
    
      return handleAnswer(fifthQuestion.question_5 === 'Controlled execution of applications');

}




const winner = () => {

    console.clear();

    const msg = `Crongrats, you won the game`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });

}



console.clear();

await welcome(); 

await askNameInput();

await loadingGame();

await questionOne();
await questionTwo();
await questionThree();
await questionFour();
await questionFive();


winner();