<?php

namespace App\Data;

use DateTime;
use Spatie\LaravelData\Data;

class MessageData extends Data
{
    public function __construct(
        public int $id,
        public string $content,
        public DateTime $created_at,
        public UserData $from,
    ) {}
}
