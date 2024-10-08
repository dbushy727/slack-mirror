<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    public function show(Request $request, Workspace $workspace)
    {
        return to_route('channels.show', [
            'workspace' => $workspace,
            'channel' => $workspace->channels->first()
        ]);
    }
}
