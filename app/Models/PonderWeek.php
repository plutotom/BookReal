<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PonderWeek extends Model
{
    use HasFactory;
    
    public function users(){
        return $this->belongsToMany(User::class);
    }


    // Now you can use the relationship methods in your code. 
    // For example, to attach a user to a PonderWeek:
    // $ponderWeek = PonderWeek::find(1);
    // $user = User::find(1);
    // $ponderWeek->users()->attach($user->id);

    
    // To retrieve users associated with a PonderWeek:
    // php
    // $ponderWeek = PonderWeek::find(1);
    // $users = $ponderWeek->users;
    
    // And vice versa, to retrieve PonderWeeks associated with a user:
    // php
    // $user = User::find(1);
    // $ponderWeeks = $user->ponderWeeks
}


