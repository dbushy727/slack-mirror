<?php

namespace App\Enums;

enum ChannelType: string
{
    case direct_message = 'direct_message';
    case public_channel = 'public_channel';
    case private_channel = 'private_channel';
}
