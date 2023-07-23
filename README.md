# NOTICE

This grammar is no longer accurate. I have finally bitten the bullet and
switched fn (once again stylized with a lowercase 'f') to a syntax that uses
significant whitespace for grouping, rather than using parens for everything.

Unfortunately, tree-sitter cannot parse such languages without a custom scanner,
and furthermore we can't indent fn with tree-sitter queries (at least not the
way Neovim does). Since I am mainly using Emacs these days, it was a lot easier
to do the new highlighting and indentation code in Emacs Lisp.

See <https://github.com/jepugs/fn-mode.el> for the Emacs extension that I am
currently using while I develop the new compiler and runtime.

The winds of change are blowing towards tree-sitter, and ultimately I hope to
use it for the Emacs and Neovim extensions for fn. However, I have a working
extension for my main editor already, so I do not plan to revisit this until
after the next versions of the compiler, runtime, and standard library are
working (and tested). Then it will be time to work on the tools.

# tree-sitter-fn

This is a tree-sitter grammar for Fn. I've included a syntax highlighting query
as queries/highlights.scm.

Fn is a programming language I am working on. It is a mixed-paradigm language
aiming to provide a fresh and modern take on the Lisp family of languages. Fn
prioritizes clarity, consistency, and efficiency. For more information, see
<http://github.com/jepugs/Fn>.

## Stability

Fn's syntax is not stable at this time. While I will try my best to keep this
gramar updated, this grammar may at times be out of sync with the current state
of Fn development.

## License

tree-sitter-fn is distributed under the terms of the MIT license. See LICENSE
for details.
