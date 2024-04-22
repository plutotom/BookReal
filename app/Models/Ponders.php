<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Comments;
class Ponders extends Model {
    use HasFactory;

    public function comments() {
        return $this->hasMany(Comments::class, 'ponder_id');
    }

    // write a ponders with book

    public function book()
    {
        return $this->belongsTo(Books::class, 'book_id');
    }

    // write a query to get a ponder by id, and get the books that belong to it as well

    public static function getPonderWithBook($id) {
        return self::with('book')->where('id', $id)->first();
    }
}
