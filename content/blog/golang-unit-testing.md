---
title: Efficient Unit Testing Approach for Go in VS Code
description: 'Generate Go unit tests and run them with coverage in VS Code using the Go extension''s Test UI, with no boilerplate typing.'
category: Developer
published: true
createdAt: 2023-05-29T00:00:00.000Z
updatedAt: 2026-09-28T00:00:00.000Z
image: /assets/golang-unit-testing.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 6 min read
tags: ['go', 'unit-testing', 'vscode', 'code-coverage']
proficiency: intermediate
---

> **TL;DR:** Writing unit tests in Go can be streamlined significantly with the VS Code Go extension. It auto-generates table-driven test structures from your function signatures, provides a Test UI to run and debug individual tests or entire suites, and shows code coverage with color-coded highlights (green for covered, red for uncovered). This post walks through the full workflow from generating tests to analyzing coverage results.

# Efficient Unit Testing Approach for Go in VS Code

In software development, unit testing plays a vital role in ensuring code quality and reliability. If you're working with the Go programming language and utilizing the Visual Studio Code (VS Code) editor, you can streamline your unit testing workflow using the Go extension. This extension provides powerful features for generating unit tests, executing tests, and visualizing test coverage, making it easier and more efficient to test your Go code.

Everything here builds on Go's standard library:

> "Package testing provides support for automated testing of Go packages." — [Go documentation](https://pkg.go.dev/testing)


## How do I generate Go unit tests in VS Code?

To generate unit tests for your Go functions using the Go extension in VS Code, follow these steps:

1. Open the Go file in which you want to generate unit tests.
2. Place the cursor on the function declaration or its signature.
3. Open the Command Palette by pressing `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS).
4. Search for the "Go: Generate unit tests for function" command and select it.
5. Choose the test file where the generated tests should be placed or create a new file.
6. The extension will generate a table test structure with a placeholder test case. Add your test cases by providing input values and expected output.
![Generating Go unit tests from the VS Code context menu](/assets/generate-tests.png)
Here's an example of a generated table test structure:
```go
package main

import "testing"

func Test_main(t *testing.T) {
	tests := []struct {
		name string
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			main()
		})
	}
}
```


Replace the `TODO: Add test cases.` comment with your actual test cases, providing different input values and asserting the expected output. Repeat this process for other functions you want to test.

## How do I run Go tests and view coverage in VS Code?

After writing your unit tests, you can use the Test UI provided by the Go extension in VS Code to run the tests and visualize the coverage results. Follow these steps:

1. Open the Go file containing your unit tests in VS Code.
2. Open the Command Palette.
3. Search for the "Go: Toggle test coverage for this file" command and select it.
4. The Test UI will open, displaying the test cases and their execution status.
5. Click the "Run All Tests" button to execute all the tests in the file.
6. Once the tests finish running, the coverage results will be displayed alongside the source code, with covered lines highlighted.

### Test UI
![Go test file open in VS Code with the Test UI](/assets/test-main.png)

### View coverage
![Toggling Go test coverage highlighting in VS Code](/assets/toggle-coverage.png)

Reviewing the coverage results allows you to identify areas of your code that may need additional testing or that lack adequate coverage.


## Why use this approach?
Using the Go extension in VS Code for unit testing provides several benefits:

1. Efficient Test Generation: The "Go: Generate unit tests for function" command quickly generates test functions in a table format, reducing manual effort and ensuring consistent test structure.
2. Convenient Test Execution: The Test UI provided by the Go extension allows you to run your tests without leaving the editor, providing a seamless testing experience.
3. Coverage Visualization: The coverage results displayed in the editor help you understand which parts of your code are covered by tests, enabling you to identify areas that require more thorough testing.
4. Improved Code Quality: By adopting an efficient unit testing approach, you can catch bugs and issues early in the development process, resulting in higher code quality and more reliable software.

With the combination of the Go extension's test generation capabilities, the Test UI, and coverage visualization, you can streamline your unit testing workflow and ensure robust and well-tested Go code.

## Frequently Asked Questions

### How do I run Go tests from the terminal?

Run `go test ./...` from your module root. Add `-v` to see each test name and `-run TestName` to run one test.

### How do I get a coverage report without VS Code?

Run `go test -coverprofile=coverage.out ./...` and then `go tool cover -html=coverage.out`. This opens an HTML report with covered lines in green and uncovered lines in red.

### Which tool generates the table-driven tests?

The VS Code Go extension uses the open-source `gotests` tool. You can also run `gotests` directly from the command line.

## References

- [Go: testing package](https://pkg.go.dev/testing)
- [VS Code Go extension](https://github.com/golang/vscode-go)
- [gotests on GitHub](https://github.com/cweill/gotests)
- [Go blog: The cover story](https://go.dev/blog/cover)
