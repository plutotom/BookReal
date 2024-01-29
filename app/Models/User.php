<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function ponderWeeks()
    {
        return $this->belongsToMany(PonderWeek::class);
    }

    // $ponderWeek = PonderWeek::find(1);
    // $user = User::find(1);

    // $ponderWeek->users()->attach($user->id);
    // To retrieve users associated with a PonderWeek:

    // php
    // Copy code
    // $ponderWeek = PonderWeek::find(1);
    // $users = $ponderWeek->users;
    // And vice versa, to retrieve PonderWeeks associated with a user:

    // php
    // Copy code
    // $user = User::find(1);
    // $ponderWeeks = $user->ponderWeeks


}
