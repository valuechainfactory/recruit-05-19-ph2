# Simple Reorder Module

## Scenario

Kefis is a simple store that deals in FMCG. They desire a simple application that tracks inventory and makes automated reorders to their off-site warehouse when the stock level hits a predefined quantity.
The warehouse attendant can see all reorders coming in and dispatch them to the store. Processed reorders are marked as such.
Both the retailer and the warehouse can see pending and processed reorders.

## Requirements

**Hint:** In addition to other technical areas of interest, we are very keen on your thought process. Feel free to be creative. Do not complicate your solution in a bid to impress only to find it unfinished in the stipulated period.
**You are allowed a maximum of 72 Hours to complete. The last commit created in that time is what we take into account**.

### Client Requirements

- Seed 5 test products into the database with a default amount of inventory and reorder level
- In the product listing for the store, add a button that reduces inventory to simulate a sale
- When inventory hits the predefined reorder level, create an automated reorder in an unprocessed state
- The warehouse actor should have a view to see unprocessed reorders
- On the reorder listing for the warehouse, have a dispatch button that simulates a dispatch to the store
- The above dispatch action should increment inventory in the store
- The store actor should also have a view to see unprocessed and processed reorders

### Technical Requirements

- The buttons should not trigger a page refresh. _(**hint:** Javascript, in whatever from, will come in handy here)_
- Write at least one unit test for each of the functions that simulate the sale and the dispatch
- Provide the command necessary to run your tests
- Create a private repository on GitHub and add [info@valuechainfactory.com](mailto:info@valuechainfactory.com) as a colaborator
- Push your code to that repoitory in as many commits as neccessary - preferably more than one.
- Host the solution on [Heroku](https://www.heroku.com/) or an alternative hosting provider and share the link in the section below.

### Languages allowed

Feel free to use whatever language you most feel comfortable in.

---

## Applicant Section

### Hosted App Link

    http://eportal.impaxafrica.com:8081/index.aspx

### Comments

    Add your comments below:
    
    System use in my Read.me
