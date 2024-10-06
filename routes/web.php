<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkspaceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'workspaces' => auth()->user()?->workspaces->take(3) ?? [],
    ]);
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/workspaces/{workspace:slug}', [WorkspaceController::class, 'show'])->name('workspace.show');
    Route::get('/workspaces/{workspace:slug}/channels/{channel:id}', [ChannelController::class, 'show'])->name('channels.show');
    Route::post('/workspaces/{workspace:slug}/channels', [ChannelController::class, 'store'])->name('channels.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__ . '/auth.php';
