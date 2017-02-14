# Windows $PATH Editor

![$PATH Editor Demo](src/external/path-editor.gif)

After getting fed up with trying to manage my $PATH in Windows, I decided to build
a basic Electron app for editing it.

## Development

1. `git clone`
2. `npm install`
3. You'll need two Terminal Windows:
  1. `npm run watch`
  2. `npm start`

## Packaging

1. Run `npm run build`
1. Run `npm run generate`
1. Run `cd app`
1. Run `npm install`
1. Run `npm run package`

Built application files can be found in `windows-path-editor/dist/[current version number]/`.

## Notes

Because the $PATH we get is already concatenated with the SYSTEM $PATH you will
end up with duplicates after saving your $PATH via this application.

Once your USER $PATH is more than 1024 characters the method of setting your $PATH
that this app uses is not 100% reliable and your SYSTEM $PATH may be ignored. Due to
the duplication of the SYSTEM $PATH entries, you shouldn't have to worry about this,
but the application has an indicator in the bottom left that gives you the current
character count and alerts you when you've passed the 1024 character limit.

## How it works

$PATH Editor retrieves the $PATH and splits it into simple inputs for each item
in the $PATH. It gets your $PATH by running `set` and sets your $PATH by running
`setx`. Both commands are run via the `exec()` command from [shelljs](https://github.com/shelljs/shelljs).

**NOTE**: You must reboot for the $PATH change to take effect. (*There is a button
in the app that will trigger a reboot for you.*)

## Roadmap

- Integrate undo/redo functionality for stepping through $PATH changes
- Support exporting $PATH to a string that can be copied+pasted into typical $PATH
editing interface
- Make list scroll to bottom when using the Add button
- Better animations for add/remove
- Add interaction to character count that explains what it means
- Add tooltip popup when exceeding character limit
- Explore ways to pull SYSTEM $PATH items out of the $PATH
