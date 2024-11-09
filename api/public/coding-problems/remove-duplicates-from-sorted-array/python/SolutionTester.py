import json
import Solution

def stringToIntegerList(input):
    return json.loads(input)

def main():
    with open('testcase.txt', "r") as f:
        lines = f.readlines()
    
    i = 0
    passall = True
    while i < len(lines):
        nums = stringToIntegerList(lines[i].strip())
        expected_length = int(lines[i + 1].strip())
        i += 2

        # Run the solution method
        result_length = Solution.Solution().removeDuplicates(nums)

        if result_length != expected_length or nums[:result_length] != sorted(set(nums[:expected_length])):
            print(f"[Fail] Input: {nums}, Expected Length: {expected_length}, Got Length: {result_length}")
            passall = False
            break

    if passall:
        print(f"[Success] Your solution passed all {len(lines) // 2} test cases!")

if __name__ == '__main__':
    main()
