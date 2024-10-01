<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    public function show(Request $request, Workspace $workspace)
    {
        return Inertia::render('Workspace/index', [
            'workspace' => $workspace->load('users'),
        ]);
    }
}
