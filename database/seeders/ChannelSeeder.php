<?php

namespace Database\Seeders;

use App\Enums\ChannelType;
use App\Models\Channel;
use App\Models\Workspace;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $workspace = Workspace::first();
        Channel::factory()
            ->for($workspace)
            ->hasAttached($workspace->users)
            ->create(['name' => 'general']);

        Channel::factory()
            ->for($workspace)
            ->hasAttached($workspace->users->random(3))
            ->create(['name' => 'sports']);

        Channel::factory()
            ->for($workspace)
            ->hasAttached($workspace->users->random(3))
            ->create(['name' => 'music']);

        Channel::factory()
            ->for($workspace)
            ->hasAttached([$workspace->users->first(), $workspace->users->last()])
            ->create(['name' => 'secret', 'type' => ChannelType::private_channel]);
    }
}
