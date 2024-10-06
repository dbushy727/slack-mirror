<?php

namespace Database\Factories;

use App\Models\Channel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'from_user_id' => User::factory(),
            'channel_id' => function (array $attributes) {
                $user = User::find($attributes['from_user_id']);

                return Channel::factory()->hasAttached($user);
            },
            'content' => fake()->sentence(),
        ];
    }
}
