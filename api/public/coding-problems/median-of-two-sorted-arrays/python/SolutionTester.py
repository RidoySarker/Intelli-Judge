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
        nums1 = stringToIntegerList(lines[i].strip())
        nums2 = stringToIntegerList(lines[i + 1].strip())
        expected_median = float(lines[i + 2].strip())
        i += 3

        # Run the solution method
        result_median = Solution.Solution().findMedianSortedArrays(nums1, nums2)

        if result_median != expected_median:
            print(f"[Fail] Arrays: {nums1} and {nums2}, Expected Median: {expected_median}, Got: {result_median}")
            passall = False
            break

    if passall:
        print(f"[Success] Your solution passed all {len(lines) // 3} test cases!")

if __name__ == '__main__':
    main()
