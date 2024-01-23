<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        
        \App\Models\User::factory()->create([
            'name' => 'random',
            'email' => 'random@something.com',
            "id" => 1,
            'password' => bcrypt('password'),
        ]);
        \App\Models\User::factory()->create([
            'name' => 'isaiah',
            'email' => 'plutotom@live.com',
            "id" => 999,
            'password' => bcrypt('password'),
        ]);
        \App\Models\User::factory(10)->create();
        
        \App\Models\BookReal::factory()->count(10)->create([
            'user_id' => 999, 
        ]);
        \App\Models\BookReal::factory()->count(10)->create([
            'user_id' => 1, 
        ]);

    }
}
