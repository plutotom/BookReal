<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PonderWeek>
 */
class PonderWeekFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // $table->id();
            // $table->timestamps();

            // $table->foreignId('user_id')->constrained('users');
            // $table->datetime('week_start_date');

            'week_start_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'week_end_date' => $this->faker->dateTimeBetween('now', '+1 year'),
        ];
    }
}
