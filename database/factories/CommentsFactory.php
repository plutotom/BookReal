<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comments>
 */
class CommentsFactory extends Factory
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
            // $table->foreignId('ponder_id')->constrained('ponders');
            // $table->string('comment_text');
            // $table->foreignId('parent_id')->nullable()->constrained('comments');

            
            'user_id' => $this->faker->numberBetween(1, 10),
            'ponder_id' => $this->faker->numberBetween(1, 10),
            'comment_text' => $this->faker->text(1000),
            // 'parent_id' => 1,
            // 'parent_id' => $this->faker->numberBetween(1, 10),

        ];
    }
}
