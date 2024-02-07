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
}
