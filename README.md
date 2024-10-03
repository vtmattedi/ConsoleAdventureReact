# Console Adventure Web

This is a website to play [Console Adventure](www.github.com/vtmattedi/consoleadventure) on the web.
Check it out [here](https://www.consoleadventure.com).



The Website was built in react and uses [xterm.js](https://xtermjs.org/) to simulate a terminal and then runs the console game on it.

The Site is fully responsive, however it need at least 1040 px to display the terminal properly, any lower than that the graphics are not properly displayed and thus I chose to just hide it.

![widthwarning](/Assets/responsive.gif)
## Game Development
This repository is for the development of the website only, not for the game development itself.
However it obviously need to keep up with the game  but I want them to be as much detached as possible from each other. To acomplish this, I'm using git submodules and a little Python [script](/src/copyGame.py) to automatically update the game from its repository

## Future of the projects
There is two stages in the near future:
 * First I will add a backend in node.js to handle savegames and a leaderboard.
 * Then I will move the whole project into a Next.js instead of node + React (maybe).

## Powered by
<div style="display:flex; align-items: center;">
<img src="./Assets/reactlogo.svg" width="100">
<img src="./Assets/xtermlogo.svg" height ="100">
</div>

## Host on:
<img src="./Assets/vercellogo.svg" height ="50">
