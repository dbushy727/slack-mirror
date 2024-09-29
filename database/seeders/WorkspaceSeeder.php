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
        Workspace::factory()->create()
            ->users()
            ->attach(User::first(), ['role' => 'admin', 'joined_at' => now()]);
    }
}
