import Solution

def main():
    with open('testcase.txt', "r") as f:
        lines = f.readlines()
    
    i = 0
    passall = True
    while i < len(lines):
        s = lines[i].strip()
        p = lines[i + 1].strip()
        expected = lines[i + 2].strip().lower() == 'true'

        # Run the solution method
        result = Solution.Solution().isMatch(s, p)
        
        if result != expected:
            print(f"[Fail] String: {s}, Pattern: {p}, Expected: {expected}, Got: {result}")
            passall = False
            break
        
        i += 3

    if passall:
        print(f"[Success] Your solution passed all {len(lines) // 3} test cases!")

if __name__ == '__main__':
    main()
