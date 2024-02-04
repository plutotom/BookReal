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

        \App\Models\User::factory(9)->create();

        \App\Models\User::factory()->create([
            'name' => 'isaiah',
            'email' => 'plutotom@live.com',
            "id" => 999,
            'password' => bcrypt('password'),
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Chloe',
            'email' => 'chloe@blessedmuch.com',
            "id" => 9999,
            'password' => bcrypt('password'),
        ]);
        \App\Models\User::factory(10)->create();

        \App\Models\BookReal::factory()->count(2)->create([
            'user_id' => 999,
        ]);
        \App\Models\BookReal::factory()->count(2)->create([
            'user_id' => 1,
        ]);


        \App\Models\Books::factory(10)->create();
        \App\Models\Ponders::factory(10)->create();

        \App\Models\Comments::factory(10)->create();
        \App\Models\Comments::factory(3)->create([
            'parent_id' => 1,
        ]);
        \App\Models\Comments::factory(3)->create([
            'parent_id' => 3,
        ]);

        \App\Models\PonderWeek::factory(1)->create();
    }
}
