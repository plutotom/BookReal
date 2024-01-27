<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class clearBookReals extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clear-book-reals';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear Book Reals table';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        DB::table('book_reals')->truncate();
        // then add one new item after clearing them all out 
        // so that the table doesn't need to be recreated
        // DB::table('book_reals')->insert(['id' => 1, 'name' => 'test']);
        \App\Models\BookReal::factory()->count(1)->create([
            'user_id' => 999, 
        ]);
        \App\Models\BookReal::factory()->count(1)->create([
            'user_id' => 1, 
        ]);

        $this->info('book_reals table cleared successfully.');
    }
}
