(string) @string
(comment) @comment
(keyword) @symbol
(number) @number
(type_ann (type_name) @type)
(other_list (other_symbol) @variable)

(
 (other_symbol) @constant.builtin
 (#match? @constant.builtin "yes|no|nil")
)

(import_form ("import") @keyword)
(import_form ns: (other_symbol) @namespace)
(import_as_qualifier (":as") @symbol)

(import_from_form ("import-from") @keyword)
(import_from_form ns: (other_symbol) @namespace)

(let_form ("let") @keyword)
(let_binding_modifiers (":dyn") @symbol)
(let_binding_modifiers (":mut") @symbol)
(let_binding_modifiers (":rec") @symbol)

(macro_form ("macro") @keyword)
(macro_form name: (other_symbol) @function.macro)
(macro_args (other_symbol) @parameter)

(method_form ("method") @keyword)
(method_form name: (other_symbol) @function.method)

(namespace_form ("namespace") @keyword)
(namespace_form name: (other_symbol) @namespace)

(require_form ("require") @keyword)

(return_form ("return") @keyword)

(struct_form ("struct") @keyword)
(struct_req_field name: (other_symbol) @parameter)
(struct_opt_field name: (other_symbol) @parameter)
(type_parameters (other_symbol) @parameter)

(tagged_union_form ("tagged-union") @keyword)

(variant_form ("variant") @keyword)
(variant_field name: (other_symbol) @parameter)

(do_form ("do") @keyword)
(do_name (":name") @symbol)

(do_inline_form ("do-inline") @keyword)

(fn_form ("fn") @keyword)
(fn_form name: (other_symbol) @function)
(fn_arg name: (other_symbol) @parameter)
(fn_opt_arg name: (other_symbol) @parameter)

(if_form ("if") @keyword)

(quote_form ("quote") @keyword)

(quasiquote_form ("quasiquote") @keyword)

(unquote_form ("unquote") @keyword)

(unquote_splicing_form ("unquote-splicing") @keyword)

(when_form ("when") @keyword)

