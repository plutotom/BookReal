<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookRealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $this->call([
        //     \App\Models\BookReal::class,
            


        //     // Add other seeders if needed
        // ]);
        // use the factory to make 10 bookReal records
        // \App\Models\BookReal::factory()->count(10)->create();
        // \App\Models\BookReal::factory()->count(10)->create([
        //     'user_id' => 999, // Replace 123 with the desired ID
        // ]);

        \App\Models\BookReal::factory()->count(2)->create([
            'user_id' => 999, 
        ]);
        \App\Models\BookReal::factory()->count(2)->create([
            'user_id' => 1, 
        ]);
    }
}
