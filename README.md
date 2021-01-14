### Installation

From the top folder install npm dependencies:

```
npm install
```

To run the application:

```
npm start
```
... and follow the instructions displayed for accessing the web application.


To run the test cases:

```
npm run test
```


## IMPLEMENTATION NOTES

### Main React Components

The following 5 components (4 custom and 1 function) were created in the implementation.  The corresponding file for each is simply the component's name with the '.js' extension (e.g., MinesweeperCell.js).  Main characteristics and behaviors are described below for each component.  The remaining (technical) details are found in the source comments.

- ### MinesweeperCell
  - The essential building block for the game.  A 2-dimensional array of cells makes up the board.  Each cell is an instance of MinesweeperCell, and receives click and right-click gestures from the user.
  - Instances of this component are passed with properties that were determined from the main game component (MinesweeperGame)
  - At runtime, instances of this component are sometimes accessed using React "refs", a deviation from the React Data Flow
  - implemented as a custom React component (extends Component)
  
- ### MinesweeperBoard
  - Wrapper for the 2-dimensional array of cells.
  - Implemented as a stateless function
  
- ### MinesweeperScore
  - Container for the game-level details: number of mines left, game state (in-progress, won, or lost) and time elapsed
  - Implemented as a custom React component
  
- ### MinesweeperGame
  - The main game interface and holder of state information for the game
  - In its construction phase, essential data such as the 2-dimensional array of cells, map of cells, mined cells and non-mined cells are created.  These pieces of information are then mutated appropriately in the handling of user events (click and right-click)
  - Implemented as a custom React component
  
- ### Scoreborad
  - The interface for showing game scores.
  
- ### App
  - Wrapper for the page, contains the header, main game interface and footer.
  - Reads the URL query string for custom board size and mine count information
  - Implemented as a custom React component

