<?php

use Flarum\Database\Migration;
use Flarum\Group\Group;

return Migration::addPermissions([
    // Allow all members, effectively disabling the post recaptcha by default
    'fof-recaptcha.postWithoutCaptcha' => Group::MEMBER_ID,
]);
