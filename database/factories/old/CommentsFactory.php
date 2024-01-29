<?php

namespace Database\Factories;
use App\Models\Ponder;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
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
            'user_id' => User::factory(),
            'ponder_id' => Ponder::factory(),
            'parent_comment_id' => null, // Modify if you want to include replies
            'comment_text' => $this->faker->paragraph,
        ];
    }
}
