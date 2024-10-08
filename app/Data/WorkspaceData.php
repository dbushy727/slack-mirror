<?php

namespace App\Data;

use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use App\Data\UserData;
use App\Data\ChannelData;

class WorkspaceData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        /** @var Collection<int, UserData> */
        public Collection $users,
        /** @var Collection<int, ChannelData> */
        public Collection $channels,
    ) {}
}
