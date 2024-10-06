<?php

namespace App\Http\Middleware;

use App\Data\WorkspaceData;
use App\Enums\ChannelType;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $workspace = $request->route('workspace');

        return [
            ...parent::share($request),
            'auth' => ['user' => $user],
            'workspace' => $workspace ? WorkspaceData::from($workspace->load([
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
            ])) : null,
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
