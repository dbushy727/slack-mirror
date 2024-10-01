<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->as('workspace_membership')
            ->withTimestamps();
    }

    public function channels()
    {
        return $this->hasMany(Channel::class);
    }
}
