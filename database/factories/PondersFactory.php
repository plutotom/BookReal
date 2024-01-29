<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ponder>
 */
class PondersFactory extends Factory
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
            // $table->string('book_id')->nullable();
            // $table->string('quote')->nullable();
            // $table->string('ponder_text');

            'user_id' => $this->faker->numberBetween(1, 10),
            'book_id' => $this->faker->numberBetween(1, 10),
            'quote' => $this->faker->text(100),
            'ponder_text' => $this->faker->text(1000),



        ];
    }
}
