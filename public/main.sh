#!/bin/bash

# main file

# use autoloader
source /usr/share/yosh/autoloader.sh

# get GET and POST and COOKIE variable
http::read::get
http::read::post
http::read::cookie

# redirect stdout and stderr of function to file, to print after
tmpStdout="$(mktemp -p $TMPDIR)"
tmpStderr="$(mktemp -p $TMPDIR)"

# Clean TMP file on exit
trap "rm $tmpStdout; rm $tmpStderr" EXIT

# Save stdout and stderr to a file, to print out the both
# route::check 1>$tmpStdout 2>$tmpStderr
if type timeout &>/dev/null
then
#    timeout ${time_to_live:-30} $router 1>$tmpStdout 2>$tmpStderr
    $router 1>$tmpStdout 2>$tmpStderr
else
    $router 1>$tmpStdout 2>$tmpStderr
fi

# Send header
http::send::out

# send data from route
[[ -s "$tmpStdout" ]] && cat $tmpStdout
[[ -s "$tmpStderr" ]] && @error "$(cat $tmpStderr)"

# exit like a pro
exit
