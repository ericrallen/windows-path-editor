# Windows $PATH Editor

After getting fed up with trying to manage my $PATH in Windows, I decided to build
a basic Electron app for editing it.

Right now it is just a proof of concept retrieving the $PATH and splitting it into
various inputs, but I've tested running the `setx` command via the `exec()` command
from [shelljs](https://github.com/shelljs/shelljs) and it works after a reboot.
