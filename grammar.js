const SYM_CH = /[-/=+!@$%&*<>.?\w]/;

module.exports = grammar({
    name: 'fn',

    extras: $ => [/\s/, $.comment],

    word: $ => $.other_symbol,

    rules: {
        // Entry point of the grammar
        source_file: $ => repeat($._form),

        _form: $ => choice(
            // special forms which aren't technically expressions
            $.import_form,
            $.import_from_form,
            $.let_form,
            $.macro_form,
            $.method_form,
            $.namespace_form,
            $.require_form,
            $.return_form,
            $.struct_form,
            $.tagged_union_form,
            $.variant_form,

            // special forms
            $.do_form,
            $.do_inline_form,
            $.fn_form,
            $.if_form,
            $.quote_form,
            $.quasiquote_form,
            $.unquote_form,
            $.unquote_splicing_form,
            $.when_form,

            // constants
            $._immediate,
            // symbols
            $._symbol,
            // macros and function calls
            $.other_list,
        ),

        import_form: $ => seq('(', 'import', field('ns', $._symbol),
            optional($.import_as_qualifier), ')'),
        import_as_qualifier: $ => seq(':as', $.other_symbol),

        // TODO: figure out a more specific syntax here
        import_from_form: $ => seq('(', 'import-from', 
            field('ns', $._symbol),
            repeat($._form), ')'),

        let_form: $ => seq('(', 'let', repeat1($.let_binding), ')'),
        let_binding: $ => seq($.pattern, $._form, optional($.type_ann),
            optional($.let_binding_modifiers)),
        let_binding_modifiers: $ => repeat1(choice(
            ':mut',
            ':dyn',
            ':rec',
        )),

        macro_form: $ => seq('(', 'macro', 
            field('name', $.other_symbol), $.macro_args,
            repeat($._form), ')'),
        macro_args: $ => seq('(', repeat($.other_symbol),
            optional(seq('&', $.other_symbol)), ')'),

        method_form: $ => seq('(', 'method', $._form, 
            field('name', $.other_symbol),
            $.fn_or_method_args, $.type_ann, ')'),
        fn_or_method_args: $ => seq('(', repeat($.fn_arg),
            repeat($.fn_opt_arg), optional($.fn_var_arg), ')'),
        fn_arg: $ => seq(field('name', $.other_symbol), $.type_ann),
        fn_opt_arg: $ => seq('(', field('name', $.other_symbol), $._form,
            ')', $.type_ann),
        fn_var_arg: $ => seq('&', choice($.fn_arg, $.fn_opt_arg), $.type_ann),

        namespace_form: $ => seq('(', 'namespace',
            field('name', $.other_symbol), ')'),

        require_form: $ => seq('(', 'require', $._form, ')'),

        return_form: $ => seq('(', 'return', repeat($._form), ')'),

        struct_form: $ => seq('(', 'struct', $.other_symbol,
            $.type_parameters, repeat($.struct_req_field),
            repeat($.struct_opt_field), ')'),
        struct_field: $ => seq(choice($.struct_req_field, $.struct_opt_field),
            optional($.struct_field_modifier)),
        struct_req_field: $ => seq(field('name', $.other_symbol), $.type_ann),
        struct_opt_field: $ => seq('(', field('name', $.other_symbol),
            $._form, ')', $.type_ann),
        struct_field_modifier: $ => choice(
            ':mut',
            ':embed',
            ':delegate'
        ),

        type_parameters: $ => seq('(', repeat($.other_symbol), ')'),

        tagged_union_form: $ => seq('(', 'tagged-union',
            $.type_parameters,
            repeat1($.other_symbol), ')'),
 
        variant_form: $ => seq('(', 'variant', $.other_symbol,
            $.type_parameters, repeat1($.variant_constructor), ')'),
        variant_constructor: $ => choice(
            $.other_symbol,
            seq('(', $.other_symbol, repeat($.variant_field), ')'),
        ),
        variant_field: $ => seq(field('name', $.other_symbol), $.type_ann),

        do_form: $ => seq('(', 'do', optional($.do_name), 
            repeat($._form), ')'),
        do_name: $ => seq(':name', $.other_symbol),

        do_inline_form: $ => seq('(', 'do-inline', repeat($._form), ')'),

        fn_form: $ => seq('(', 'fn', 
            optional(field('name', $.other_symbol)),
            $.fn_or_method_args, $.type_ann, repeat($._form), ')'),

        if_form: $ => seq('(', 'if', repeat($._form), ')'),

        quote_form: $ => choice(
            seq($.quote, $._form),
            seq('(', 'quote', $._form, ')')
        ),

        quasiquote_form: $ => choice(
            seq($.quasiquote, $._form),
            seq('(', 'quasiquote', $._form, ')')
        ),

        unquote_form: $ => choice(
            seq($.unquote, $._form),
            seq('(', 'unquote', $._form, ')'),
        ),

        unquote_splicing_form: $ => choice(
            seq($.unquote_splicing, $._form),
            seq('(', 'unquote-splicing', $._form, ')'),
        ),

        when_form: $ => seq('(', 'when', repeat($._form), ')'),

        other_list: $ => seq('(', repeat(seq($._form, optional($.type_ann))),
            ')'),

        // some definitions that are used throughout
        pattern: $ => $._form,
        type_name: $ => choice($.other_symbol,
            seq('(', $.other_symbol, repeat($._form), ')')),
        type_ann: $ => seq('[', repeat1($.type_name), ']'),


        // tokens

        quote: $ => "'",
        quasiquote: $ => '`',
        unquote: $ => ',',
        unquote_splicing: $ => ',@',

        comment: $ => token(/;.*\n/),
        illegal_char: $ => token(/[#{}~^|]/),

        // the order here matters!

        string: $ => token(/"([^"]|\\|\n")+"/),

        number: $ => choice($.decimal, $.hex),
        decimal: $ => /[+-]?(\d*\.\d+|d+\.d*)(ed+)?/,
        hex: $ => /[+-]?0x[\da-fA-F]+/,

        _immediate: $ => choice($.string, $.number),

        keyword: $ => token(seq(':', repeat1(SYM_CH))),
        other_symbol: $ => token(repeat1(SYM_CH)),
        _symbol: $ => prec(-1, choice(
            $.keyword,
            $.other_symbol
        )),
            
   }
});

