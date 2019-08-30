# Contributing

## Standards
- Please coding having into account the following rules.

### Angular examples
- Check how you sould name your functions. Also, type everything, it's the main advantage of Typescript!
- When passing events from the view to the component, use `$event` and, on the component side, type with 
  the corresponding event type. Dont use `$event.value`.
  Name your functions, that are called from the view, as follow:  
  > actionEventContext() - Context is optional - check examples.  
  
```
user-component.ts

// User related
onClickEdit()
onFocusEdit()
onOverEdit()

// Not user related  
onClickEditCompany()   
onFocusEditCompany()
```

### Imports
  - Import Angular Core First
  - Import our stuff on alfabetic order (A-Z)
  - Imports should be grouped (use Barrels) and ordered alfabetic (A-Z)
  - Inside our classes, the order to define our properties/methods is (also alfabetic A-Z):
    - `@Input` & `@Output`
    - `private` properties
    - `public` properties (need to be prefix with `public` keyword)
    - `getters` & `setters`
    - `contructor`
    - `lifecycle` hooks

  **TBD** (we will talk to check pros and cons of each approach):  
  *Maestria V2* - `private` methods/functions firts (A-Z), `public` after (A-Z)  
  *RT Tool* - `private` / `public` methods/functions grouped by feature (A-Z) 
     
  ~~Our methods, should be grouped by feature. Private first and public next, ordered by A-Z.~~  
   ~~- `private` methods/functions (accessible only within the class)~~  
   ~~- `public` methods/functions (accessible from the class/view)~~

#### File example
- If you want to go directly to a file with some examples, click on the following example [Example](example.ts)  
Be in mind that the following example has some unused/unexisting imports just to exemplify. Unused import should be remove on a production application 

### Filename

  - Name files with `dashed-case`. E.g. `user-role.service.ts`, `business-piv.service.ts`
  - TODO : FIND A SOLUTION TO RELATED FILES. 

### Variable and Function

  - Use `camelCase` for variable and function names.
  - Use JSDoc style comments for `functions`, `interfaces`, `enums`, and `classes`.
  - An extension for VS Code is available [HERE](https://github.com/joelday/vscode-docthis)

### Class

  - Use `PascalCase` for class names.
  - Use `camelCase` for class members and methods.
  - Do not use `_` as a prefix for private properties.
  - Use whole words in names when possible.
  - Add a prefix `C` to a class when it's name conflicts with another framework's class. Eg.: CComponent

### Interface

  - Use `PascalCase` for name.
  - Use `camelCase` for members.
  - Don't prefix with `I`.

### Type

  - Use `PascalCase` for name.
  - Use `camelCase` for members.

### Namespace

  - Use `PascalCase` for names.

### Enum

  - Use `PascalCase` for enum names.
  - Use `PascalCase` for enum member.

### Null vs Undefined

  - Please referrer to [Null vs. Undefined](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md#null-vs-undefined)

### Quotes

  - Prefer single quotes ( `'` ) unless escaping or when it becames hard to read.
  - You can also use a javascript feature named [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
    - Eg.   
        `const url1 = protocol + "://" + host + ":" + port + "/" + path + "." + extension;`   
        `const url2 = ${protocol}://${host}:${port}/${path}.${extension}`;

### Spaces

  - Use spaces instead of tabs.

### Semicolons

  - Use semicolons.

### Array

  - Annotate arrays as `foos: Foo[]` instead of `foos: Array<Foo>`.

To help achieve this, there's a file in the project's root called `.editorconfig`, that in conjunction with the apropriate [EditorConfig](http://editorconfig.org/) plugin installed in your IDE/text-editor, helps in maintaining the code standardized.
