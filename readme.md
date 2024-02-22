# About
SimpleCLI is a Simple Command-Line Arguments Parser for Node.js.

There are 5 types of arguments you can parse.
```
flag: Will always return true if present
array: Will return an array of every instance of this argument, will return nothing if there are none present.
string: Will return the argument as is.
bool: Will return true if argument is Empty, '1', 'true', 'yes' or 'y', will return false if argument is '0', 'false', 'no' or 'n'. Will throw a error if none of these are matched.
Regular Expression: The argument type itself will be the regex that is used, it will return null if it failed, or an array of the results.
```