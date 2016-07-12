##Regular Expressions

# https://sheldonchaves.github.io/regex/

###Anchors

| code | desc |
|--------|--------|
|^|Start of string, or start of line in multi-line pattern
|\A|Start of string
|$|End of string, or end of line in multi-line pattern
|\Z|End of string
|\b|Word boundary
|\B|Not word boundary
|\<|Start of word
|\>|End of word

###Character Classes

| code | desc |
|--------|--------|
|\c|Control character
|\s|White space
|\S|Not white space
|\d|Digit
|\D|Not digit
|\w|Word
|\W|Not word
|\x|Hexade­cimal digit
|\O|Octal digit

###POSIX

| code | desc |
|--------|--------|
|[:upper:]|Upper case letters
|[:lower:]|Lower case letters
|[:alpha:]|All letters
|[:alnum:]|Digits and letters
|[:digit:]|Digits
|[:xdigit:]|Hexade­cimal digits
|[:punct:]|Punctu­ation|
|[:blank:]|Space and tab
|[:space:]|Blank characters

###Assertions

| code | desc |
|--------|--------|
|?=|Lookahead assertion
|?!|Negative lookahead
|?<=|Lookbehind assertion
|?!= or ?<!|Negative lookbehind
|?>|Once-only Subexp­ression
|?()|Condition [if then]
|?()&#124; |Condition [if then else]
|?#|Comment

###Quantifiers

| code | desc |
|--------|--------|
|*|0 or more
|+|1 or more
|?|0 or 1
|{3}|Exactly 3
|{3,}|3 or more
|{3,5}|3, 4 or 5
||Add a ? to a quantifier to make it ungreedy.

###Escape Sequences

| code | desc |
|--------|--------|
|\	|Escape following character
|\Q|Begin literal sequence
|\E|End literal sequence

###Common Metacharacters

| code ||||
|--------|--------|--------|--------|
|^|[|.|$
|{|*|(|\
|+|)|&#124;|?
|<|>|

###Special Characters

| code | desc |
|--------|--------|
|\n|New line
|\r|Carriage return
|\t|Tab
|\v|Vertical tab
|\f|Form feed
|\xxx|Octal character xxx
|\xhh|Hex character hh

###Groups and Ranges

| code | desc |
|--------|--------|
|.|Any character except new line (\n)
|(a&#124;b)|a or b
|(...)|Group
|(?:...)|Passive (non-c­apt­uring) group
|[abc]|Range (a or b or c)
|[^abc]|Not (a or b or c)
|[a-q]|Lower case letter from a to q
|[A-Q]|Upper case letter from A to Q
|[0-7]|Digit from 0 to 7
|\x|Group/­sub­pattern number "­x"

###Pattern Modifiers

| code | desc |
|--------|--------|
|g|Global match
|i *|Case-i­nse­nsitive|
|m *|Multiple lines
|s *|Treat string as single line
|x *|Allow comments and whitespace in pattern
|e *|Evaluate replac­ement
|U *|Ungreedy pattern

###String Replacement

| code | desc |
|--------|--------|
|$n|nth non-pa­ssive group
|$2|"­xyz­" in /^(abc­(xy­z))$/
|$1|"­xyz­" in /^(?:a­bc)­(xyz)$/
|$&#96;|Before matched string
|$'|After matched string
|$+|Last matched string
|$&|Entire matched string
||Some regex implem­ent­ations use \ instead of $.

###Case Conversion

| code | desc |
|--------|--------|
|\l	|Make next character lowercase 
|\u	|Make next character uppercase 
|\L	|Make entire string (up to \E) lowercase 
|\U	|Make entire string (up to \E) uppercase 
|\u\L |Capitalize first char, lowercase rest (sentence)