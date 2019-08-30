# Contributing

Contributions are **welcome** and will be fully **credited**.

Please read and understand the contribution guide before creating an issue or pull request.

## Table of Contents
- [Etiquette](#etiquette)
- [Viability](#viability)
- [Procedure](#procedure)
- [Requirements](#requirements)
- [Standards](#standards)
  - [Angular examples](#angular-examples)
  - [Imports](#imports)
    - [File example](#file-example)
  - [Filename](#filename)
  - [Variable and Function](#variable-and-function)
  - [Class](#class)
  - [Interface](#interface)
  - [Type](#type)
  - [Namespace](#namespace)
  - [Enum](#enum)
  - [Null vs Undefined](#null-vs-undefined)
  - [Quotes](#quotes)
  - [Spaces](#spaces)
  - [Semicolons](#semicolons)
  - [Arrays](#arrays)
  
## Etiquette

This project is open source, and as such, the maintainers give their free time to build and maintain the source code
held within. They make the code freely available in the hope that it will be of use to other developers. It would be
extremely unfair for them to suffer abuse or anger for their hard work.

Please be considerate towards maintainers when raising issues or presenting pull requests. Let's show the
world that developers are civilized and selfless people.

It's the duty of the maintainer to ensure that all submissions to the project are of sufficient
quality to benefit the project. Many developers have different skillsets, strengths, and weaknesses. Respect the maintainer's decision, and do not be upset or abusive if your submission is not used.

## Viability

When requesting or submitting new features, first consider whether it might be useful to others. Open
source projects are used by many developers, who may have entirely different needs to your own. Think about
whether or not your feature is likely to be used by other users of the project.

## Procedure

Before filing an issue:

- Attempt to replicate the problem, to ensure that it wasn't a coincidental incident.
- Check to make sure your feature suggestion isn't already present within the project.
- Check the pull requests tab to ensure that the bug doesn't have a fix in progress.
- Check the pull requests tab to ensure that the feature isn't already in progress.

Before submitting a pull request:

- Check the codebase to ensure that your feature doesn't already exist.
- Check the pull requests to ensure that another person hasn't already submitted the feature or fix.

## Requirements

If the project maintainer has any additional requirements, you will find them listed here.

- **Adhere to [coding standards](#standards)**.

- **Add tests!** - Your patch won't be accepted if it doesn't have tests.

- **Document any change in behaviour** - Make sure the `README.md` and any other relevant documentation are kept up-to-date.

- **Consider our release cycle** - We try to follow [SemVer v2.0.0](http://semver.org/). Randomly breaking public APIs is not an option.

- **One pull request per feature** - If you want to do more than one thing, send multiple pull requests.

- **Send coherent history** - Make sure each individual commit in your pull request is meaningful. If you had to make multiple intermediate commits while developing, please [squash them](http://www.git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Changing-Multiple-Commit-Messages) before submitting

**Happy coding**!

***

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
