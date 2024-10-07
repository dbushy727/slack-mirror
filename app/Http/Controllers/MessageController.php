<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;


class MessageController extends Controller
{
    function store(Request $request)
    {
        $request->validate([
            'from_user_id' => 'required|exists:users,id',
            'channel_id' => 'required|exists:channels,id',
            'content' => 'required|string',
        ]);

        $message = Message::create([
            'from_user_id' => $request->from_user_id,
            'channel_id' => $request->channel_id,
            'content' => $request->content,
        ]);

        MessageSent::dispatch($message);
        return redirect()->route('channels.show', [$message->channel->workspace, $message->channel]);
    }
}
