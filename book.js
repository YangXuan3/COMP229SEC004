let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//connect to our book model
let Book = require('../model/books');
//GET ROUTE for the book list page - READ  OPERATION
router.get('/',(req,res,next)=>{
    Book.find((err,Booklist)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {

            //console.log(Booklist);
            res.render('book/list',{title:'Books', Booklist: Booklist});
        }
    });
});
/*Get route for displaying the APP page - CREATE OPERATION */
router.get('/add',(req,res,next)=>{
    res.render('book/add',{title:'Add book'});
});

/*POST routes for processing the Add Page - CREATE OPERATION */
router.post('/add',(req,res,next)=>{
    let newBook = Book({
        "name":req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price
    });
    Book.create(newBook,(err,Book)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/Booklist');
        }
    });
});
/*Get route for displaying the Edit Page - OPERATE OPERATION */
router.get('/edit:id',(req,res,next)=>{
    let id = req.params.id;
    Book.findById(id,(err,bookToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('book/edit',{title:'Edit bookd', book:bookToEdit})
        }
    });
});
/*Get route for processing the Edit Page - UPDATE OPERATION */
router.post('/edit/:id',(req,res,next)=>{
    let id = req.params.id;
    let updateBook =Book({
        "_id":id,
        "name":req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price
    });
    Book.updateOne({_id:id},updateBook,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/Booklist');
        }
    });
});
/*Get to perform deletion - DELETE OPERATION */
router.get('/delete:id',(req,res,next)=>{
    let id = req.params.id;
    Book.remove({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/Booklist');
        }
    });
});
module.exports = router;