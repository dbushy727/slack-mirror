<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Workspace;
use Illuminate\Database\Seeder;

class WorkspaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Workspace::factory()
            ->hasAttached(User::first(), ['role' => 'admin', 'joined_at' => now()])
            ->hasAttached(User::factory()->count(10)->create(), ['role' => 'member', 'joined_at' => now()])
            ->create(['name' => 'SlackMirror', 'slug' => 'slack-mirror']);
    }
}
