<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'from_user_id',
        'channel_id',
        'content',
    ];

    public function from()
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }
}
