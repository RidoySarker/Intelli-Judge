def test_solution():
    test_cases = generate_test_cases()
    for i, case in enumerate(test_cases):
        result = is_match(case["s"], case["p"])
        assert result == case["expected"], f"Test case {i + 1} failed: expected {case['expected']}, got {result}"
    print("All test cases passed!")

# Run tests
test_solution()
