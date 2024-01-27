<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel {
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void {
        // $schedule->command('inspire')->hourly();
        $schedule->command('app:clear-book-reals')->dailyAt('00:00');
        $schedule->command('app:clear-book-reals')->everyMinute();

    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void {
        $this->load(__DIR__.'/Commands');
        \App\Console\Commands\clearBookReals::class;
        require base_path('routes/console.php');
    }
}
