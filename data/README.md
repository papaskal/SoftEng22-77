# Data

Το παρόν directory περιέχει χρήσιμα database dumps και sample questionnaires για την εφαρμογή μας.
Προκειμένου να γίνει το testing ή επίδειξη της εφαρμογής: 
- η βάση θα πρέπει να αρχικοποιηθεί με τα περιεχόμενα του db_dumps, 
- το directory questionnaires πρέπει να αντιγραφεί στο working directory του εργαλείου Postman.

Χρήσιμη εντολή για την αρχικοποίηση της βάσης είναι το [mongorestore](https://www.mongodb.com/docs/v4.2/reference/program/mongorestore/).
```
mongorestore --db intelliq --drop "./db_dumps/bson/"
```