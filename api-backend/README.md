# API - Backend

Το παρόν directory περιέχει το API και το back-end της εφαρμογής.
Το documentation του API βρίσκεται στο directory [vpp](https://github.com/ntua/SoftEng22-77/tree/main/vpp), όπως επίσης και [εδώ](https://documenter.getpostman.com/view/23942102/2s935mtRK8).

## Υλοποίηση
Για την υλοποίηση χρησιμοποιήθηκε nodeJS και η βιβλιοθήκη express.
Επιπλέον, απαιτείται το MongoDB v4.2, το οποίο δεν περιλαμβάνεται στο repository.

## Εγκατάσταση

Για την εγκατάσταση, αρκεί η εντολή
```
npm install
```
Προκειμένου να εγκατασταθούν τα απαραίτητα node modules.

## Λειτουργία

Για το "σήκωμα" του back-end, χρησιμοποείται η εντολή
```
npm start
```
Για να λειτουργεί η εφαρμογή είναι απαραίτητο να τρέχει το MongoDB v4.2 στην port 27017.