<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    use HasFactory;

    // get the book title based on a book id
    public static function getBookTitle($book_id) {
        $book = Books::where('id', $book_id)->first();
        return $book->title;

    }


}
