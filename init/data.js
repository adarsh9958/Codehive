const posts = [
  {
    title: "Understanding Closures in JavaScript",
    content:
      "Closures allow a function to access variables from an enclosing scope even after that scope has closed.",
    code: `function outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}\nconst counter = outer();\nconsole.log(counter()); // 1`,
    likes: 14,
  },
  {
    title: "Working with Vectors in C++",
    content:
      "Vectors in C++ are dynamic arrays that can resize themselves automatically.",
    code: `#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> nums = {1, 2, 3};\n  nums.push_back(4);\n  for(int n : nums) std::cout << n << " ";\n  return 0;\n}`,
    likes: 10,
  },
  {
    title: "JavaScript: Destructuring Arrays and Objects",
    content:
      "Destructuring lets you unpack values from arrays or properties from objects into distinct variables.",
    code: `const [a, b] = [1, 2];\nconst {name, age} = {name: "John", age: 25};`,
    likes: 9,
  },
  {
    title: "File Handling in C++",
    content:
      "File handling in C++ is done using fstream library for reading and writing files.",
    code: `#include <fstream>\n#include <iostream>\n\nint main() {\n  std::ofstream file("example.txt");\n  file << "Hello, file!";\n  file.close();\n  return 0;\n}`,
    likes: 7,
  },
  {
    title: "Using Python Dictionaries Effectively",
    content:
      "Dictionaries in Python are key-value pairs and are useful for fast lookups and data storage.",
    code: `user = {"name": "Alice", "age": 25}\nprint(user["name"])\nuser["age"] += 1`,
    likes: 12,
  },
  {
    title: "CSS Flexbox Layout",
    content:
      "Flexbox is a one-dimensional layout method for laying out items in rows or columns.",
    code: `.container {\n  display: flex;\n  justify-content: space-between;\n}\n.item {\n  flex: 1;\n}`,
    likes: 8,
  },
  {
    title: "Understanding the Event Loop in JavaScript",
    content:
      "The event loop is what allows JavaScript to perform non-blocking operations, despite being single-threaded.",
    code: `console.log("Start");\nsetTimeout(() => console.log("Timeout"), 0);\nconsole.log("End");`,
    likes: 17,
  },
  {
    title: "C++ STL: Using Maps",
    content:
      "Maps in C++ store key-value pairs and automatically sort the keys.",
    code: `#include <iostream>\n#include <map>\n\nint main() {\n  std::map<std::string, int> age;\n  age["Alice"] = 25;\n  age["Bob"] = 30;\n  for (auto& p : age) std::cout << p.first << ": " << p.second << "\\n";\n  return 0;\n}`,
    likes: 11,
  },
  {
    title: "Python List Slicing Tricks",
    content:
      "Slicing lets you access sub-parts of a list efficiently and concisely in Python.",
    code: `arr = [1, 2, 3, 4, 5]\nprint(arr[1:4])  # [2, 3, 4]\nprint(arr[::-1])  # reversed list`,
    likes: 13,
  },
  {
    title: "JavaScript Spread vs Rest Operator",
    content:
      "Spread expands elements, rest collects them. They look the same but behave differently based on context.",
    code: `const arr = [1, 2, 3];\nconst newArr = [...arr, 4];\n\nfunction sum(...args) {\n  return args.reduce((a, b) => a + b, 0);\n}`,
    likes: 20,
  },
  {
    title: "C++ Functions with Default Arguments",
    content:
      "Default arguments allow you to call a function without passing all parameters.",
    code: `#include <iostream>\n\nvoid greet(std::string name = "Guest") {\n  std::cout << "Hello, " << name << "!" << std::endl;\n}\n\nint main() {\n  greet();\n  greet("Alice");\n  return 0;\n}`,
    likes: 9,
  },
];

module.exports = posts;
