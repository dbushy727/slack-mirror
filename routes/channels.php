<?php

use App\Models\Channel;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('channels.{id}', function (User $user, int $id) {
    return Channel::findOrNew($id)->users()->where('users.id', $user->id)->exists();
});
