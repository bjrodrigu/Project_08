# Group 8 Style Sheet

### Variables

- **Class and Interface Names**:
  - Class and Interface names are written in `UpperCamelCase`.

- **Method, Field, and Local Variable Names**:
  - Methods, fields, and local variable names are written in `lowerCamelCase`.

- **Constant Names**:
  - Constant names use `CONSTANT_CASE`: all uppercase letters, with words separated by underscores.

### Spacing

- A single blank space appears:
  - Separating curly braces from any other code on the same line.
  - On both sides of a binary or ternary operator or operator-like symbol, with the exception of the dot operator which should be written without spaces as: `object.toString()`.
  - On both sides of the double slash `//` comments, when on a line with code.
  - Between the type and name of variable declarations, as in: `List<String> list;`.
  - After each comma in comma-separated lists of arguments and initializers.
  - Anywhere else they help improve the readability of your code.

- **Column Limit: 100**:
  - No line of code should extend beyond 100 characters wide. Any line that would exceed this limit must be line-wrapped as described below.

- **Line Wrapping**:
  - Prefer breaking lines apart at the highest syntactic level to conform to the Column Limit (above), or otherwise improve the readability of your code.
  - Indent continuation lines at least +6 spaces from the first line that they are extending, so that all continuation lines are indented the same amount.

- **Block Indentation: +4 spaces**:
  - Each time a new block or block-like construct is opened, the indent increases by four spaces. When it ends, the indent returns to the previous indent level. This indent level applies to both code and comments throughout the block.

### Comments

- Comments should be used to provide valuable insights that are not immediately obvious from the code itself. Describe the "why" not the "what". However, for comments at the beginning of classes or functions, a brief summary is expected.

- Use a JavaDoc header for every class and method with the following format:

#### JavaDoc class header example

```java
/**
 * (Write a succinct description of this class here. You should avoid
 * wordiness and redundancy. If necessary, additional paragraphs
 * should be preceded by <p>, the html tag for a new paragraph.)
 *
 * <p>Bugs: (a list of bugs and other problems)
 *
 * @author (your name)
 */
public class NewClass { ... }
```

#### JavaDoc method header example

```java
/**
 * (Write a succinct description of this method here. If necessary,
 * additional paragraphs should be preceded by <p>, the html tag for
 * a new paragraph.)
 *
 * <p>A reference to an algorithm or a concise example may be helpful.
 *
 * @param paramName1 (Describe the first parameter here)
 * @param paramName2 (Do the same for each additional parameter)
 * @return (description of the return value)
 */
public static int methodName(String paramName1, double paramName2) {
}
```
