import express from 'express';
import { Book } from '../models/bookmodel.js';

const router = express.Router();


//Route to save a book
router.post('/',async(request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message:"Missing data"});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    }catch (error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
});

//Route for get all books from database
router.get('/',async(request,response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for getting one book with id
router.get('/:id',async(request,response)=>{
    try{
        const{id}=request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for update a book
router.put('/:id',async(request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message:'Missing data'});
        }

        const {id} =request.params;
        const result = await Book.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(404).send({message:'Book not found'});
        }

        return response.status(200).send({message : 'Book Updated Successfully'});



    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for delete  a book
router.delete("/:id", async (request, response) => {
    try{
        const {id}=request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'Book not Found'});
        }
        return response.status(200).send({message: 'BOok deleted successfullly'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

export default router;