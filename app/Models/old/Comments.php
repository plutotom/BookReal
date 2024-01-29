<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $primaryKey = 'comment_id';

    protected $fillable = [
        'user_id', 'ponder_id', 'parent_comment_id', 'comment_text',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function ponder()
    {
        return $this->belongsTo(Ponder::class, 'ponder_id', 'ponder_id');
    }

    public function parentComment()
    {
        return $this->belongsTo(Comment::class, 'parent_comment_id', 'comment_id');
    }
}
