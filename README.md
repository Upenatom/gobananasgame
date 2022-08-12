![GO BANANAS Start Screen](https://i.imgur.com/zftYv1l.png)

## A Browser Based Game

### Overview

**_GO BANANAS!!!!_** is a two player browser based game. Each players objective is to collect as many bananas as the opponent by guessing letters in a word puzzle and choosing between solving the puzzle or spinning the banana spinner.  
**GO BANANAS!!!!** was developed in 2022 by a software engineering student who wanted to break the record for saying the word 'banana' while presenting the game to his peers.

---

### Screenshots

---

![GO BANANAS Start Screen](https://i.imgur.com/GYZiJfD.png)
![GO BANANAS normal play](https://i.imgur.com/rYCP744.png)
![GO BANANAS Solve Timer](https://i.imgur.com/AO2B4Ax.png)
![GO BANANAS lost bananas](https://i.imgur.com/rYCP744.png)
![GO BANANAS lost bananas](https://i.imgur.com/bBn1zrC.png)

---

### The Game Screen

---

![GO BANANAS screen description](https://i.imgur.com/7Wofrfu.png)

The game screen contains of the following components:

- **Current Round** - Displays the current round the game is in
- **Theme/Hint** - Displays a clue on what category the word puzzle belongs to
- **Game Board** - The word tiles are displayed on this space hidden and the letters are revealed as the correct gueses are made
- **Player Status Box** - Contains the players attributes
  - **Players Name** - Displays the players name
  - **Players Round Wins** - Displays the number of wins the player has one out of the total number required to win.
  - **Players Bananas Earned** - Displays the total amount of banans earned by the player
- **Keyboard** - A clickable keyboard that the player can use to select the letters they believe are hidden on the game board
- **Banana Spinner** - Spinner indicates potential banana earnings the player could receive if a correct letter is guessed. The Banana Spinner has the folowing outcomes
  - A reward of bananas in increments of 50 ranging from 100 bananas to 500 bananas
  - A 'Lose Turn' in which the player forfeits their turn to the other player
  - A 'Lose Bananas' where the player loses all their bananas and also forfeits their turn to the opposing player. Grave circumstances indeed.
- **Instruction/Information Bar** - Displays important information to the player on the flow of the game
- **Spin Button** - When a player clicks this button the Bannana Spinner spins
- **Solve It Button** - When the player cliks this button a timer is started taht counts down from 10 seconds taking away 10 bananas from the players total bananas earned until either the word is guessed or the player guesses a wrong letter.

---

### Technologies Used

---

**Go Bananas!!!!** was developed using:

- Javascript
- HTML
- CSS

---

### Getting Started

---

**Go Bananas!!!!** is playble by clicking on this link: **GO BANANAS!!!!**

The flow of the game is as follows. After the game board is generated and both players have entered their name on the launch page:

1. The instruction bar prompts Player 1 to go first. Player 1 makes the decision of which button to choose. Either spin or solve (brave!!)
2. Player 1 chooses the spin button, clicks it and the banana spinner spins. Once it stops spinning the number of potential bananas Player 1 could be awarded is displayed.
3. Player 1 then clicks one letter on the screen keyboard. There are two outcomes from this action:
   - The player gueses the correct letter. All letters on the board that match the players guess are revealed. The amount of bananas shown on the banana spinner are multiplied by the number of letters that were revealed, and the bananas are awarded to Player 1. The letter is removed from the keyboard. It is now Player 2's turn.
   - The player guesses incorectly, no bananas are awarded and the letter is taken off the keyboard. It is now Player 2's turn.
4. We fast forward a few turns and go to Player 2. Player 2 has a lead over player one. They do not want to risk spinning banana spinner and losing all their bananas. They are confident they can guess the remaining letters in a short amount of time. The risk of losing a maximum of 100 bananas is worth it over losing all their bananas. Player 2 chooses "SOLVE IT" and clicks the letters they believe will complete the phrase on the game board. Success! All remaining letters are guessed correctly. It only took 4 seconds so in total PLayer 2 only lost 40 bananas but they shut the round down securing their win.
5. The game then moves to the next round (best of 3), until a final round is played and the ultimate winner is decided.

---

### Next Steps

---

- Develop a new game mode where letters are slowly randomly revealed on the game board. Each the first player to buzz in and guess the phrase wins.
- Implement a delay timer between rounds to display who won that round.
- Add sound effects
