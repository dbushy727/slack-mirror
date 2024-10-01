<?php

namespace App\Http\Controllers;

use App\Data\WorkspaceData;
use App\Enums\ChannelType;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    public function show(Request $request, Workspace $workspace)
    {
        $user = $request->user();
        return Inertia::render('Workspace/index', [
            'workspace' => WorkspaceData::from($workspace->load([
                'users',
                'channels' => function (HasMany $query) use ($user) {
                    $query->where('type', ChannelType::public_channel)
                        ->orWhere(function ($query2) use ($user) {
                            $query2->where('type', ChannelType::private_channel)
                                ->whereHas('users', function ($query3) use ($user) {
                                    $query3->where('user_id', $user->id);
                                });
                        });
                },
                'channels.users'
            ])),
        ]);
    }
}
