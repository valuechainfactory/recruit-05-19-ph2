# Simple Reorder Module

## Scenario

Kefis is a simple store that deals in FMCG. They desire a simple application that tracks inventory and makes automated reorders to their offsite warehouse when the stock level hits a predefined quantity.
The warehouse attendant can see all reorders coming in and dispatch them to the store. Processed reorders are marked as such.
Both the retailer and the warehouse can see pending and processed reorders.

## Requirements

**Hint:** In addition to other technical areas of interest, we are very keen on your thought process. Feel free to be creative. Do not complicate your solution in a bid to impress only to find it unfinished in the stipulted period.
**You are allowed a maximum of 72 Hours to complete. The last pull request created in that time is what we take into account**

### Client Requirements

- Seed 5 test products into the database with a default amount of inventory and reorder level
- In the product listing for the store, add a button that reduces inventory to simulate a sale
- When inventory hits the predefined reorder level, create an automated reorder in an unprocessed state
- The warehouse actor should have a view to see unprocessed reorders
- On the reorder listing for the warehouse, have a dispatch button that simulates a dispatch to the store
- The above dispatch action should increment inventory in the store
- The store actor should also have a view to see unnprocessed and processed reorders

### Technical Requirements

- The buttons should not trigger a page refresh. _(**hint:** Javascript, in whatever from, will come in handy here)_
- Write at least one unit test for each of the functions that simulate the sale and the dispatch
- Branch off from master into a branch with your name
- Push your code in that branch in as many commits as neccessary
- Create a pull request to master once completed
- Host the solution on [Heroku](https://www.heroku.com/) and share the link below.

### Languages allowed

Feel free to use whatever language you most feel comfortable in.

## Interviewee Section

### Heroku Link

    Paste your heroku link here: __

### Comments

    Add your comments below: