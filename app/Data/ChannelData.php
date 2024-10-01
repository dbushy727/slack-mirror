<?php

namespace App\Data;

use App\Enums\ChannelType;
use Spatie\LaravelData\Data;
use Illuminate\Support\Collection;

class ChannelData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public ChannelType $type,
        /** @var Collection<int, UserData> */
        public Collection $users,
    ) {}
}
