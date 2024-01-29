<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ponder extends Model
{
    use HasFactory;

    protected $primaryKey = 'ponder_id';

    protected $fillable = [
        'user_id', 'book_id', 'quote', 'ponder_text',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id', 'book_id');
    }
}
