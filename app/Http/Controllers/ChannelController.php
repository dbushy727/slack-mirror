<?php

namespace App\Http\Controllers;

use App\Data\ChannelData;
use App\Data\WorkspaceData;
use App\Enums\ChannelType;
use App\Models\Channel;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ChannelController extends Controller
{
    public function show(Request $request, Workspace $workspace, Channel $channel)
    {
        return Inertia::render('Channel/index', [
            'channel' => ChannelData::from($channel->load([
                'users',
                'messages.from',
            ])),
        ]);
    }

    function store(Request $request, Workspace $workspace)
    {
        $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:public_channel,private_channel',
        ]);

        $channel = $workspace->channels()->create([
            'name' => $request->name,
            'type' => $request->type,
        ]);

        $channel->users()->attach($request->user());

        return redirect()->route('channels.show', [$workspace, $channel]);
    }
}
